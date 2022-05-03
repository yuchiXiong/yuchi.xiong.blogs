---
title: git clone 速度太慢的解决方案乱谈
date: 2019.05.30 16:23
tags: 
  - Ruby
categories:
  - 菜鸡的 Ruby 之旅
---
以下方案仅供参考，目测替换后速度由 4-10k 提升到 60-200k，依然龟速……

1. 带权限打开`/etc/hosts`
    ~~~
    sudo vim /etc/hosts
    ~~~
2. 添加如下内容
    ~~~
    151.101.72.249 github.global.ssl.fastly.net  
    192.30.253.112 github.com
    ~~~
