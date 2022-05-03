---
title: 使用 Nginx 配置简单的反向代理
date:  2019.05.30 23:47:14
tags:
  - JavaScript
  - 前端
categories:
  - JavaScript 高级程序设计
---
先讲一下场景，手里有两个域名，一台云服务器，一堆垃圾项目。

现在想要的是，访问域名 A，能够访问的是 3000 端口下的应用 A；访问域名 B，访问的是 3001 端口下的应用 B；

## 1. 安装 nginx
参考一下百度就好，不赘述了。

## 2. 写配置文件
配置文件在`nginx/nginx.conf`下完成，部分使用`nginx`官方文档安装的同学可能会进不去目录。

在`nginx.conf`文件中配置以下内容
~~~nginx
server {
  listen  80;
  server_name domin001.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
  }
}

server {
  listen  80;
  server_name domin002.com;

  location / {
    proxy_pass http://127.0.0.1:3001;
  }
}
~~~
上面的配置描述了当用户输入`domin001.com`进入网站是，实际由`http://127.0.0.1:3000`代理。同样是对于`domin002.com`，也是使用了对应的`http://127.0.0.1:3001`进行代理。

tip:需要注意的是，对于部分`javascript`,`ruby`等玩家来说，分号可能并不是必要的内容，但很不幸`nginx `的配置文件是有分号需求的。


## 3. 更新
今天早上测试了一下发现了一些问题，将配置修改为如下
~~~nginx
server {
  listen  80;
  server_name domin001.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
  }
}

server {
  listen  80;
  server_name domin002.com;

  location / {
    proxy_pass http://127.0.0.1:3001;
  }
}
~~~

与上面的区别在于以下
- 1.添加了带 www 与不带 www 的代理
- 2.对于`server_name`有个很奇怪的地方是，不带`www`的域名一定要写在前面，目前不太明白原理
- 3.空格符分隔
