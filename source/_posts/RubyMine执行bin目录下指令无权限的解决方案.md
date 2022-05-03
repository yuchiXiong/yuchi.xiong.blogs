---
title: RubyMine执行bin目录下指令无权限的解决方案
date: 2020-05-22 21:15:04
tags:
  - Linux
categories:
  - Rails踩坑记录
---
**问题描述**

- `RubyMine`点击测试时提示权限不够/
- `RubyMine`终端执行`./bin/xxx`命令提示权限不够

**解决方案**

没啥好说的，没权限就给权限呗。
~~~ shell
chmod +x {bundle,rails,rake,setup,spring,update,yarn}
~~~