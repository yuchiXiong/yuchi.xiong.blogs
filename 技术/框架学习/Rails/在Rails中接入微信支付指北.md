# 0. 写在前面
其实公司项目早在去年就做完第一版的微信支付了，但是由于种种原因并没有上线，一直拖到了今年。

让人 *疼 的一件事情是，虽然基础功能都已经实现了，代码也有了，但是考虑微信支付更新了V3版本，以及反正产品还没有正式上微信支付，公司最终决定直接接入V3版本的微信支付，之前的代码基本上没法儿再用了。

另外 `Ruby` 这个没人疼没人爱的孩子又着实可怜的不行，V2版本的微信支付还可以参考使用社区姜老师(`@jasl`)的 [微信支付GEM](https://github.com/jasl/wx_pay)，V3版本干脆就没有可以参考的 `Ruby` 代码了。

好就好在V3开始的微信支付相对之前的V2要简单许多，以及相关的文档也比较完整，本文主要提供一些代码参考，以及分享一些接入途中遇到的坑。

# 1. 需要准备什么？
接入云服务通常来说都需要准备一系列的各种 `公钥 私钥 证书 APPID APPSECRET` 等乱七八糟的东西，此处进行简单的列举，详细的申请步骤可以参考 [《微信支付接入前准备》](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_1.shtml) 一文，相对来说已经描述的比较清晰了。

直接放代码：

```ruby
# 在申请微信支付时由平台分配的开发者ID
APPID = Rails.application.credentials[:wx_pay][:appid]

# 在申请微信支付时的收款账号
MCHID = Rails.application.credentials[:wx_pay][:mch_id]

# 微信支付 API V3 平台公钥，将用在回调验签中
API_V3_SECRET = Rails.application.credentials[:wx_pay][:api_v3_secret]

# 微信支付相关接口域名
DOMAIN = 'https://api.mch.weixin.qq.com'.freeze
```

以上几个参数是可以直接在后台拿到的（大概……），在后台进行支付申请的时候应该还有一组证书文件需要下载，下载后解压大概长这样：

![图片](https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/uploads/production/blog_photos/48/1609125555-image.png)

此时我们需要获取证书的序列号，该序列号会被用在签名里。

如何查看证书序列号，可以查看 [《微信支付 - 如何查看证书序列号》](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay7_0.shtml#part-5) 一文，在终端中利用 `OpenSSL` 可以很轻松的拿到。

如果你不方便使用终端，可以尝试使用如下的 `Ruby` 代码获取（其实也是一样的）：

```ruby
require 'openssl'

puts OpenSSL::X509::Certificate.new(open(your_cert_file_path).read).serial.to_s(16)
```

> 注意此处 `OpenSSL::X509::Certificate#serial.to_s` 得到的是一个十进制的值，而微信支付方统一使用的是十六进制的，因此我们传递了参数将其转为16进制。

由于证书会放在服务器上，该序列号是不会变更的，所以可以直接写入 `credentials` 里

```ruby
SERIAL_NO = Rails.application.credentials[:wx_pay][:serial_no]
```

至此，我们准备好了所有的参数。

# 2. 签名

云服务为了保证通讯的双方合法，通常会使用签名的方式来进行验证，我们请求任何一个微信支付方的接口时都需要进行签名并将签名置于请求头中。

关于签名与验签的详细说明请翻阅微信支付文档：

[《微信支付 - 签名生成》](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_0.shtml)

[《微信支付 - 签名验证》](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_1.shtml)

其中签名用于向微信支付发起请求，验签用于验证支付回调是否来自于微信支付。

以下是参考代码，我将签名与验证签名的两个方法封装在了同一个类中：

```ruby
require 'openssl'
require 'base64'

class Signature

  def initialize(private_key = open(your_apiclient_key.pem_path).read)
    @private_key = private_key
  end

  def sign(*params)
    str = params.push('').join("\n")
    pkey = OpenSSL::PKey::RSA.new(@private_key)
    digest = OpenSSL::Digest::SHA256.new
    signature = pkey.sign(digest, str)
    Base64.strict_encode64(signature)
  end

  def verify(params = [], sign)
    str = params.push('').join("\n")
    pkey = OpenSSL::PKey::RSA.new(@private_key)
    digest = OpenSSL::Digest::SHA256.new
    pkey.verify(digest, Base64.decode64(sign), str)
  end

end
```

此处的构造函数中传入了一个动态的证书是因为：

**签名与验签需要使用不同的证书！**

**签名与验签需要使用不同的证书！**

**签名与验签需要使用不同的证书！**

重要的事情我说了三遍了_(:з」∠)_，以下是 [微信支付 - 签名验证](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_1.shtml) 的截图：

![图片](https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/uploads/production/blog_photos/48/1609126710-image.png)

# 3. 封装请求
完成签名后我们可以开始尝试接入微信支付的相关API了，按照以往的惯例我们会把这些请求做一个简单的封装，例如统一下单接口（代码写的有点丑，别打我_(:з」∠)_）：

```ruby
class Service

  DOMAIN = 'https://api.mch.weixin.qq.com'.freeze
  APPID = Rails.application.credentials[:wx_pay][:appid]
  MCHID = Rails.application.credentials[:wx_pay][:mch_id]
  SERIAL_NO = Rails.application.credentials[:wx_pay][:serial_no]

  # * app支付接口
  def self.transactions_app(order_info)
  
    # * 构造请求参数
    method = 'POST'.freeze
    url = '/v3/pay/transactions/app'.freeze
    timestamp = order_info[:timestamp]
    nonce_str = order_info[:nonce_str]

    body = {
      "appid": APPID,
      "mchid": MCHID,
      "description": order_info[:description],
      "out_trade_no": order_info[:out_trade_no],
      "notify_url": your_notify_url,
      "amount": {
        "total": order_info[:amount]
      }
    }

    # 构造签名
    signature = WeChat::Util::CodeV3.new.sign(method, url, timestamp, nonce_str, body.to_json)

    # 构造请求头
    authorization_str = 'WECHATPAY2-SHA256-RSA2048 ' + "mchid=\"" + MCHIDMCHID + "\"," + "nonce_str=\"" + nonce_str + "\"," + "timestamp=\"" + timestamp.to_s + "\"," + "serial_no=\"" + SERIAL_NO + "\"," + "signature=\"" + signature + "\""

    # 发送请求
    response = RestClient.post(DOMAIN + url, body.to_json, headers = {
      "Content-Type": 'application/json',
      "Accept": 'application/json',
      "Authorization": authorization_str
    })
    JSON.parse(response.body)
  end

end
```

# 4. 获取平台证书

在一个完整的支付环节中，正确的向微信支付发送请求是第一步，第二步我们需要对响应进行验证以确保请求确实来自于微信支付方。

无论是验证响应，还是后续的微信支付回调通知，都需要使用相同的方法对签名进行验证。虽然相关的算法在前面已经实现了，但由于用于验签的证书与签名所使用的的证书是不一样的，因此需要提前准备证书。

微信支付平台证书是动态的，每隔一段时间会进行替换以确保安全性。因此需要通过接口拉取证书。

[《微信支付 - 获取平台证书列表》](http://192.168.31.72:3000/docs/index.html#/Order/post_v5_orders_huawei_pay_purchases_verify)

发送请求与前面的其他接口一样，只要按照文档进行签名等既可，没什么需要讲的。此处主要走一下拉取到证书后的流程。

获取平台证书列表返回的响应中，平台证书是经过加密的，要获取证书首先需要进行解密操作。

[《微信支付 - 证书和回调版本解密》](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_2.shtml)

微信支付对证书加密使用的是 `AEAD_AES_256_GCM` 加密算法，虽然在 `Ruby` 文档中找到了对应的标准库方法，但其实现细节似乎与微信支付给出的参数有些区别导致没有解密成功。

> 解释：
> 在[标准库文档](https://ruby-doc.org/stdlib-3.0.0/libdoc/openssl/rdoc/OpenSSL/Cipher.html)中，找到了 `AES-128-GCM` 相关内容：
> ![图片](https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/uploads/production/blog_photos/48/1609135747-image.png)
> 但让人疑惑的是微信支付返回的参数中的并没有解密需要的 `auth_tag` 。
> 如果有了解 `AEAD` 算法的朋友麻烦在评论区赐教解释一下_(:з」∠)_

最终找到了一个 [AEAD - GEM](https://github.com/onelogin/aead)，引入到工程后发现不能正常工作，查阅相关 [issue](https://github.com/onelogin/aead/issues/8) 找到了末尾的建议：

![图片](https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/uploads/production/blog_photos/48/1609136215-image.png)

![图片](https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/uploads/production/blog_photos/48/1609136227-image.png)

也就是说如果要使用该 `GEM` ，我们需要添加的是由 `shopify` 修改过的版本，查看 `repo` 发现后者是由 `shopify` `fork` 后修改过的版本，如果不放心的话可以把代码 `clone` 部署到私有云上……`Gemfile` 里指定自己的私有云 `repo` 地址既可。

而后我们对证书进行解密既可：

```ruby
require 'aead'

def self.aead_decode(key, nonce, aad, cipher_text)
  mode = AEAD::Cipher.new('AES-256-GCM')
  cipher = mode.new(key)
  cipher.decrypt(nonce, aad, cipher_text)
end
```

证书虽然每隔一段时间会更新，但并不需要每次都需要拉取，根据 [《微信支付 - 平台证书更新指引》](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay5_0.shtml) 的建议，此处我们在每次进行验签前，先将本地已经存储的证书序列号与 微信响应/回调请求 中声明的证书序列号做对比，当本次响应/请求使用的证书与本地不符时，才拉取最新的证书并持久化到本地，最终实现惰性更新。以下是参考代码：

```ruby
def fetch(serial)

  # 1. 通过serial序列号查找本地是否存在响应的证书，如果有，将证书实例返回
  ... 
  return OpenSSL::X509::Certificate.new(open(cert_file_name).read) if File.exists? cert_file_name

  # 2. 本地不存在时，请求接口拉取当前最新的证书列表
  cert_list = WeChat::Service.certificates
  cert = cert_list[:body]['data'].select{|cert| cert['serial_no'] == serial }[0]

  return false if cert.nil?

  # 3. 对证书进行解密
  plaintext = aead_decode(API_V3_SECRET,
                          cert['encrypt_certificate']['nonce'],
                          cert['encrypt_certificate']['associated_data'],
                          Base64.decode64(cert['encrypt_certificate']['ciphertext']))

  # 4. 将证书持久化到本地并返回证书实例
  file = File.open(cert_file_name, 'a+')
  file&.syswrite(plaintext)
  OpenSSL::X509::Certificate.new open(cert_file_name).read
end
```

# 5. 对回调请求、响应进行验签

验证签名比较简单，根据 [《微信支付 - 签名验证》](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_1.shtml) 的指引，我们需要对 响应/回调请求 进行如下验证：

- 检验微信支付方使用的证书
- 使用微信支付证书中的公钥验证签名
- 解密响应报文，获取响应数据
- 验证订单数据

此处有一个不得不提的坑是在验证签名时应使用 **请求报文的原文** ，在 `Rails` 中可以通过如下方法获取：

```ruby
request.raw_post
```

以下使用异步回调通知进行示例（示例中删除了部分业务代码）：

```ruby
# frozen_string_literal: true

require 'pay/wechat/wechat'
require 'pay/wechat/util'

class WechatController < ApplicationController

  # * 微信支付后的回调接口
  def pay_notify

    wechat_pay_serial = request.headers['Wechatpay-Serial']
    wechat_timestamp = request.headers['Wechatpay-Timestamp']
    wechat_pay_signature = request.headers['Wechatpay-Signature']
    wechat_pay_nonce = request.headers['Wechatpay-Nonce']

    # 获取请求体原文
    body = request.raw_post

    # 1. 验证微信平台证书与当前持有的证书是否相同
    #    当微信平台证书序列号与本地证书序列号不相同时，应答错误信息，等待下一次回调
    unless WeChat::Util::ResultVerify.new.serial_verify?(wechat_pay_serial)
      raise ......
    end

    # 2. 验证回调签名
    #    获取微信平台证书公钥并进行签名验证
    wechat_pay_public_key = WeChat::Util::Certificate.get(wechat_pay_serial).public_key.to_pem
    unless WeChat::Util::CodeV3.new(wechat_pay_public_key).verify([wechat_timestamp, wechat_pay_nonce, body], wechat_pay_signature)
      return render json: ......, status: 400
    end

    # 3. 解密请求主体中的订单信息并验证
    nonce = params["resource"]["nonce"]
    aad = params["resource"]["associated_data"]
    cipher_text = params["resource"]["ciphertext"]

    decode_str = WeChat::Util::Certificate.send(:aead_decode, WeChat::API_V3_SECRET, nonce, aad, Base64.decode64(cipher_text))

    res = JSON.parse(decode_str)

    order = Order.find_by_out_trade_no(res["out_trade_no"])

    unless order.total_fee == res["amount"]["total"]
      return render json: ..., status: 400
    end

    unless WeChat::ServiceV3::AppID == res['appid']
      return render json: ..., status: 400
    end

    unless WeChat::ServiceV3::MchID == res['mchid']
      return render json: ..., status: 400
    end

    # 发货处理
    ...

    render json: {'code': "SUCCESS", 'message': ''}

  rescue ActiveRecord::StaleObjectError
    return render json: ..., status: 400
  rescue WeChat::Util::CertificateNotFound
    return render json: ..., status: 400
  rescue StandardError => e
    logger.error "#{e.full_message}"
    render json: ..., status: 500
  end

end
```

几乎就是纯面向过程编程……代码中有些诸如 `xx.send` 的东西大家就当没看见好了_(:з」∠)_（蒙混过关）……

# 6. 结语

至此我们就完成了基础的微信支付中所涉及到的大部分问题，个人感觉微信支付升级到V3之后确实要简单了不少。~~即便如此每次接入一个新的云服务的时候都感觉是被按在地上补密码学……~~

对于文中的叙述有不同意见可以在评论区与我讨论，如果觉得这篇文章对您有用不妨给我一个赞~最后祝大家都能光速接入微信支付。
