>#今天是2018年7月9日
##1. 了解了[Gitee](https://gitee.com/)
使用Gitee管理项目要更加规范，在Gitee中可以添加项目并进行操作，将项目克隆到本地有HTTP和SSH两种方式。

##2. Git的使用

- ###2.1获取SSH公钥
启动Git并输入以下代码
~~~
ssh-keygen -t rsa -C 505831526@qq.com
~~~
之后按enter键完成后，进入如下目录
![公钥目录](https://upload-images.jianshu.io/upload_images/13085799-e42c2748bc224272.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
使用记事本打开如下文件，并复制其全部内容
![获取公钥](https://upload-images.jianshu.io/upload_images/13085799-41f768c643753c25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
登陆Gitee-设置-SSH公钥添加公钥
![添加公钥](https://upload-images.jianshu.io/upload_images/13085799-050c0e6a6b34a2ea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ###2.2利用Http/SSH方式将远程仓库项目克隆到本地
获取连接
![克隆的方式选择](https://upload-images.jianshu.io/upload_images/13085799-640e975a7d10c08a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在目标目录右键启动`Git Bash here`输入
~~~
//xxxxxx为从Gitee中获取的连接
git clone xxxxxx
~~~

- ###2.3由本地向Gitee添加项目文件

>在创建了项目之后，我们需要为项目添加文件.
>- 1.在工作区添加文件
>- 2.将文件添加到暂存器
>- 3.将文件更新到版本库
>- 4.将文件推送到远程
其2,3,4部对应Git命令分别为
~~~
git add . //添加到暂存区
git commit -m"xx" //添加到版本库
git push //推送到远程
~~~

- ###2.4版本回退
>版本回退的步骤如下
>- 1.查看版本日志并记录需要的历史版本编号
>- 2.回退到指定编号的历史版本

~~~
git log//获取版本日志
git reset --hard xxx//xxx为版本编号
~~~
>如需要的回退版本被曾经的回退版本覆盖掉，则可以使用如下命令查找
~~~
git reflog
~~~
- ###2.5拉取更新
>从仓库拉取更新使用如下代码

~~~
git pull
~~~


##3. VSCode的环境配置
>VSCode是一个编译器，而为了能够顺利的编译HTML文件，我们需要安装open in browser插件，按如下图安装插件并将如下代码复制进快捷键设置。
~~~
[  
    { "key": "alt+/",  "command": "editor.action.triggerSuggest","when": "editorTextFocus" },  
    { "key": "ctrl+d", "command": "editor.action.deleteLines","when": "editorTextFocus" },  
    { "key": "ctrl+alt+down","command": "editor.action.copyLinesDownAction", "when": "editorTextFocus" },  
    { "key": "ctrl+alt+up", "command": "editor.action.copyLinesUpAction", "when": "editorTextFocus" },  
    { "key": "shift+enter", "command": "editor.action.insertLineAfter", "when": "editorTextFocus && !editorReadonly" }  ,
    {"key":"ctrl+w","command": "extension.openInBrowser" , "when": "editorTextFocus" }
]
~~~

![安装插件](https://upload-images.jianshu.io/upload_images/13085799-2f78aa422f283cf2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![设置快捷键](https://upload-images.jianshu.io/upload_images/13085799-30dcdc18402bf17b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![修改json文件](https://upload-images.jianshu.io/upload_images/13085799-33d42d8646d2e77f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
