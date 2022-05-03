---
title: 别踩白块儿 HTML 版的第一天
date: 2018.09.02 22:54
tags:
  - 前端
categories:
  - 程序员的幸福：让代码变成强有力的工具
---
开始了一个非常有意思的小作业：别踩白块儿。

一开始学前端的时候就已经想到了可以尝试一下，今天是终于开始了。
首先确定的是思路，页面只有 3 个按钮：
- 开始游戏
- 游戏排名
- 作者信息

其中游戏排名思路比较明确，使用 JSP+mysql 来完成即可。

其次是开始游戏，游戏开始，黑白快开始往下落，黑白块用 div 制作。

关于黑块，需要说明的是，黑块是随机生成的，因此我用了`Math.random（）`方法生成了 0-3 共 4 个数，并利用父子节点的关系随机给一个白块替换样式。这样就完成了黑块的随机生成。
~~~js
var FirstContainer = $(".block_container")[0];
var index_block = $(FirstContainer).children()[black_index];
$(index_block).addClass("black_block");
$(index_block).removeClass("white_block");
// 自动添加 div
$("<div class='block_container'><div class='white_block'></div><div class='white_block'></div><div class='white_block'></div><div class='white_block'></div></div>").prependTo(".GameFream");  
~~~

接下来要实现的是往下滚动，我使用了`prependTo（）`方法往容器里插入 div，并且设置了定时器，这样游戏启动之后便可以一直生成新的 div 块，整个游戏的动态效果差不多有了。

~~~js
// 自动添加 div
$("<div class='block_container'><div class='white_block'></div><div class='white_block'></div><div class='white_block'></div><div class='white_block'></div></div>").prependTo(".GameFream");  
~~~

接下来要写的是规则，别踩白块儿的游戏机制是用户单击白块或黑块超过屏幕界限时游戏结束，点击黑块则计分。

单击白块很容易写，而屏幕界限则要使用到一个获取屏幕高度的方法了。

~~~js
// 单击黑块
$(".black_block").click(function() {
    $(".black_block").off('click').click(function() {
        $(this).addClass("finish_block");
        $(this).removeClass("black_block");
        score += 100;
    })
})

// 单击白块
$(".white_block").click(function(){
    if($(this).hasClass("white_block")){
        clearTimeout(GameTimer);
        $(".Game_Over").show(300);
        $(".score").text("您的分数是"+score);
    }
})

 // 黑块超过屏幕
var PrintHeight = $(window).height();
var black_length = $(".black_block").length;
var black_top = $($(".black_block")[black_length - 1]).offset().top;

if(black_top > PrintHeight){
    clearTimeout(GameTimer);
    $(".Game_Over").show(300);
    $(".score").text("您的分数是" + score);
}
~~~

完成了这些，一个简单的游戏模型就有了。

![别踩白块儿](./images/bie-cai-bai-kuai-er-html-ban-de-di-yi-tian/1.webp)

在这个地方遇到了一个问题，是关于事件冒泡的。在获取黑块时，获取了整个页面的黑块，之后计分的时候，事件体执行了多次，导致积分不能正常计入，目前正在鼓捣。
