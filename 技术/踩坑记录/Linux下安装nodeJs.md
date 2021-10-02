# Linux下安装NodeJs

不得不说`Linux`下坑确实多，使用`apt-get`安装的`NodeJS`是4.2.6版本的，而使用`nvm`又老是遇到问题

~~~bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
~~~
或者
~~~bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
~~~
如果执行后使用`nvm -v`提示的是`nvm:common is not found`，则运行如下内容即可
~~~bash
source ~/.nvm/nvm.sh
source ~/.profile
source ~/.bashrc
~~~
如果正常输出版本号则可以直接安装
~~~bash
nvm install 10.15.3
~~~
