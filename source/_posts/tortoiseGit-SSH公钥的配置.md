---
title: tortoiseGit SSH 公钥的配置
date: 2018.08.02 19:08:42
tags:
  - Linux
categories:
  - Rails 踩坑记录
---
使用 Git 命令行生成公钥和私钥

1. 进入`git push`界面（备注：左 Shift + 鼠标右键弹出菜单里面，有直接进入命令行的菜单，但是这里千万不要用这个，因为这里进入的命令行和系统 cmd 进入的权限不一样，生成的秘钥是不一样的，踩过这个坑），我这里默认路径是`C:\Users\Administrator`,这个路径没有要求，任何目录都可以，生成钥的时候需要输入密码，这里默认写 **123456**，后面 clone 代码的时候需要用到。

2. 执行命令：`ssh-keygen –t rsa –C xxxx@xxx.com(你的邮箱)`

3. 输入保存的文件名：enter

4. 输入密码:enter

即可成功创建公钥和私钥，这里会保存到 C:\Users\Administrator 目录下
