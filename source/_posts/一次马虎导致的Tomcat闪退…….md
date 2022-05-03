---
title: 一次马虎导致的Tomcat闪退……
date:  2018.09.05 22:00
tags:
  - 读书笔记
  - 时间管理
categories:
  - 好书分享
---

昨天弄完新的小`demo`准备挂到服务器上，在服务器上关掉了`Tomcat`然后删掉了`webapps`文件夹下的War问价以及对应的文件夹。

紧接着上传了新的`War`文件并构建了数据库之后再启动`Tomcat`就发现命令行里跑几句代码之后命令行就没了。

百度了很多方法说在`StatrUp`最末加上`PAUSE`，于是看到了这样一段代码
~~~
NOTE: Picked up JDK_JAVA_OPTIONS:  --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.rmi/sun.rmi.transport=ALL-UNNAMED
~~~
于是乎百度Google找了几个小时也没弄明白，回到`Tomcat`的`Conf`文件夹下查看日志多次报`A child container failed during start`的错误。

在百度之后看到了`server.Xml`，于是回到该文件中查看配置的路径，发现这样一句话
~~~xml
<Context path="" docBase="C:\apache-tomcat-9.0.7\webapps\......" debug="0" reloadable="true" /> 
~~~
其中配置的文件路径俨然是之前的项目名= =！

于是光速改掉之后再启动`StartUp`发现已经可以启动了，然后新的页面也可以访问。（mmp）

这么一点小问题能折腾这么久也是挺佩服自己……再加上昨天还能犯忘记导入jar包这种错误真是内心全是波澜。
