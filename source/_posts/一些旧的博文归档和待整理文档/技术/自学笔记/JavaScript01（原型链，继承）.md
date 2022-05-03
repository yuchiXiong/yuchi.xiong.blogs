##今天是2018年11月12日
####1.原型
> ######在业务中一定存在需要重复使用某一个对象方法，代码如下
~~~
function Person(name){
            this.name=name;
            this.eat=function(){
                console.log("i can eat!");
             }
        }
      
        var per=new Person("小明");
        per.eat();
        ......
        var per=new Person("小红");
        per.eat();
~~~
######`Person.eat()`方法不断被调用的同时是要开辟内存空间的，那么业务一旦复杂起来就会有过多的内存被占用。因此就需要使用原型方法了。
~~~
function Person(name){
            this.name=name;
        }
        Person.prototype.eat=function (){
            console.log("i love eat!!");
        }
        var per=new Person("小明");
        per.eat();
        ......
        var per=new Person("小红");
        per.eat();
~~~
######将`eat()`方法添加到`Person`对象的`prototype`中可以使资源共享，每一次调用的`eat()`指向的都是同一个方法，因此会减少内存的占用.
> ######而这个`prototype`指的就是原型对象，我们注意到上例中`per`是没有`prototype`属性的，但我们使用`console.dir`输出`per`后就会看到下面这个东西。
![__proto__](https://upload-images.jianshu.io/upload_images/13085799-90ed9a578700e2c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> ######而当我们展开实例对象`per`的`__proto__`属性和`Person`构造函数的`prototype`属性时，我们可以看到如下
![Pserson-prototype](https://upload-images.jianshu.io/upload_images/13085799-b2bf022644672db3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![per-__proto__](https://upload-images.jianshu.io/upload_images/13085799-1000e9aa57e1330a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> ######可以发现两者的结构几乎相同，于是我们直接使用`console.log(per.__proto__===Person.prototype)`进行对比结果发现两者指向的是同一个东西。

> ######我们可以尝试使用`console.dir(string)`等语句尝试输出基本类型的结构，结果发现他们都无例外的具备如上特性。

> ######于是我们得出了如下结论：任何一个对象都有`__proto__`，任何一个构造函数都有`prototype`,实例对象的`__proto__`与构造函数`prototype`本身指向的都是同一个东西,也就是原型对象.

> ######在有了如上结论后，很容易发现，我们可以为基本类型的原型添加属性与方法，这样的操作相当于直接修改了源码。

######事实上当我们使用一个构造函数来创建实例对象后，实例对象中的`__proto__`指向了构造函数的`prototype`,也就是原型对象，而在原型对象中存在着一个`constructor`,它指向的则是构造函数本身。如下图
![image.png](https://upload-images.jianshu.io/upload_images/13085799-8290652278217750.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

####2.原型链
> ######字面意思上来说，既然叫“链”，那么一定是链式结构了，原型链指的的是实例对象与原型对象之间的联系。
######上面已经说了`prototype`与`__proto__`，但其实`prototype`本身也是一个对象，那么它就应该有`__proto__`属性，事实上也的确如此，我们输出控制台看到如下内容：
![prototype的__proto__属性](https://upload-images.jianshu.io/upload_images/13085799-69255d4656de64ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
######展开
![prototype的__proto__属性](https://upload-images.jianshu.io/upload_images/13085799-2ca4cb1d4551181b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
######很容易发现它其实指向了`Object`对象，而`Object`对象则不再具有`__proto__`属性，我们打印`Object.prototype.__proto__`发现得到的结果是`null`，于是我们得到如下结论：
~~~
per.__proto__.__proto__.__proto__==null;
Person.prototype.__proto__.__proto__==null;
~~~
######测试发现
![测试结果](https://upload-images.jianshu.io/upload_images/13085799-868bce145fe9e988.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
######那么我们很容易得出一个结论：实例对象的`__proto__`和构造函数的`prototype`指向同一个原型对象，该原型对象的`__proto__`指向`Object`对象的`prototype`，而`Object`对象的`prototype`作为对象也具有自己的`__proto__`则指向`null`。（我晕了你呢）
> ######这样的链式结构就形成了原型链，我们可以修改原型链的指向，但在修改指向前添加进原型的方法将无法被调用。

> ######到这里其实关于原型链的基本内容就算理清了，从修改指向的地方我们隐隐约约可以嗅到一种熟悉的味道：我们修改了原型链的指向以调用不同对象的原型方法与属性，似乎就是面向对象中的一个重要特性——多态。而事实上Js中似乎并没有使用多态（我™也嫌麻烦）

####3.继承
> ######`JavaScript`中没有`Class`的概念，因此我们的继承是

##模拟的！！！

> ######对此我很心痛，当然主要原因是，这个模拟看起来好麻烦。。。跟`Java`的`extends`关键字完全没法儿比。。。

> ######先看一下修改原型对象的指向
~~~
function Person(name){
            this.name=name;
            this.hhh=function(){
                console.log("Person:hhh");
            }
        }
        Person.prototype.sayHello=function(){
            console.log("person,hello!");
        };

        function Student(name){
            this.name=name;
            this.hhh=function(){
                console.log("Student:hhh");
            }
        }
        Student.prototype.sayHello=function(){
            console.log("student,hello!");
        };


        Student.prototype=new Person("小明");

        Student.prototype.eat=function(){
            console.log("i love eat!");
        };
        var stu=new Student("小明");
        stu.sayHello();
        stu.eat();
        stu.hhh();
~~~
######运行结果
![image.png](https://upload-images.jianshu.io/upload_images/13085799-fc57ac64fe5be6e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

######需要说明的是，这个例子不仅演示了修改原型对象的指向，同时也表达了修改原型对象指向后再给原型添加方法是可以使用的。反之则会报错。（这一点很容易理解，如果我在房间A中放了一本书，然后让你去B房间，你肯定是拿不到这本书的。）

######另外有意思的是，在两个构造函数中的不同名属性是都可以被访问的，于是乎这就为我们“模拟”继承留下了伏笔。既然属性可共用，那么我们就可书写如下代码来“模拟”继承
~~~
function Person(name,age,sex){
            this.name=name;
            this.age=age;
            this.sex=sex;
        }
        Person.prototype.eat=function(){
            console.log("eat!");
        };

        function Student(score){
            this.score=score;
        }
        Student.prototype=new Person("小明","29","男");
        Student.prototype.study=function(){
            console.log("study!")
        };

        var xiaoming=new Student("100");
        console.log(xiaoming.name+""+xiaoming.age+""+xiaoming.sex+""+xiaoming.score);
        xiaoming.eat();
        xiaoming.study();
        ......
~~~
######很容易发现这种继承是没有办法使用的，在修改原型对象的指向时我们写死了`Person`对象的属性，这样即使能继承“父类”的方法与属性，也是没有办法使用的。于是我们使用如下方法改进
~~~
function Person(name,age,sex){
            this.name=name;
            this.age=age;
            this.sex=sex;
        }
        Person.prototype.eat=function(){
            console.log("eat!");
        };

        function Student(name,age,sex,score){
            Person.call(this,name,age,sex);
            this.score=score;
        }
        Student.prototype=new Person();
        Student.prototype.study=function(){
            console.log("study!")
        };

        var xiaoming=new Student("100");
        console.log(xiaoming.name+""+xiaoming.age+""+xiaoming.sex+""+xiaoming.score);
        xiaoming.eat();
        xiaoming.study();
        var xiaohong=new Student("小红","21","女","90");
        ......
~~~

######使用该方法可以解决属性不能修改的问题，但方法却不能通过这种方式得到“继承”，于是我们采用了结合的方法模拟继承，代码如下
~~~
function Person(name,age,sex){
            this.name=name;
            this.age=age;
            this.sex=sex;
        }
        Person.prototype.eat=function(){
            console.log("eat!");
        };

        function Student(name,age,sex,score){
            Person.call(this,name,age,sex);
            this.score=score;
        }
        Student.prototype=new Person();
        Student.prototype.study=function(){
            console.log("study!")
        };

        var xiaoming=new Student("小明","20","男","100");
        console.log(xiaoming.name+""+xiaoming.age+""+xiaoming.sex+""+xiaoming.score);
        xiaoming.eat();
        xiaoming.study();
        var xiaohong=new Student("小红","21","女","90");
        console.log(xiaohong.name+""+xiaohong.age+""+xiaohong.sex+""+xiaohong.score);
        xiaohong.eat();
        xiaohong.study();
        var xiaogang=new Student("小刚","19","男","89");
        console.log(xiaogang.name+""+xiaogang.age+""+xiaogang.sex+""+xiaogang.score);
        xiaogang.eat();
        xiaogang.study();
~~~
######使用这种模拟方式便可以实现继承，同时还有另外一种方法叫“拷贝继承”，就是把“父类”属性与方法全部拷贝的到“子类”中，俺寻思着这可能是真“继承”了。。。
####4.杂谈
> ######到这里关于原型链和继承的基本内容以及写完了，鼓捣了一天才学这么点东西也是醉了= =！隐约觉得这些东西还有更大的用处的。。。现就这样吧。
