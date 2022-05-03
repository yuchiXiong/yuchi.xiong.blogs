---
title: Linux服务器无法使用mstsc工具链接的解决方案
date:  2019.05.10 20:02
tags:
  - JavaScript
  - 前端
categories:
  - JavaScript高级程序设计
---

最近更换了阿里云的云服务器系统为`ubuntu`后发现使用`windows`自带的`mstsc`工具无法连接，需要使用阿里云的救援连接安装并启动`xrdp`：
~~~shell
sudo apt-get update

sudo apt-get install xrdp

service xrdp start

chkconfig xrdp on
~~~
