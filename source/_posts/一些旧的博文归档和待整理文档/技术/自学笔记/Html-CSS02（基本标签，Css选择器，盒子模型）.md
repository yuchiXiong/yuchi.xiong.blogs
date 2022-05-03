>#今天是2018年7月10日

##1.标签

###1.1<h1>-<h6>标签
>#####使用<h1>~<h5>标签设置标题，按升序标题从大到小。

###1.2<p>
>#####<p>是段落标签

###1.3<img>
>#####img标签用于插入图片，它有两个属性作用如下
~~~
//src:将要插入的图片路径
//alt:当图片无法显示时，替代显示的文本内容
<img src="xxx" alt="xxx">
~~~

###1.4<input>
>#####通过设置input标签的type属性可以用input标签生产文本框，按钮，提交/重置等按钮。

![input标签的type属性](https://upload-images.jianshu.io/upload_images/13085799-377d4277a51481dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


###1.5<button>
>#####button标签用于生成按钮，等效于
~~~
<input type="button">
~~~

###1.6<a>
>#####a标签用于生成超链接，如下
~~~
<a href="url....">value</a>
~~~

###1.7<div>
>#####div标签可以把HTML中的元素分成块级别的元素

###1.8<ul>
>#####ul-li用于生成无序列表，修改CSS样式可以生成有序列表。


##2.选择器
###2.1元素选择器
>#####元素选择器以页面元素（标签）为单位进行CSS样式的设置，其弊端在于一旦对某种页面元素进行了设置，所有的相同页面元素样式都会改变，因此要慎用。
~~~
<style>
   div{
          ...
        }
</style>

<body>
     <div>...</div>
</body>
~~~

###2.2类名选择器
>#####类名选择器是依据元素的Class属性来对元素进行Css样式设置的，一个元素可以使用多个Class样式。
~~~
<style>
      .class1{
          ...
}
      .class2{
          ...
}
</style>

<body>
      <div class="class1 class2">//可以使用多个类样式
            ...
      </div>
</body>
~~~

###2.3ID选择器
>#####ID选择器跟类选择器类似，其依据是元素的ID属性，但因为元素的ID属性都是唯一的，因此ID样式也不能重复使用，故慎用
~~~
<style>
   #xxx{
          ...
        }
</style>

<body>
     <div id="xxx">...</div>
</body>
~~~

###2.4伪类选择器
>#####伪类选择器用来对某些元素添加特殊的效果,语法相对灵活。
~~~
<style>
      a:hover{
          ...
      }
</style>

<body>
      <a></a>
</body>
~~~

##3.盒子模型
>#####盒子模型可以明确网页中元素的定并方便开发者进行排版
![盒子模型图示](https://upload-images.jianshu.io/upload_images/13085799-949b71831047e5fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>#####常用的属性如下，通过他们我们可以方便的进行网页的布局。
- ###margin
- ###border
- ###padding
![利用网页F12调试工具调试布局](https://upload-images.jianshu.io/upload_images/13085799-188c25895b17f016.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

