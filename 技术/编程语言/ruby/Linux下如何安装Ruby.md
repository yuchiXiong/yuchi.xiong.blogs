# Linux下如何安装Ruby

## 1. 安装

使用`Ruby`自然首先要安装（废话。

通常我们会使用`RVM`来进行`Ruby`的版本管理：

[RVM官网]([http://rvm.io/](http://rvm.io/))

### 1.1. 安装GPG keys
~~~shell
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
~~~

### 1.2. 安装RVM
使用如下命令安装`RVM`
~~~bash
\curl -sSL https://get.rvm.io | bash -s stable
~~~
如果希望默认安装`Ruby`和`Ruby on Rails`也可以直接使用如下命令
~~~bash
\curl -sSL https://get.rvm.io | bash -s stable --rails
~~~

### 1.3. 查看版本
~~~bash
source /etc/profile.d/rvm.sh

rvm -v
~~~

### 1.4.  安装指定版本的`Ruby`
~~~bash
rvm install 2.5.3
~~~

## 2. 避雷

### 2.1. 安装`Ruby`时提示`Error running 'requirements\_debian\_update\_system ruby-2.5.3'`
~~~bash
 rvm autolibs 1
~~~

### 2.2. 安装`Rails`时提示`ERROR: Failed to build gem native extension.`
~~~bash
sudo apt-get install ruby-dev
~~~

### 2.3. 安装`SQLite3`时提示`ERROR: Failed to build gem native extension.`
~~~bash
apt-get install sqlite-dev
~~~


