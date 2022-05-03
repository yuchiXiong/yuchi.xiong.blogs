---
title: 别踩白块儿 HTML 版的第二天
date: 2018.09.03 15:15
tags:
  - 前端
categories:
  - 程序员的幸福：让代码变成强有力的工具
---

大清早开始鼓捣事件冒泡结果手一抖把昨天写的 js 文件删了……于是乎花了一上午重写 js 文件

花了些时间完成了随机生成黑块的功能

~~~JS
// 利用子父关系获取黑块:获取最新生成的 block_container，并获取位于第 block_index 位置的 div 标签
var FirstContainer = $(".block_container")[0];
var index_block = $(FirstContainer).children()[black_index];
$(index_block).addClass("black_block");
$(index_block).removeClass("white_block");
// 自动添加 div
$("<div class='block_container'><div class='white_block'></div><div class='white_block'></div><div class='white_block'></div><div class='white_block'></div></div>").prependTo(".GameFream");  
~~~

需要提的一点是，关于 children() 方法返回的并不是一个 DOM，因此需要用$() 将它转换成一个 jQuery 对象。

因为代码量不大，所以直接用了 switch-case 写了一个对应时间修改速度的功能。另外，因为算法本身的问题，游戏没有办法进行太久，只能设置了一个 1.5W 分的通关分数。

~~~js
if(score > 15000){
    clearTimeout(GameTimer);
    $(".Success").show(300);
    return false;
} else {
    switch (score) {
        case 2000:TimerSecond = 900;break;
        case 4000:TimerSecond = 800;break;
        case 6000:TimerSecond = 700;break;
        case 8000:TimerSecond = 600;break;
        case 10000:TimerSecond = 500;break;
        case 12000:TimerSecond = 400;break;
        case 14000:TimerSecond = 300;break;
    }
    clearTimeout(GameTimer);
    setTimeout(Game,TimerSecond);
}
~~~

在单击白块的模块中出现了一个问题导致，每次单击第二个开始往后的`black_block`都会直接导致游戏结束。参考了百度发现似乎是因为样式改变了之后动态绑定的事件没有更改，于是使用了`hasClass()`方法做了一次判断。

~~~js
// 单击白块
$(".white_block").click(function() {
    if($(this).hasClass("white_block")){
        clearTimeout(GameTimer);
        $(".Game_Over").show(300);
        $(".score").text("您的分数是" + score);
    }
})
~~~

关于昨天留下的事件冒泡的问题

因为所有黑块都是随机生成的，因此使用`$(".black_block")`会获取到不止一个元素，另外又不知道用户单击的是哪一个，所以在样式更改时是使用了`this`关键字的，但分数部分却没有办法避免，一旦页面中出现了多个相同的黑块，分数就会增加 100* 黑块数量。

一开始我以为是事件冒泡，但是查阅了发现，这种现象并不是事件冒泡，使用`return false`或者`event.stoppropagation()`是没有办法阻止的，之后我尝试使用了`one()`方法，然而一样，单击事件被执行了多次，作为事件类部方法，每次都对应不同的元素，`one()`方法一样被执行了多次。其中我发现如果抛出异常，后面的部分就不会执行了，试图抛出一个自定义异常来阻断事件的执行，不过好在后面解决了。

解决方法：使用`off()`方法，在执行前先解绑绑定的所有元素
~~~js
 // 单击黑块
$(".black_block").click(function() {
    $(".black_block").off('click').click(function() {
        $(this).addClass("finish_block");
        $(this).removeClass("black_block");
        score += 100;
    });
})
~~~

该方法可以解除指定元素上的所有指定事件，这样便使分数的累加正常了。

![游戏测试](./images/bie-cai-bai-kuai-er-html-ban-de-di-er-tian/2.webp)

到这里，整个游戏的模型算是勉强写好了= =接下来润色一下界面和完成后端的编写就可以挂到服务器上啦。
