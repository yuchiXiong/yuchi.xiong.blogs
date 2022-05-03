---
title: Rails test 等命令卡死常用的解决方案
date: 2020-05-22 21:03:25
tags:
  - Rails
categories:
  - Rails 踩坑记录
---
**问题描述**

之前配合测试的实习生跑`TeamCity`时发现写好的`rails test`经常构建超时，上了测试服务器试了一下发现运行`rails test`会卡死，同时包含`rails c/rails g`等命令一样会卡死。

**解决方案**

通常情况下都和`spring`有关，该插件用于在`development`环境下加速，在除`development`外的环境里是不应该安装的，使用如下命令可以将其关闭。
~~~ shell
spring stop
~~~

同时也应该规范`bundle`操作行为，对于`spring/web-console/listen`等这一类开发环境才使用的`gem`应该置于`Gemfile`中的`development`组，然后在生产环境使用如下命令排除`development group`的依赖：
~~~ shell
bundle install --without development
~~~
