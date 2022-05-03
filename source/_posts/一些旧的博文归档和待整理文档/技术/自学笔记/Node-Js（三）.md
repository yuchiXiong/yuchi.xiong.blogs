#2018年11月25日
######写了一个增删改查的小Demo，内容比较多，很多callback，先记录一下。
##1.创建服务
######使用express创建一个服务很简单，不多说。
~~~
var express=require("express");
var app=express();
......
app.listen(3000,function(){
    console.log("Sever running ......")
});
~~~
##2.路由
######对于一个完整的Web项目而言，是需要很多不同的路由的，如果将所有的内容都写在`app.js`中，程序维护性与可读性将变低，因此创建了一个单独的文件实现项目路由
~~~
var express = require("express");
var router = express.Router();

// 学生信息主页
router.get("/students", function(req, res) {});

// 添加学生页
router.get("/students/new", function(req, res) {});

//添加学生页提交按钮
router.post("/students/new", function(req, res) {});

//修改学生信息页
router.get("/students/updata", function(req, res) {});

//修改学生信息按钮路由
router.post("/students/updata", function(req, res) {});

//删除路由
router.get("/students/delete", function(req, res) {});

module.exports = router;

~~~
> ######以上使用单独的一个文件实现了所有的路由并分模块的实现功能。最后以外部模块的方式加载到程序入口`app.js`中

#3.增删改查的实现
######Web项目中会需要使用很多增删改查，因此单独的写了一个文件`student.js`用于实现这些功能，这里使用的数据持久化方式是写入到文件中，使用一个`db.json`文件啦存储信息
##3.1添加学生信息
######思路：读取文件并转化为对象，将新的学生对象插入，将对象转化为字符，写入文件。
~~~
module.exports.push = function(student, callback) {
  fs.readFile("./db.json", "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    student.id = students[students.length - 1].id + 1;
    students.push(student);

    var fileData = JSON.stringify({
      students: students
    });
    fs.writeFile("./db.json", fileData, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
~~~
#3.2查询所有学生信息
######思路：读取文件中的内容，转化为对象后返回
~~~
// 查找
module.exports.find = function(callback) {
  fs.readFile("./db.json", "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  });
};
~~~
#3.3.1根据学号查询学生信息
######思路：遍历已存储的学生信息，找到对应学号的学生并返回。
~~~
//根据ID获取学生信息
module.exports.GetStudentById = function(studentId, callback) {
  fs.readFile("./db.json", "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var stu = students.find(function(item) {
      return item.id === parseInt(studentId);
    });
    callback(null, stu);
  });
};
~~~
#3.3修改学生信息
######思路：根据学号查询获取学生信息，copy新的学生信息后插入原数组对象，转换为字符串后写入文件。
~~~
// 修改
module.exports.update = function(student, callback) {
  fs.readFile("./db.json", "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    student.id = parseInt(student.id);
    var stu = students.find(function(item) {
      return item.id === student.id;
    });
    for (var key in student) {
      stu[key] = student[key];
    }

    var fileData = JSON.stringify({
      students: students
    });
    fs.writeFile("./db.json", fileData, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });

    callback(null, stu);
  });
};
~~~
#3.4删除学生信息
######根据ID查询到学生信息之后，从数组对象里删除（`splice`），然后转化为字符串写入文件。
~~~
//删除
module.exports.delete = function(id, callback) {
    fs.readFile("./db.json","utf8",function (err,data){
        if(err){
            return callback(err);
        }

        var students=JSON.parse(data).students;
        var stu=students.findIndex(function(item){
            return item.id===parseInt(id);
        });
        students.splice(stu,1);
        var fileData=JSON.stringify({
            students:students
        });
        fs.writeFile("./db.json",fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null);
        });
    });
};
~~~
#4.以上方法中写了一万个callback，它们使函数在调用后可以通过参数函数里对返回的数据进行操作。
#写删除的时候，输出数据到文件把路径里的文件名字写成`app.js`了，程序一运行当场去世……
![running](https://upload-images.jianshu.io/upload_images/13085799-2c72912640b10a2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#放一张运行图，页面在`bootstrap`上随便扒来的
