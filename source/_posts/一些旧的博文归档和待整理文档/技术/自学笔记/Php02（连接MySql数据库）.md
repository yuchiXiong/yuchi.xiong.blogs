#2018年8月9日
##1.PHP连接MySQL的常用函数
> ####tip：同样的东西再来一遍。。
- mysqli_connect()
使用`mysqli_connect()`函数可以连接到mysql，它有三个参数分别对应主机名，数据库用户名，数据库密码。当成功连接到数据库时，它会返回true，反之则返回false。使用方法如下
~~~
 if($con = mysqli_connect('localhost','root','666666')){
        echo "database connect success";
    }else{
        echo "database connect faliy";
    }
~~~
- mysqli_select_db();
使用`mysqli_select_db()`函数可以选择数据库，这个函数有两个参数，分别对应mysql连接（可选）和数据库名字。返回值与上面相同。
~~~
if(mysqli_select_db($con,"php_mysql")){
        echo "database select success";
    }else{
        echo mysqli_errno();
        echo "database select faliy";
    }
~~~
- mysqli_error()
使用`mysqli_error()`函数将输出上一次连接中的错误，有一个可选的参数对应mysql连接。
- mysqli_query()
使用`mysqli_query()`函数可以进行表的查询，插入等操作，它有两个参数，对应mysql连接（可选）以及mysql语句。
~~~
$query="insert into test02(age) values('18');";
    mysqli_query($con, $query);
~~~
