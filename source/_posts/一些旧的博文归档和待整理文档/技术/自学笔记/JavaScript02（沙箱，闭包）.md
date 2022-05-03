##2018年11月13日
#先记一下三个方法
####1.apply和call方法
> ######这两个方法作用相同，都是修改`this`的指向，差别在于传参的区别，前者需要使用`[]`，后者则是参数形式，如下：
~~~
fun.apply(obj,[1,2,3,4]);
fun.call(obj,1,2,3,4);
~~~

####2.bind方法
> ######该方法用于复制函数，返回值是被复制的函数。

#闭包和沙箱
####3.闭包
> ######为了解决缓存问题，使用闭包，闭包存在函数闭包和对象闭包。
~~~
        function f1() {
          var value = 1;
          return function() {
            this.innerText = "赞（" + value++ + "）";
          };
        }
~~~
######如上代码中，函数`f1()`中包裹了一个匿名函数，该匿名函数扩展了`value`的作用域，使得`value`可以继续使用，同时我们在外部调用的时候使用的是`f1()`的返回值，也就是该匿名函数，这样做的好处是`value`不会被初始化，而是得以继续使用，实现了缓存数据的目的。事实上缓存数据即是闭包的优点，也是闭包的缺点。
####4.沙箱
> ######我认为沙箱不是一种技术，而是一种思想，在一个函数的作用域范围内，使用局部变量完成所需求的功能，这样外部的变量不会干涉到功能内的数据，这就是沙箱。
~~~
(function() {
        function f1() {
          var value = 1;
          return function() {
            this.innerText = "赞（" + value++ + "）";
          };
        }

        function My$(TagName) {
          return document.getElementsByTagName(TagName);
        }

        var btnObj = My$("button");

        for (var i = 0; i < btnObj.length; i++) {
          btnObj[i].onclick = f1();
        }
      }());
~~~
