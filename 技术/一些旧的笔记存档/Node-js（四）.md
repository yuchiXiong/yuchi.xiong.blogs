#2018年11月26日
##1.MongoDB与基本操作
######简单的写一下。`MongoDB`是一种非关系性数据库，操作起来比较容易。
###1.1常用操作
> ######1.show dbs：查看所有数据库信息
> ######2.show collections：显示当前数据库中的表
> ######3.use <db name>：创建/使用数据库
> ######4.db.foo.find()：查看数据表信息
######基本的东西就这么几个。
###1.2使用JS操作`MongoDB`
~~~
//导入对应模块
var mongoose=require("mongoose");
var Schema=mongoose.Schema;

//连接数据库
mongoose.connect("mongoDB://localhost/test");
//规范数据库的结构
var userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    }
});

//创建数据库模型
var user=mongoose.model('user',userSchema);
//-----------------------------------------------------------------------------------------------
//往数据库中增加记录
var admin=user({
    username:"小米",
    password:"admin",
    email:"admin@admin.com"
});

admin.save(function(err){
     if(err){
         console.log(err);
    }else
         console.log("save success!");
 });

//-----------------------------------------------------------------------------------------------
//删除数据库中的指定记录
 user.remove({
    username:"小米"
 },function(err,rs){
     if(err)
         console.log("查询失败");
     else{
         console.log(rs);
     }
 });

//-----------------------------------------------------------------------------------------------
//修改（我觉得这个修改挺鸡肋的。。。）
user.findByIdAndUpdate("5bfb4914c1a02412a00a8391",{
    password:"123456"
},function(err){
    if(err){
        console.log("更新失败");
    }else{
        console.log("更新成功");
    }
});

//-----------------------------------------------------------------------------------------------
//查找数据库中的记录find()/findOne()
 user.findOne({
     username:"小红"
 },function(err,rs){
     if(err)
         console.log(err);
    else
         console.log(rs)
 });
~~~


##2.MySQL
######这边JS操作`MySQL`更简单。。。就一个方法
~~~
//载入mysql对应的模块
var mysql      = require('mysql');
//根据详细信息获取连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'email'
});
connection.connect();
 
//对MySQL的操作只有这一个函数，任何对于数据库的Sql语句都写在这个函数的第一个参数。
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();
~~~
