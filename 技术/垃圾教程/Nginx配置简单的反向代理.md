# 使用Nginx配置简单的反向代理

先讲一下场景，手里有两个域名，一台云服务器，一堆垃圾项目。

现在想要的是，访问域名A，能够访问的是3000端口下的应用A；访问域名B，访问的是3001端口下的应用B；

## 1. 安装nginx
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
- 1.添加了带www与不带www的代理
- 2.对于`server_name`有个很奇怪的地方是，不带`www`的域名一定要写在前面，目前不太明白原理
- 3.空格符分隔
