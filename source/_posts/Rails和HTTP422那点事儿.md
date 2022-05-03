---
title: Rails 和 HTTP422 那点事儿
date: 2020-05-22 20:37:00
tags: 
  - Rails
categories:
  - Rails 踩坑记录
---

**问题描述**
用`Ruby on Rails`开发点接口的时候遇到了`HTTP 422`问题。回去看了眼公司的项目，发现在`environments`里写了一句这个：
~~~ ruby
config.action_controller.allow_forgery_protection = false
~~~
参考了一下`Ruby on Rails`文档中对于`CSRF`的描述：
> 默认情况下，Rails 自带的非侵入式脚本适配器会在每个非 GET Ajax 调用中添加名为 X-CSRF-Token 的首部，其值为安全令牌。如果没有这个首部，Rails 不会接受非 GET Ajax 请求。使用其他库调用 Ajax 时，同样要在默认首部中添加 X-CSRF-Token。要想获取令牌，请查看应用视图中由 <%= csrf_meta_tags %> 这行代码生成的 <meta name='csrf-token' content='THE-TOKEN'> 标签。
除了指定的接口外，都需要认证。
> ——[Ruby on Rails 安全指南](https://ruby-china.github.io/rails-guides/security.html#csrf-countermeasures)

上述配置是非常不推荐的。

**解决方案**

`CSRF`又称为跨站点请求伪造攻击，大意是通过一些手段骗取用户的`cookie`来向源站点发起请求，以达到在用户浑然不觉的情况下使用其账户进行操作的攻击，也是极为常见的一种`WEB`安全问题。 

`Rails`对于`CSRF`的防御策略是在每个页面上生成一个只有服务器才知道的`token`用于验证发起请求的站点究竟是不是允许请求的站点，当服务器验证`token`失败时，会返回`HTTP 422`拒绝本次请求。 当我们在`Rails`里编写表单提交时，应该尽可能的避免编写原生表单，而是应该使用如下代码代替之：

```erb
<%= form_for @user do |f| %>
  <%= f.text_field :username %>
  <%= f.text_field :password %>
<% end %>
```

这是`Rails`的`View Helper`方法，使用该段代码生成的表单将自动添加验证`token`，开发者不必额外关注即可解决安全隐患。 在部分手动提交表单（如`AJAX`）的场景里，我们可以使用`form_authenticity_token`方法获取到`token`:

```erb
<form action="/sessions" method="post">
  <input type='hidden' value="<%= form_authenticity_token %>" name="authenticity_token"/>
  <input name='username' type="text"/>
  <input name='password' type="password"/>
  <input type="submit"/>
</form>
```

现代前后端分离的架构下我们通常使用如`jwt`令牌等`token`来标记请求状态，因此在`API`开发的场景下我们可以酌情考虑关闭`CSRF`的验证机制（具体可参考如下代码）。 

```ruby
class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :json_request?

  def json_request?
    request.format.json?
  end
end
```

**但仍需要注意一点是，token 的存储问题是值得考虑的，存储在 cookie 中则依然无法避免 CSRF 漏洞，反之如果存储在 LocalStorage 中，则需要留意 XSS 攻击的防御。**