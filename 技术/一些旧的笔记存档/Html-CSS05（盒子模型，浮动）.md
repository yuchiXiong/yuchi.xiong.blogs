>#今天是2018年7月13日

##1.盒子模型扩展
>有些时候我们需要padding但不希望齐元素大小发生改变，这个时候需要给元素设置`box-sizing:border-box`属性。
~~~
<style>
        div{
            width: 200px;
            height: 200px;
            background: #ff2d51;
            /* 
                box-sizing:border-box
                给元素padding不会改变它的width和height
             */
            box-sizing: border-box;
            border: 10px solid black;
        }
    </style>
~~~
##2.inline-block布局
>使用nline-block可以使块级元素在同一行显示，起最经典的案例表现便是导航。
~~~
<style>
        *{margin: 0;padding: 0;}
        .nav{
            text-align: center;
            background-color: #ff416d;
            height: 50px;
            font-size: 0;
        }
        .nav a{
            display:inline-block;
            width: 100px;
            line-height: 50px;
            text-align: center;
            color: white;
            font-size: 14px;
            text-decoration: none;
        }
        .nav a:hover{
            background-color: pink;
        }
    </style>
~~~
![利用line-height布局完成导航](https://upload-images.jianshu.io/upload_images/13085799-d3b43aa06a6278d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##3.浮动float
>使用上述的line-height布局虽然能让块级标签在同一行显示，但却存在着一些弊端，因此我们需要学习float。
~~~
<style>
        *{margin: 0;padding: 0}
        .nav{
            width:990px;
            height: 400px;
            background-color: slategray;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10px;
        }
        .nav div{
            margin-top: 10px;
            width: 240px;
            height: 380px;
            box-sizing: border-box;
            border: 1px solid #fff;
            float: left;
            color:aqua;
            font-size: 18px;
        }
        .nav div:not(:last-child){
            margin-right: 10px;
        }
        .nav img{
           margin-top: 10px;
           margin-left: 14px;
        }
        .nav a{
            text-align: left;
            margin-left: 14px;
        }
        
    </style>
<body>
    <div class="nav">
        <div>
            <img src="images/data_image.png" alt="">
            <a href="">haha  haha </a>
            <br>
            <a href="">bbbb bbbb</a>
            <br>
            <a href="">ccc ccc</a>
            <br>
            <a href="#">百度</a>
        </div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    
    <div class="nav">
            <div><img src="images/data_image.png" alt=""></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
</body>
~~~

##4.float和父级元素
>当父元素不设置width时，子元素会继承父元素的width。当资源数float时，父元素的高度会坍塌。改善方法如下：
1.使用overflow：hidden属性重新获取子元素的高度。
2.使用clear：both清除浮动。
Tip：因为设置clear需要单独的使用一个div比较麻烦，所以常用伪元素来实现，如下所示。
~~~
<style>
        *{margin: 0;padding: 0;}
        /* 
            父元素不设置高度，子元素float，父元素的高度会坍塌
            1.使用overflow: hidden;属性可以重新获取子元素的高度。
            2.使用clear：both清除浮动。
            3.使用一个公用的样式row清除浮动。
         */
        .parent{
            width: 200px;
            background-color: red;
            border: 1px solid #000;
        }
        .child{
            height:200px;
            width: 100px;
            float: left;
            background-color: blue;
        }
        .row::after{
            content: "";
            display: table;
            clear: both;
        }
    </style>
~~~

##5.快速实现导航
>之前所实现的导航使用的是div，这里常使用的是`ul-li`
~~~
<style>
       *{margin: 0;padding: 0;}
       li{
           float: left;
           list-style: none;
           text-align: center;
       }
       ul{
           background-color:tomato;
           height: 50px;
       }
       a{
           text-decoration: none;
           display: block;
           width: 100px;
           line-height: 50px;
           color:white;
       }
       a:hover{
           background-color: salmon;
       }
       .row:after{
           content: "";
           display: table;
           clear: both;
       }
    </style>
<body>
    <ul class="row">
        <li><a href="">首页</a></li>
        <li><a href="">首页</a></li>
        <li><a href="">首页</a></li>
    </ul>
</body>
~~~
