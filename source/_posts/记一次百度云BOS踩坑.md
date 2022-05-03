---
title: 记一次百度云BOS踩坑
date: 2020-07-12 13:56:18
tags:
  - 运维
categories:
  - 好饿，早知道不学编程了
---
**问题描述**

使用百度提供的STS获取bos临时授权时出现下面的错误：

~~~ shell
Failed to open TCP connection to sts.bj.baidubce.com:80 (getaddrinfo: Temporary failure in name resolution)
~~~

使用 `ping sts.bj.baidubce.com` ：

~~~ cmd
ping: sts.bj.baidubce.com: Temporary failure in name resolution
~~~

**解决方案**

在 `/etc/resolv.conf` 中添加对应内容
 
~~~ shell
vim /etc/resolv.conf
nameserver 111.206.37.122
~~~

再次尝试 `ping sts.bj.baidubce.com`

~~~ shell
PING sts.bj.baidubce.n.shifen.com (111.206.37.122) 56(84) bytes of data.
~~~