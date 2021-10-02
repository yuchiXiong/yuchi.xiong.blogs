# MongoDB配置

## 1. 安装一路向下
## 2. 完了之后先在安装盘根目录创建一个`/data/db`文件夹
## 3. 在安装目录的`bin`目录下执行
~~~
mongod --dbpath D:\software\MongoDB\data\db
~~~
## 4. 去安装目录下启动`mongod.exe`
![启动成功](https://upload-images.jianshu.io/upload_images/13085799-72ea5889003fddb2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 5.配置`MongoDB Service`
先在`/data/db`文件夹下新建一个`log`文件夹

安装根目录下创建`mongo.config`文件

~~~
dbpath=/data/db文件夹目录

logpath=log文件夹目录\mongo.log
~~~

在安装目录的`bin`目录下执行管理员CMD

~~~
mongod --config "mongo.config目录" --install --serviceName "MongoDB"
~~~

![完成](https://upload-images.jianshu.io/upload_images/13085799-5733c1d55a46d741.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
