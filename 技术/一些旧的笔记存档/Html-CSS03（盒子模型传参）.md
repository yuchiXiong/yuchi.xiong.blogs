>#今天是2018年7月11日

##1.盒子模型的传参
>#####盒子模型中需要给top/bottom/left/right值。
~~~
div{
     margin: 100px ;
     //四个方向都改变
     margin: 100px 200px ;
     //上下100 左右200
     margin: 100px 200px 300px ;
     //上100 左右200 下300
     margin: 100px 200px 300px 400px ;
     //上100右200下300左400 
     // padding同理
        }
~~~

##2.元素的起始位置
>#####元素内容的起始位置是基于其自身width，height的起始位置

##3.标签的分类
####3.1块标签
>#####块标签的特点是：独占一行，可以设置width和height属性，常用的快标签有`h1-h6` `p` `ul-li` `dl-dt-dd` `div`

####3.2内联标签
>#####内联标签的特点是：并排显示，不能设置width和height属性，不能设置margin-top，margin-bottom属性，重用的内联标签有 `a` `span` `i` `em` `strong` `b`

####3.3内联块标签
>#####内联块标签的特点是可以并排显示也可以设置width和height属性，常用的内联块标签有`input` `button` `img`

##4.内联元素的居中
>#####虽然内联标签不能设置width和height属性，不能设置margin-top，margin-bottom属性，但我们可以通过如下修改使之水平居中。
~~~
<style>
    /* 
        使内联元素居中需要设置display属性为block 
        块标签默认 display：block
        内联标签 display：inline
        内联块标签 display：inline-block
    */
    span{
        display:block;
        margin-left: auto;
        margin-right: auto;
        background-color: red;
        width: 50px;
        line-height: 50px;
        text-align: center;
    }
</style>
~~~

##5.不修改display属性的情况下使内联和内联块元素水平居中
>#####当不使用display时我们可以修改父级元素的居中方式来使内联元素水平居中，如下：
~~~
<style>
        /* 
            不改变display属性使内联和内联块水平居中 
            fatherElement{
                text-align:center;
            }
        */
        body{
            text-align: center;
        }
    </style>
~~~

##6.Css选择器
>#####前面已经学习了元素选择器，类名选择器，Id选择器和伪类选择器，今天要补充六种Css选择器
####6.1分组选择器
>######分组选择器是将元素分组选择的Css选择器。
~~~
p,h1,div{
         color: red;
        }
~~~

####6.2后代选择器
>######后代选择器有两种，第一种选择了指定类的指定子类，第二种选择了指定子0类中的所有指定类如下
~~~
//选择了parent类所有“子类”（仅限子类）中的p标签
.parent>p{
         color:red;
        }
//选择了parent标签中的所有p标签
.parent p{
         color:red;
        }
~~~
####6.3兄弟选择器
>######兄弟选择器也有两种使用方法，第一种方式选择了指定类兄弟类的第一个标签，第二种方式选择了指定类兄弟类的所有指定标签，如下
~~~
//选择了div标签兄弟类后的第一个p标签
div+p{
       color: rebeccapurple;
        }
//选择了div标签兄弟类中所有的p标签
div~p{
       color: red;
        }
~~~

####6.4伪类选择器
>######伪类选择器之前已经接触过了，如下
~~~
//当鼠标聚焦在input标签中时，使背景颜色变成紫罗兰色
 input:focus{
             background-color: violet;
         }
~~~

####6.5伪元素选择器
>######伪元素选择器可以在指定标签的指定位置生成一个新的自定义标签（伪标签）
~~~
//在div标签之前插入“我在DIV前面”
 div:before{
            content: "我在DIV前面";
            display: block;
         }
~~~

####6.6属性选择器
>######属性选择器利用标签的属性选择标签，一般少用
~~~
div[class="one"]{
             color: red;
         }
~~~

##7.Css选择器的优先
>####测试如下代码很容易发现，Css选择器的优先级别分别是 
~~~
//！important>#id>.class>class
<style>
        p{
          color: red !important;
        }
        .one{
            color: yellow;
        }
        #two{
            color: green;
        }
    </style>
~~~

##8.Css选择器的权重
>####选择器嵌套的层级越多，选择器的权重就越多
~~~
.parent{
        color: red;
        }
.parent>.child{
            color: green;
        }
~~~
