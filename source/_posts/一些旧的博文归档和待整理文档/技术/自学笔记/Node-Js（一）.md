##2018年11月20日
> ####学习还得循序渐进，不可以一口气吃成个胖子的。
####1.模块
######`Node.Js`中使用`require("")`的方式获取核心模块，它就相当于`Java`中的`packge`，如：
~~~
var fs=require("fs");//fs:fileSystem
var http=require("http");
~~~
#####1.1`fs`模块的常用方法
> ######读取文件
~~~
fs.readFile("path",function(error,data){
            success--->error=null,data=data;
            failure--->error=exception,data=null;
        });
~~~
> ######写入文件
~~~
fs.writeFile("path","content",function(error){
            success--->error=null
            failure--->error=exception
~~~
#####1.2`http`模块的常用方法
> #####启动服务
~~~
var server=http.createServer();
        server.on('request',function(req,res){
            res.setHeader("Content-Type","text/plain;charset=utf-8");
            //req.url获取url
            //res.end()返回响应
        });
        server.listen("port",function(){
            //服务启动后的行为
        });
~~~
####2.`art-template`模块
> #####`art-template`是一款模板引擎，使用之前需要安装在项目目录下
~~~
npm install art-template
~~~
> #####安装完成后，引入并使用（其实我觉得和Vue一开始那个数据绑定一样的，如果一卡就了解了模板引擎可能学Vue会更容易的）
~~~
//加载模块
var template=require("art-template");
//解析
var ret=template.render(data.toString(),{
        title:'在node.Js使用模板',
        h1:'在node.Js使用模板',
        body:'在node.Js使用模板引擎',
        herf:'http://127.0.0.1:3000',
        //数组使用{{each}}   {{$value}}   {{/each}}循环遍历
        list:[
            'Node.js','React','angularJS','Vue.Js'
        ]
    })
~~~
