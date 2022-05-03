---
title: 在Rails里使用MongoDB
date: 2020-06-21 16:23:50
tags:
  - Rails
  - MongoDB
categories:
  - Rails踩坑记录
---
## 1. 写在前面
我逛`ruby china`的时候发现很多前辈12年左右就开始用`Rails + MongoDB`的组合了，但当我终于有一天要用到时候居然没有找到一篇教程= =！

我本来以为就和之前把`PostgreSQL`替换成`MySQL`差不多，装个驱动，然后`database.yml`配置改一下就可以用了，结果发现`Active Record`居然没支持`MongoDB`……

然后今天装服务器环境，下载比较慢，正好有点时间，遂写下这篇教程。

## 2. 安装依赖
依赖的话，就两个，一个是驱动，一个是`ORM`层，用来替换`Active Record`的。不过由于`MongoDB`是面向文档的数据库，所以这里更准确的名字叫`ODM`（对象文档映射）。

版本的话自己对照文档找合适的即可。
~~~ruby
gem 'mongo', '~> 2.12', '>= 2.12.1'
gem 'mongoid', '~> 7.1', '>= 7.1.2'
~~~

## 3. 生成配置文件 & 修改 ORM 配置
安装完成之后需要生成`MongoDB`的配置文件：
~~~ shell
rails g mongoid:config
~~~
执行过之后你会在你的`config`目录下看到一个`mongoid.yml`文件，打开之后就按照属性名和注释修改即可。

到这里其实已经可以使用了，当我们使用脚手架生成`rails g model XXX attr1:string attr2:integer`时会发现新生成的`model`文件是不太一样的，它大概就像下面这样：
~~~ruby
class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :uuid, type: String
  field :account, type: String
  field :user_name, type: String
  field :password_hash, type: String
  field :email, type: String
  field :is_admin, type: Mongoid::Boolean
end
~~~
不过实测当你运行`rails db:seed`等命令的时候，`Rails`还是会去找`Active Record`。因此你还需要在`config/appliction.rb`文件中添加如下代码：
~~~ruby
config.generators do |g|
    g.orm :mongoid
end
~~~
然后就可以正常使用了。

## 4. 最后
试用了两天`MongoDB`体验还是相当好的，`mongoid`几乎就和`Active Record`一样，所以应用层的代码几乎没有太大的变化。

异常捕获需要根据实际情况替换成`Mongoid`模块下的异常。属性的话，`mongoid`似乎会把`_id`和`id`当成同一个东西，因此如果需要一个单独维护的`id`的话，建议还是起其它名字比较好。

最后就是`MongoDB`到底是`NoSQL`，头一次在`Rails`里没有一条`migrate`文件，还真有点不习惯……