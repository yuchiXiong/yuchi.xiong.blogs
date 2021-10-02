>#今天是2018年7月17日

##1.网页布局的3种方式
- 默认布局
- float布局
- 层级布局

##2.css样式的引入
>#####使用Css样式有三种方式
- 内部样式
- 内联样式
- 外部样式
~~~
<link rel="stylesheet" href="css/style.css">
    <!--  
    <style>
        /* 内部样式 */
        div{
            width: 100px;
            height: 100px;
            background-color: red;
        }
    </style>
    -->
</head>
<body>
    <div></div>
    <!-- 
        内联样式
    <div style="width: 100px;height: 100px;background-color: red;"></div>
     -->
    <div>

    </div>
~~~

##3.相对路径和绝对路径
>#####在页面中插入图片时有两种路径方式：绝对路径和相对路径。

##4.定位下widht和height的继承
~~~
<style>
        /*  */
        *{padding: 0;margin: 0;}
        .parent{
            width:100px;
            background-color: red;
            position: relative;
        }
        .child{
            width: 50px;
            height: 100px;
            position: absolute;
            background-color: blue;
        }
</style>
<div class="parent">
        <div class="child">

        </div>
</div>
~~~

##5.margin的一些小问题
####5.1当给第一个子元素设置margin-top时，margin-top并不会作用于子元素上而是在父元素上
~~~
<style>
        .parent{
            width: 200px;
            height: 200px;
            background-color: red;
        }
        .child{
            width: 100px;
            height: 100px;
            margin-top: 50px;
            background-color: green;
        }
~~~
解决方案：设置伪元素使第一个子元素变成第二个子元素

####5.2当两个两个元素设置对应的margin值时，会重合
~~~
.one{
            margin-top: 10px;
            width: 100px;
            height: 100px;
            background: red;
            margin-bottom: 100px;
        }
        .two{
            margin-top: 100px;
            width: 100px;
            height: 100px;
            background-color: yellow;
        }
~~~

##6.表单
>在使用表单时，可以配合使用label标签
~~~
<form action="">
        <!-- label的for与input标签id相同时，可以实现单击标签即单击input效果 -->
        <div>
            <label for="user">用户名</label><input type="text" id="user">
        </div>
        <div>
            <label for="pwd">密码</label><input type="password">
        </div>
        <div>
            <input type="submit" value="提交">
        </div>
    </form>
~~~

##7.表单中的常用控件
####7.1单选按钮
>设置input标签的type属性为radio即可使用单选按钮
~~~
<input type="radio" name="sex" id="man"><label for="man">男</label>
    <input type="radio" name="sex" id="woman"><label for="woman">女</label>
~~~

####7.2复选框
>设置input标签的type属性为checkbox即可使用单选按钮
~~~
<input type="checkbox" name="hobby">手机
    <input type="checkbox" name="hobby">电脑
    <input type="checkbox" name="hobby">收音机
    <input type="checkbox" name="hobby">耳机
~~~

####7.3下拉列表
>使用select-option标签设置下拉列表
~~~
<select name="" id="">
        <option value="">一年级</option>
        <option selected value="">二年级</option>
        <option value="">三年级</option>
        <option value="">四年级</option>
    </select>
~~~

####7.4文本域
>使用textarea标签设置文本域
~~~
<textarea style="border-radius: 18px;" placeholder="请规范文明发言！" name="" id="" cols="30" rows="10"></textarea>
~~~

##8.input控件和button控件的区别
~~~
<style>
        *{margin: 0;padding: 0}
        input{
            border: 1px solid slategray;
            width: 140px;
            height: 30px;
        }
        .btn{
            width: 142px;
            height: 32px;
            border: 1px solid slategray;
        }
    </style>
~~~
