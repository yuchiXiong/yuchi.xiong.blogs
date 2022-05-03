---
title: JavaScript(1)在HTML中使用JavaScript
date: 2020-05-23 14:13:11
tags:
  - JavaScript
  - 前端
categories:
  - JavaScript高级程序设计
---
# 1. script标签
在 `HTML` 中使用 `JavaScript` 很简单，只需要使用 `<script></script>` 标签即可，就像这样：
~~~ HTML
<html>
    <head></head>
    <body>
        <script>
            console.log('hello,javascript');
        </script>
    </body>
</html>
~~~
另外我们也可以引入外部脚本就像下面这样：
~~~ HTML
<html>
    <head></head>
    <body>
        <script src="demo.js"></script>
    </body>
</html>
~~~
当我们引入外部脚本后，不应再在同一个 `<script></script>` 标签中嵌入内容，嵌入的内容会被忽略。

## 1.1. async属性
`async` 属性定义了脚本是否应该立即下载且异步执行，注意：**该属性仅对外部脚本有效**。
当脚本被标记为 `async` 后，浏览器会立即下载对应脚本，但并不一定会按照其顺序执行，因而**不要使两个异步加载的脚本存在相互依赖的关系**很重要。
另外，将脚本标记为异步的目的是为了让页面不需要等待该脚本的下载和执行，因此不应该在异步脚本中执行 `dom` 操作。
~~~ HTML
<html>
    <head></head>
    <body>
        <script async>
            console.log('hello,javascript');
        </script>
    </body>
</html>
~~~

## 1.2. defer属性
`defer` 属性使脚本在文档被解析完成后执行，同样**该属性仅对外部脚本有效**。
被标记为 `defer` 的脚本会在浏览器遇到 `</html>` 时才执行。
~~~ HTML
<html>
    <head></head>
    <body>
        <script defer="defer">
            console.log('hello,javascript');
        </script>
    </body>
</html>
~~~

## 1.3. script标签的实践
考虑到 `aysnc/defer` 两个属性的兼容问题，我们依然建议将脚本置于 `<body></body>` 的底部。
~~~ HTML
<html>
    <head></head>
    <body>
        <script defer="defer">
            console.log('hello,javascript');
        </script>
    </body>
</html>
~~~

## 1.3. 其它属性
`<script></script>` 元素除了上述几个较为常用的属性外，还包含如下属性：
- charset: 用于指定脚本的字符集，由于大部分浏览器会忽略该值，因此使用的很少。
- type: 因兼容问题，目前最常用的是 `text/javascript` ，如果没有指定该值，其默认值也会设置为 `text/javascript` 。
- language: 已废弃。

# 2. noscript标签
`<noscript></noscript>` 元素中的内容只有在下列情况下才会显示出来：
- 浏览器不支持脚本
- 浏览器支持脚本，但脚本被禁用