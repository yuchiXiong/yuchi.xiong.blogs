# Linux安装Android Studio
不要问我为什么一会儿前端一会儿`Ruby`一会儿又`Android`，心里苦……

使用的操作系统是`ubuntu`。

## 1. 安装`JDK`
此处存疑：`Android Studio`似乎需求使用指定的`JDK8`，一开始安装了`JDK11`然后在某一出报错被拦下来了。

另外`Oracle`下载`JDK`开始要求登陆了，不知是好消息还是坏消息。

[Oracle官方下载JDK8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

解压后修改`/etc/profile`文件如下
~~~bash
# 修改文件
sudo vim /etc/profile

//配置环境变量的几句配置了
export JAVA_HOME=/usr/jdk1.8.0
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH

# 使配置生效
source /etc/profile
~~~

使用`java -version`和`javac`测试是否成功
~~~bash
$ java -version
java version "1.8.0_211"
Java(TM) SE Runtime Environment (build 1.8.0_211-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.211-b12, mixed mode)

$ javac
用法: javac <options> <source files>
其中, 可能的选项包括:
  -g                         生成所有调试信息
  -g:none                    不生成任何调试信息
...
~~~

## 2. 下载`Android Studio`
到`Google`的`Android Development`页面下载`Android Studio`。

[Google Android Studio下载页面](https://developer.android.google.cn/studio)

老规矩依然是下载解压然后使用`/AndroidStudio根目录/bin/studio.sh`启动`IDE`。

在安装开始时你可能会遇到一条关于`proxy`的提示，这是需要配置代理，我使用下面这篇帖子的第一条配置完成修改进入`IDE`

[android studio 配置HTTP proxy](https://www.cnblogs.com/pingxin/p/p00078.html)


## 3. 使用`SDK Tools`
如果到这里你的`IDE`已经顺利安装并能够创建项目了，对不起我们不认识，你可能是选召的孩子= =！

如果安装过程中提示了`SDK tools directory is missing...`（太长了忘记了。。。），则需要使用`SDK Tools`工具来进行`SDK`的安装，依然是这个页面，可以按`Ctrl + F`搜索`Command line tools only`找到对应的`Tools`工具并下载。

[Google Android Studio下载页面](https://developer.android.google.cn/studio)

下载解压后使用`/tools根目录/bin/sdkmanager [package]`的方式安装`SDK`,使用`/tools根目录/bin/sdkmanager --list`可以查看当前能够安装的内容。我安装了如下内容，如果你看到这篇文章的时候请考虑是否要根据`--list`得到的列表安装最新的包。

~~~bash
./bin/sdkmanager "build-tools;29.0.0"
./bin/sdkmanager "platforms;android-29"
./bin/sdkmanager "tools"
~~~

第一次安装时可能会是这样的提示，看起来是某个用户协议
~~~
License android-sdk-license:            ] 10% Computing updates...              
---------------------------------------
Terms and Conditions

This is the Android Software Development Kit License Agreement

1. Introduction

1.1 The Android Software Development Kit (referred to in the License Agreement as the "SDK" and specifically including the Android system files, packaged APIs, and Google APIs add-ons) is licensed to you subject to the terms of the License Agreement. The License Agreement forms a legally binding contract between you and Google in relation to your use of the SDK.
~~~

之后安装就会像这样清晰明了
~~~
[=======================================] 100% Unzipping... android-10/framework
~~~

安装完之后再次使用上面的方法启动`Andriod Studio`，来到我们熟悉的操蛋的`SDK Manager`界面，修改目录为解压的`tools`目录，如果你比较细心，你可能会发现你安装的包正是在这个目录下。

安装前`IDE`会提示一些内容，这里我没法儿复原提示信息，但他大致上说的是`在当前目录检测到SDK，我们将只是安装缺少的SDK`，到这里几乎就代表着安装成功了

## 4. 一些我安装后遇到的问题

### 4.1 快捷方式
在创建项目的界面右下角有一个`configure -> Create desktop Entry`即可= =！根本不要那些文章里的写文件。。。

### 4.2 其它
这是`Unable to resolve dependency for ':app@debug/compileClasspath'`错误的解决方案，但需要注意的是，在如下帖子修改之后，再次启动IDE时也许会被询问`proxy`相关的内容，请在修改后检查你修改的文件是否发生变化，因为你的操作很有可能会覆盖调文章给出的解决方案。

[解决Unable to resolve dependency for ':app@debug/compileClasspath'](https://www.jianshu.com/p/0d0ebb86dd17?utm_campaign=haruki&utm_content=note&utm_medium=reader_share&utm_source=qq)
