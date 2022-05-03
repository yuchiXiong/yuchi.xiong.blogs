---
title: MongoDB 配置
date:  2018.11.26 08:01
tags:
  - JavaScript
  - 前端
categories:
  - JavaScript 高级程序设计
---
## 1. 安装一路向下
## 2. 完了之后先在安装盘根目录创建一个`/data/db`文件夹
## 3. 在安装目录的`bin`目录下执行
~~~
mongod --dbpath D:\software\MongoDB\data\db
~~~
## 4. 去安装目录下启动`mongod.exe`
![启动成功](./images/mongodb-pei-zhi/1.webp)
## 5.配置`MongoDB Service`
先在`/data/db`文件夹下新建一个`log`文件夹

安装根目录下创建`mongo.config`文件

~~~
dbpath=/data/db 文件夹目录

logpath=log 文件夹目录\mongo.log
~~~

在安装目录的`bin`目录下执行管理员 CMD

~~~
mongod --config "mongo.config 目录" --install --serviceName "MongoDB"
~~~

![完成](./images/mongodb-pei-zhi/2.webp)
