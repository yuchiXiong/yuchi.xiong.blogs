#2018年11月25日
######好几天没记了hhhh，这几天学的东西不多，但比较杂，分开梳理并记录一下。

#url
######`url`模块可以获取通过`Get`传参的`url`信息
~~~
var parseObject=url.parse(req.url,true);
//获取访问路径
var pathname=parseObject.pathname;
//获取参数,返回的是对象
var comment=parseObject.query;
~~~

#1.npm
######`npm`全称`node packge manager`，是`node.js`的工具，目前常用到的有如下
##项目初始化
######`-y`可以跳过向导
######执行后会生成一个`Json`文件，描述项目对于工具的依赖信息。
~~~
npm init
npm init -y
~~~
###安装工具包
######`--save`会在`Json`文件中留下工具依赖信息，不写则不添加依赖信息。
~~~
npm install --save ......
npm i -S
~~~
###配置淘宝镜像
######这个主要是因为国外加载部分工具包实在慢，所以用过来的淘宝镜像
~~~
npm config set registry https://registry.npm.taobao.org
~~~

#2.express
######express是一个web框架，它封装了一些http的常用操作
~~~
//引入模块
var express=require("express");
var app=express();

//配置一个简单的服务器
app.get("path",function(req,res){
  res.send();
});
app.listen(3000,function(){
  console.log("Server running ......");
});
~~~
######以上内容封装了下面的原生内容
######公开静态资源
~~~
app.use("/public",express.static("./public"));
~~~
######页面重定向
~~~
//express
res.redirect("/");
//原生
res.statusCode=302;
res.setHeader('Location','/');
res.end();
~~~
#3.express-art-template
######`express`与`template`的结合使用就是`express-art-template`它封装的方法中最常用的就是`render`，我们在原生中渲染模板引擎需要使用到`fs`模块这里只需要使用封装好的方法就可以了。
~~~
//设置模板的文件格式并导入模板
app.engine("html",require("express-art-template"));
//响应请求并渲染模板
app.get("/",function(req,res){
    res.render("index.html",{
        comments:comments
    })
});
~~~
#4.body-parser
######虽然`express`封装了`HTTP`的常用方法，但却缺少了操作post传参的方法，因此需要使用`body-parser`中间件，在加载了该中间件后，就可以直接使用`request.body`获取`post`传递的参数了。
~~~
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post("/post",function(req,res){
    var comment=req.body;
    ......
});
~~~
#5.以上内容均使用npm安装
