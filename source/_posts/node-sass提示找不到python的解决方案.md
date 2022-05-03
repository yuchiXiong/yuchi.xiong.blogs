---
title: node-sass提示找不到python的解决方案
date: 2020-07-12 14:05:42
tags:
  - 前端
categories:
  - 前端踩坑记录
---
**问题描述**

安装`node-sass`时报错提示找不到`python`

**解决方案**
~~~ shell
npm install -g node-gyp
~~~

话说现在大概都用`dart-sass`了吧……