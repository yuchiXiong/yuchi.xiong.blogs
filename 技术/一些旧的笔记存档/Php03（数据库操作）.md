#2018年8月10日
##1.PHP连接MySQL的常用函数
> ####tip：找了一上午bug导致效率低下的一天。。
- ####mysqli_fetch_row()
> 使用`mysqli_fetch_row()`函数可以获取到表里的数据，不同于JSP中的rs结果集，在PHP中如果将一个条记录赋值给变量，则指针会下移到下一个对象，因此遍历表记录只需要用while循环即可实现。使用该方法获取到的记录类似于数组，下标与列标一一对应。
~~~
while ($rs=mysqli_fetch_row($result)){
        print_r($rs);
    }
~~~
- ####mysqli_fetch_array()
> 与前者相似，该函数以数组方式获取到表记录，使用3个不同的可选参数可以使函数对应不同的内容。
- ######1.MYSQL_ASSOC - 关联数组
- ######2.MYSQL_NUM - 数字数组
- ######3.MYSQL_BOTH - 默认。同时产生关联和数字数组

- ####mysqli_fetch_assoc()
> 与mysqli_fetch_array()-MYSQL_ASSOC相同（连名字都一样。。。）

- ####mysqli_fetch_object()
> 是结果集作为一个对象的形式存在，使用->属性名获取到内容
~~~
while($rs=mysqli_fetch_object($result)){
        print_r($rs->name);
    }
~~~
