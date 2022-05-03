>#今天是2018年7月12日

##1.背景
####1.1背景的覆盖方式
>######给div标签添加背景时，可以选择不同的覆盖方式，具体如下
~~~
<style>
        *{margin: 0;padding: 0}
        div{
            width: 200px;
            height: 200px;
            background-color: crimson;
            background-image: url("images/icon1.png");
            /* 
                背景重复：background-repeat:repeat; 
                背景不重复：background-repeat:no-repeat;
                背景X轴重复：background-repeat: repeat-x;
                背景y轴重复：background-repeat: repeat-y;
            */
            background-repeat: no-repeat;
            /* 
                背景位置
             background-position-x: center;
             background-position-y: center;
                同时传参 先X后Y
             */
             background-position: center center;
        }
    </style>

~~~
####1.2背景的简写
>######给背景值的时候可以进行简写，顺序如下：
~~~
div{
     width: 200px;
     height: 200px;
     /* 背景简写 1背景色2背景图3重复方式4位置 */
     background: #ff2651 url("images/icon1.png") repeat 10px 20px;
        }
~~~

####1.3背景吸附
>######给DIV设置背景后，可以设置`backgroun-attachment`属性来调节其是否随滚动条一起滚动
~~~
.banner{
        height: 468px;
        background: #ff2d52 url("images/banner.jpg") no-repeat center center;
        background-attachment: fixed;
        }
.content{
         height: 800px;
         background: #44cef6;
        }
~~~

####1.4背景大小
>######当背景大小大于DIV标签大小时，设置`background-size: cover;`以显示背景的完整大小
~~~
<style>
        *{margin: 0;padding: 0}
        div{
            width: 600px;
            height: 200px;
            background: #ff2e51 url("images/banner.jpg") no-repeat center center;
            /* 
                背景大小
                background-size：x y;
                x-->width
                y-->height
                cover -->覆盖整个div
                特点：只能以大覆小
             */
            background-size: cover;
        }
    </style>
~~~

##2.文本
####2.1文本的基本
>######给文本设置CSS样式时经常需要设置到的属性是颜色，给字体设置颜色有三种方式，如下所示。
~~~
<style>
        /* 
            颜色：
            red-->纯色
            #fff-->十六进制
            rgb(255,255,255)-->RGB
         */
        p{
            color: rgb(255, 33, 70);
        }
        div{
            width: 100px;
            height: 100px;
            background-color: rgba(100,69,234,40%);
        }
    </style>
~~~

####2.2文本对齐
>######文本的对齐使用`text-align`属性控制，关于英文的大小写切换一并写入如下代码。
~~~
<style>
        *{margin: 0;padding: 0}
        p{
            text-align: center;
        }
        a{
            text-decoration: none;
        }
        h4{
            text-indent: 20px;
            /* 转换大写 uppercase|lowercase|capitalize*/
            text-transform: capitalize;
        }
    </style>
~~~

####2.3字体
>######在给文本设置字体时，通常使用多个字体备选，防止用户的机器无法显示所选择的字体。
~~~
<style>
        p{
            font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
            font-size: 12px;
            font-style: italic;
            /* 字体权重 */
            font-weight: bold;
        }
    </style>
~~~

##3.链接
>######给链接设置CSS时需要注意书写的属性
~~~
<style>
        /* 
            link未访问的链接状态 
            hover鼠标移入链接状态
            visited被访问过的链接状态
            active访问链接时的状态

            tip：顺序不能打乱link-->visited-->hover-->active
        */    
        a:link{
            color:red;
        }
        a:visited{
            color: yellow;
        }
        a:hover{
            color: green;
        }
        a:active{
            color:blue;
        }
    </style>
~~~

##4.列表
~~~
<style>
        ul{
            /* 列表样式 */
            list-style: none;
            list-style-image: url("images/icon1.png");
            line-height: 90px;
            height: 90;
        }
    </style>
~~~

##5.表格
####5.1表格的基本用法
>######表格的框线需要设置`border-collapse：collapse`
~~~
<style>
        table,th,td{
            width: 500px;
            border: 1px solid;
        }
        table{
            border-collapse: collapse;
            line-height: 50px;
        }
    </style>
~~~

####5.2.表格跨行，列
>######跨行使用`rowspan`和`colspan`
~~~
<td rowspan="3">商城</td>
<td colspan="2">商城</td>
~~~

##6.轮廓
>######使`input`标签被单击时不再显示样式
~~~
input{
        margin-top: 50px;
        outline: none;
        }
~~~

##7.opacity
>######透明度是JS中常用的动画属性
~~~
div.child{
            width: 100px;
            height: 100px;
            background: red;
            opacity: 0.5;
        }
~~~

##8.css样式的继承
>######除了height属性以外，CSS样式中，子类会继承父类的width属性，且这种继承仅仅发生在块级元素中
~~~
<style>
        /* 
            子元素不设置宽度，它会继承父元素的宽度，但仅发生在块级元素中。 
            父元素不设置高度，它会继承父元素的高度。
        */
        .parent{
            width:200px;
            background: red;
        }
        .child{
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
~~~
