---
title: 扒视频！Ruby爬虫初探
date: 2020-06-11 19:25:25
tags:
  - Ruby
  - 后端
  - 爬虫
categories:
  - 程序员的幸福：让代码变成强有力的工具
---

> 写在最前面：出于学习目的，我在网络上分享了这篇文章。但我不能保证我的文章是否会给文章里的站点带来困扰，因而文中将不会出现该站点的真实访问路径。

## 1. 起因
最近因为公司产品需要，老板交代我从某网站下载大量的资源，网站的资源列表一共有116页，每一页有16个子页面，进入子页面后拿到百度云分享链接的提取码，然后进入分享页面输入提取码，登录百度云账号，将文件保存到云盘，最后使用百度云客户端进行下载。

我看了下页码和网站的响应速度，顿时感觉此事没那么简单，掏出了我的计算器进行计算：`116*16=1856`，该网站的服务器在国外，初步评测发现，打开首页 -> 进入详情页-> 打开百度云分享页 -> 输入密码并提取文件 -> 保存到自己的百度云盘，这个过程至少也要花1分钟。也就是说保存完所有的资源我们**需要花上`30`小时以上**！


## 2. 爬虫
大概在前年的时候，那会儿我刚开始学习写代码，在朋友的推荐下开始使用简书来记录学习的一些心得。记得当时铺天盖地的营销号标题：《我用`Python`爬虫爬了xxGxx资源》看的我好生羡慕，后来虽然没有学`Python`，但摸鱼的时候还是去尝试着鼓捣了一下。

### 2.1 爬虫的前置知识
爬虫并不是什么神秘的东西，从一个比较基础的层面上讲，爬虫就仅仅是一种围绕拉取网站资源而展开的脚本而已。

**请求**

我们知道，当我们在浏览器里访问一个页面时，实际上是发出了一个`GET`请求，服务器接收请求并响应`HTML`静态页面给浏览器，最终浏览器渲染页面并展示给用户，一次访问就完成了。

**渲染**

不管什么样的页面，在请求后一样都是由服务器返回`HTML`静态页面给浏览器，但在实际的架构实践中，我们要区分服务端渲染与客户端渲染。

基于服务端渲染的技术包括了`JSP``ASP`等，它们会在接收请求后将生成的静态页面发送给客户端，页面到达客户端时就已经是页面最终的样子。

基于客户端渲染的技术包括了`VUE`,`React`等，它们在接受请求后返回入口页和`JavaScript`脚本文件，当页面到达客户端后，`JavaScript`执行渲染来呈现最终的页面。

这两者最大的区别就在于，当我们拉取页面结构时，基于服务端渲染的页面会返回完整的`HTML`结构，而基于客户端渲染的页面则只返回最基础的入口页标签。我们可以通过如下两张图对比差异：

![服务端渲染](./images/ba-shi-pin-ruby-pa-chong-chu-tan/ssr.png)

![客户端渲染](./images/ba-shi-pin-ruby-pa-chong-chu-tan/csr.png)

上图我们拉取了服务端渲染的百度，很显然我们拿到了所有的页面标签；而下图中，我们拉取了客户端渲染的`antd pro`，在页面中，除了大量的`<script></script>`标签外，我们只看到了少数入口标签如`<div id='root'></div>`。

**数据**

我们编写爬虫是为了从站点中获取数据，但上述的图例中我们显然没有成功的从客户端渲染的页面里获取到期望的数据。

参考一下客户端渲染的实践，我们通常在组件挂载后请求数据。这里重点就来了，既然客户端渲染是请求数据，那么我们又何必拘束与非要从页面上拉取数据呢？因此针对客户端渲染，我们不妨使用模拟请求的方式进行数据的拉取。

### 2.2 工具介绍
在BB了这么多之后，还需要介绍一下在本次案例中使用到的工具与库，我使用的是 `Ruby` 语言，但编写爬虫并不局限你使用哪一种语言。
- `nokogiri`库：一个解析`HTML/XML`字符串的库，它可以将`HTML/XML`字符串解析为我们熟悉的`HTML`元素对象，同时还提供了`css`选择器风格的过滤方法。
- `rest-client`库：一个请求库，它用起来就像`axios`一样方便。
- `open-uri`：同上。
- `json`：`JSON`解析库。
- `chrome`调试工具：不多解释了。

### 2.3 编码
在准备工作做好之后，我们就可以开始代码的遍写了。

**获取每一页的所有Item项的访问地址**

首先我们应该通过`chrome`的代码审查来确定页面到底基于什么样的方式构建。

可以看到如下图所示，我们右击选择查看网页源代码，就可以看到该页面的列表实际上使用了`JavaScript`来渲染。

![首页列表](./images/ba-shi-pin-ruby-pa-chong-chu-tan/home_list.png)

![列表js脚本](./images/ba-shi-pin-ruby-pa-chong-chu-tan/home_list_javascript.png)

确定了列表是使用`JavaScript`渲染之后，我们可以打开`Chrome`开发者工具，选择`network`里的`XHR`并刷新页面，我们不难找到有个叫做`launchpad/fetch`的接口，它的返回值里包含了一个长度为16的数组，页面里的列表正是使用了这个数组进行遍历渲染。稍微查阅一下该请求的请求头，参数等部分，我们很容易得到如下信息：

接口名|参数|备注
--|:--:|--:
/api/launchpad/fetch|pageNo/pageSize|传递页码/数据量，返回每个列表项页面的唯一ID

代码：
~~~ruby
FETCH_ITEM_URL = 'http://.../api/launchpad/fetch'.freeze
response = RestClient.post(FETCH_ITEM_URL,
                          'pageNo': page_no,
                          'pageSize': 16)
project_list_data = JSON.parse(response.body)['result']
~~~
我们再次查阅源站页面，发现，接口中返回的`prefectureId`将作为`URL`参数直接传递到子页面，就像这样：
~~~ 
http://.../home/launchpad/detail?prefectureId=prefectureId
~~~
我们只需要遍历`project_list_data`数组，就可以获得当前页面列表中，所有子列表项的访问地址：
~~~ ruby
project_list_data.each do |project|
  prefecture_id = project['prefectureId']
  project_item_url = ITEM_PAGE_URL + prefecture_id.to_s
end
~~~

**访问子页面下载视频**

在我刚写完获取首页列表项（我们后面统称为子页面）的访问链接时，我的老板又给我追加了一个任务：**下载子页面上的视频**。

没有任何问题，我们依然从页面审查开始：
![视频页面元素](./images/ba-shi-pin-ruby-pa-chong-chu-tan/video_href.png)

如图我们首先确定了这个页面（至少视频部分）是使用服务端渲染的，并且很快找到了页面中的`video`元素，不难发现`src`属性中的链接似乎就是我们希望找到的东西，将其复制，在浏览器中打开，成功看到了我们想要的视频，Good~

当我们拿到这样一个链接后，想要将其下载是非常简单的：
~~~ ruby
item_page = Nokogiri::HTML(open(project_item_url))
video_url = item_page.css('.container source')[0]['src']
file_name = video_url[video_url.rindex('/') + 1..-1]

puts "#{file_name}下载完成"

video = RestClient.get(URI.encode(video_url))

file = File.open("videos/#{file_name}.mp4", "a+")
if file
  file.syswrite(video)
end
~~~
拉取子页面并使用`nokogiri`进行解析，然后我们就像写`JQuery`一样使用`css`选择器获取了`video`元素并读取到了`src`属性。

我们使用`GET`方法请求该属性即可拿到视频的数据，然后将其写出到指定的文件目录里，一个视频就简单粗暴的下载好了，为了让每个视频都有自己的名字，我们简单的使用字符串方法截取了视频的名字，现在当我们运行脚本，就可以看到`videos`目录下有一个又一个视频冒出来~

![下载视频](./images/ba-shi-pin-ruby-pa-chong-chu-tan/download_video_result.png)

#### 2.3.3 访问子页面获取资源提取码与分享地址

#### 2.3.4 使用提取码提取文件

#### 2.3.5 将文件转存到我的百度云盘

### 2.4 成果

## 3. 总结
## 4. 尾声
