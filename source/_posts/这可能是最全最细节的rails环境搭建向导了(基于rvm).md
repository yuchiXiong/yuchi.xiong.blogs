---
title: 这可能是最全最细节的 rails 环境搭建向导了 (基于 rvm)
date: 2020-07-12 13:17:22
tags: 
  - Ruby
categories:
  - 菜鸡的 Ruby 之旅
---
## 0. 写在前面

安装`ruby`其实是个很容易的活儿（大概），但是我总是在不同的环境里遇到不同的问题，每次我解决之后就会习惯性的将它记录到笔记软件里，随后又继续投入到工作之中。一直到某一天我看到我的笔记软件里居然有那么多不同的安装`ruby`时遇到的坑，我想，是时候汇总一下了。

## 1. 下载`rvm`

本文统一使用`rvm`进行`ruby`的版本管理。

### 1.1 建议

首先写在最前面的是：**不推荐将`rvm`安装在 root 用户下**。

>  本篇教程**在未遇到不可抗力**的情况下不需要使用`sudo`。然而显然这种概率极小……

### 1.2 如何正确的卸载`rvm`

对于一部分把`rvm`装在了`root`用户下且希望卸载并按照本教程继续，或者本来就是来看如何卸载的小伙伴，可以使用如下命令然后**重启**。

~~~ shell
rvm implode

# 重启
reboot
~~~

至于为什么要重启，感兴趣的小伙伴可以自己对比重启前和重启后的`env`（使用如下命令即可）

~~~ shell
env | grep rvm
~~~

### 1.3 下载`rvm`

下载`rvm`可以参考文档，如果你实在懒得打开文档，直接用如下命令就可以了，至于`rvm`的文档，百度第一个就是。

~~~ shell
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

\curl -sSL https://get.rvm.io | bash -s stable

echo "source $HOME/.rvm/scripts/rvm" >> ~/.bash_profile

# 此时你应该打开一个新的终端或者直接使用如下命令
/bin/bash --login

# 输出版本号则意味着已经完成安装
rvm -v
~~~

通常如果你在一个新的`Linux`系统上安装`rvm`，那你大概率会遇到如下提示：

~~~ shell
The program 'gpg2' is currently not installed. You can install it by typing:
~~~

其实无论怎么看你都应该知道解决方法，不过善良的我还是贴心的写出了解决方法：

~~~ shell
sudo apt-get install gnupg2
~~~

顺便再婆婆妈妈一句，另一个与之类似的错误可能是这个：

~~~ bash
sudo apt-get install dirmngr
~~~

当执行第二步时提示：

~~~ shell
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
~~~

你需要将`199.232.28.133 raw.githubusercontent.com`添加到 hosts 中，具体操作是这样的：

~~~ shell
sudo vim /etc/hosts
~~~

如何使用`vim`编辑，保存，不是本篇要讲的。

## 2. 下载`ruby`
到这里其实就很简单了，不过在下载`ruby`之前建议先替换`ruby-china`的镜像：
~~~ shell
echo "ruby_url=https://cache.ruby-china.com/pub/ruby" > ~/.rvm/user/db
~~~
之后直接使用如下命令即可安装你希望的`ruby`版本：
~~~ shell
rvm install 2.5.7
~~~
你可以同时安装多个版本的`ruby`，然后只需要：
~~~ shell
rvm use 2.5.7
~~~
即可快速切换。

## 3. 安装`rails`

### 3.1 如何正确的卸载`rails`
还是说一下，我曾经在开发环境安装了个多个版本的`rails`（生命不息折腾不止），但在使用如下命令进行卸载后发现依然可以使用脚手架等工具，且出现了版本乱七八糟的问题：
~~~ shell
gem uninstall rails
~~~
对于多版本，上述代码在执行时会询问要卸载的版本，所以不用太担心。但除此之外你可能还要使用如下代码卸载`railties`：
~~~ shell
gem uninstall railties
~~~

### 3.2 配置镜像并安装
多嘴一句，有的小伙伴如果用的国外的服务器，其实就不需要配置镜像了，配置了反而会更慢的……

使用如下命令配置镜像：
~~~ shell
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
bundle config mirror.https://rubygems.org https://gems.ruby-china.com
~~~

然后直接安装即可
~~~ shell
gem install rails -v 5.2.4
~~~
这里使用了`-v`参数指定了版本为`5.2.4`，有些小伙伴可能并不关注前端部分，因此是否需要使用`rails 6.0`其实有待商榷，为避免默认安装`rails 6.0`导致以后使用脚手架直接整上`webpacker`，这里还是建议指定一下版本。

最后，enjoy it!
