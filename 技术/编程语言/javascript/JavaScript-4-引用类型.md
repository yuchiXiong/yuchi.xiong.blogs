# 引用类型

## 1. Object类型
创建一个对象有两种方式：
~~~ JavaScript
// 构造函数
const student1 = new Object();

// 字面量
const student2 = {
    name: 'yuchi',
    age: 18
};
~~~
这两种方式创建对象区别不大，后者更常被使用在参数中，它能够更清晰的表达函数接收了什么，如：
~~~ JavaScript
new Vue({
    el: "#app",
    data: {
        msg: 'hello, world'
    },
    methods: [
        fun1 () {

        },
        fun2 () {

        }
    ]
});
~~~
获取对象的属性有两种方式：
~~~ JavaScript
const obj = {
    'name': 'yuchi',
    'age': 18,
    'test attr': 'hello!'
};

console.log(obj['name']);
console.log(obj.name);
~~~
两种方式都可以获取到`name`属性，但对于`test attr`属性而言，打点的方式将不可用，只能使用`[]`获取。

值得一提的是，`[]`方式可以使用变量来动态获取属性，但**除非必须使用变量来访问属性，否则我们建议使用点表示法**。

## 2. Array类型
`Array`用很多种创建方式：
~~~ JavaScript
const colors = new Array();
const friends = new Array(20);
const riders = new Array('kuuga', 'ruyki', 'agito');
const name = new Array('tokiwa sougo');

const froms = ['muteki gamer', 'oma zio'];
......
~~~
上述写法都是合理的，但需要注意如下写法可能会带来问题，在部分浏览器中，会因为最后一个逗号解析为具有４个元素的数组。
~~~ JavaScript
const colors = [ 'あか', 'あお', 'しろ', ]
~~~
同样的，如下代码也可能带来问题，**强烈建议不要使用这种语法**。
~~~ JavaScript
const colors = [ , , , ,];
~~~
### 2.1 Array的长度
使用`length`可以获取数组的长度：
~~~ JavaScript
const colors = [1, 2, 3, 4];

console.log(colors.length);
~~~
如上代码会输出4。
有一点很有趣，修改一个`Array`的长度是允许的：
~~~ JavaScript
const colors = [ 1, 2, 3, 4];

colors.length = 10;
console.log(colors);

colors.length = 3;
console.log(colors);
~~~
如上代码首先将`colors`数组的长度修改为10，`colors`数组的后面被填充了6个`undefined`，而后我们又修改其长度为3，则`colors`数组从第3位（下标为2）开始都被截掉了。

### 2.2 类型检测
前面我提到过，使用`typeof`关键字测试数组类型会返回`object`。
~~~ JavaScript
console.log(typeof []);
~~~
我们也提到，对于这种情况我们可以使用`instanceof`操作符：
~~~ JavaScript
console.log([] instanceof Array);
~~~
这将返回`true`。但这并不代表着问题解决了，事实上`instanceof`操作符在执行时会假设只有一个全局执行环境，如果页面中有两个以上的执行环境（如使用了`iframe`等场景），则会存在两个不同的`Array`构造函数，因而`instanceof`可能会返回一个错误的结论。为了解决这一问题，ES5新增的`isArray()`方法彻底解决了这个问题。
~~~ JavaScript
console.log(Array.isArray([]));
~~~
### 2.3 类型转换
所有对象都具有`toLocaleString()`，`toString()`，`valueOf()`方法，当数组调用`toString()`方法的时候，会将所有元素组合在一起，并使用逗号分隔行成字符串。
~~~ JavaScript
console.log([ 1, 2, 3].toString());
~~~
上述语句输出`'1,2,3'`。
`toLocaleString()`与`toString()`方法相同，两者在调用时都会使用数组的每个元素来分别调用`toString()`与`toLocaleString()`方法。
另外我们也可以使用`join()`方法使用指定的分隔符将数组转换为字符串，如下代码输出`'1|2|3|4'`。
~~~ JavaScript
[ 1, 2, 3, 4 ].join('|');
~~~
另外，如果某个元素是`null`，`undefined`，那么该值在调用`toLocaleString/toString/join`时都会以空字符串表示。

### 2.4 使数组具备栈的特性
栈是一种先进后出的数据结构，虽然数组并不是栈，但我们依然可以使用指定的方法使数组具备栈的特性。使用`push()`方法可以向数组中添加一个元素，**该方法的返回值是数组的长度**，对应的，我们可以使用`pop()`方法从数组中取出最后一个元素。
~~~ JavaScript
const arr = [ 1, 2, 3 ];

console.log(arr.push(5));
console.log(arr);
arr.pop();
console.log(arr);
~~~
如上代码分别打印`4 [ 1, 2, 3, 5 ] [ 1, 2, 3 ]`。

### 2.5 时数组具备队列的特性
既然提到了栈，难免要提到队列，和栈不同，队列是一种先进先出的数据结构。当我们使用`shift()`方法时，可以去掉数组第一项元素，也就是先进先出的实现了。
~~~ JavaScript
const arr = [ 1, 2, 3 ];

console.log(arr.push(4));
console.log(arr);
arr.shift();
console.log(arr);
~~~
如上代码分别打印`4 [ 1, 2, 3, 4 ] [ 2, 3, 4 ]`。

### 2.6 数组重排
能够实现数组重排的方法有两个：`reverse()`和`sort()`，但需要说明的是，这两个方法在比较元素大小的时候均使用`ASCII`码值，也就是说，元素10会小于元素2。
~~~ JavaScript
const arr = [1, 2, 10, 4, 6]；
arr.sort();
~~~
该代码进行排序后会返回序列`1, 10, 2, 4, 6`，同样的，当使用`reverse()`时，会返回序列`6, 4, 2, 10, 1`。
这样的序列是不符合我们对数字排序的要求的，因此我们可以为`sort()`方法传递一个方法协助它完成排序：
~~~ JavaScript
const arr = [1, 2, 10, 4, 6];
arr.sort((val1, val2) => val1 - val2 );
~~~
使用如上代码将得到序列`1, 2, 4, 6, 10`。

### 2.7 操作方法

#### 2.7.1 concat
当需要将两个数组连接在一起的时候，我们可以使用`concat()`方法，这对增量更新非常有用。
~~~ JavaScript
console.log([1,2,3].concat([5,6,7]));
~~~
上述代码输出`1, 2, 3, 5, 6, 7`。

#### 2.7.2 slice
`slice`方法用于截取数组中的指定片段，它接收两个参数，第一个参数为起始位置，当不传递第二个参数时，返回参数1至结尾的数组片段：
~~~ JavaScript
[1, 2, 3, 4, 5, 6].slice(2);
~~~
上述代码返回下标2开始到结尾的所有元素组成的新数组。

当传递第二个参数时，则返回第一个参数到第二个参数范围内的元素组成的新数组：
~~~ JavaScript
[1, 2, 3, 4, 5, 6].slice(2, 5);
~~~
另外该方法的参数允许为负数，当参数为负数时，实际使用该负数于数组长度相加得到的结果作为下标使用。

#### 2.7.3 splice
`splice()`方法用来向数组插入项目，但根据其参数的传递方式，我们可以使用这个方法实现删除，插入，替换等操作：
~~~ JavaScript
let arr = [1, 2, 3, 4, 5, 6];

// 删除数组前两项
arr.splice(0, 2);
console.log(arr);

// 在第二项后增加一项
arr = [1, 2, 3, 4, 5, 6];
arr.splice(2, 0, 8);

// 替换下标为2的项目
arr = [1, 2, 3, 4, 5, 6];
arr.splice(2, 1, 8);
~~~

#### 2.7.4 位置方法
查找数组中元素的位置可以使用`indexOf()`和`lastIndexOf()`方法，这个两个方法都接收两个参数，参数1是要查找的元素，参数二为开始查找的起始位置，区别在于`indexOf()`从前往后查找，而`lastIndexOf()`从后往前查找。当两个方法找到指定的元素时，它们会返回元素的下标，反之返回-1.
~~~ JavaScript
const arr = [ 1, 2, 3, 4, 5];

// 从前往后查找元素 1 的位置，返回 0
console.log(arr.indexOf(1));

// 从第二项开始查找元素 1 的位置，返回 -1
console.log(arr.indexOf(1, 2));

// 从后往前查找元素 1 的位置，返回0
console.log(arr.lastIndexOf(1));

// 从倒是第一项开始查找元素 1 的位置，返回0
console.log(arr.lastIndexOf(1, 1));
~~~

### 2.8 迭代方法
迭代数组可以使用如下五种方式：
- `every()`：该函数接受回调函数并使用每一个元素执行，当所有元素的执行结果都是`true`时，则该函数返回`true`。
- `fileter()`：该函数接受回调函数并使用每一个元素执行，返回所有能够返回`true`的项目组成的数组。
- `forEach()`：使每一个元素执行回调函数，无返回值。
- `map()`：使每一个元素执行回调函数，返回执行回调函数后的元素组成的数组。
- `some()`：该函数接受回调函数并使用每一个元素执行，其中有一个元素执行结果为`true`时则该函数返回`true`。

### 2.9 归并方法
归并方法主要是将上一次执行的结果做为下一次执行函数的参数，可以使用`reduce()`方法和`reduceRight()`方法。其中`reduce()`方法从项目的第一项开始而`reduceRight()`从项目的最后一项开始。

## 3. Date类型
就像它的名字一样，`Date`类型用于创建日期数据，`Date`类型的`valueOf()`方法会返回该时间对应的毫秒数。

## 4. Function类型
声明一个函数可以使用如下方式：
~~~ JavaScript
function fun1 () {
    return 'hello';
}

const fun2 = function () {
    return 'hello';
}

const fun3 = new Function("return 'hello'");
~~~
三种方式都是合法的，但第三种语法会导致代码别解析两次，第一次解析赋值表达式，第二次解析构造函数，同时这种语法也不便于理解，因此不推荐使用。

### 4.1 无重载
`JavaScript`函数没有重载的特性，当重复定义函数时，函数会被覆盖。

### 4.2 函数申明与函数表达式
上面提到这两种方法都是合法的，但解析器会先读取函数申明，也就是说声明式函数存在变量提升，而函数表达式不会，因而声明式的函数可以先使用后申明，而函数表达式不可以。

### 4.3 函数内部属性
函数内部有两个特殊的对象它们分别是`arguments`和`this`。
`arguments`是一个类数组对象，它有一个`callee`属性保存着拥有这个`arguments`对象的函数指针。
~~~ JavaScript
function fun1 () {
    console.log(fun1 === arguments.callee);
}
fun1();
~~~
上述函数返回`true`。
函数还有另外一个属性`caller`，该属性返回调用当前函数的函数应用，如果在全局环境调用，则返回`null`。

### 4.4 函数属性与方法
函数的`length`属性返回参数的个数：
~~~ JavaScript
function fun1 (num1, num2, num3) {
    console.log(arguments);
}

// 输出结果为3
console.log(fun1.length);
~~~
每个函数都有两个方法`apply`和`call`，它们都可以为函数绑定`this`，不过`call`的参数需要一一列举，而`apply`可以直接传递参数表。
至于`bind`，它会创建一个函数实例，同时将`this`绑定到函数内部。

## 5. 基本包装类型
关于本章节，没有太多可以讲的内容，一些常见的方法此处不再赘述。

### 5.1 Boolean
没卵用系列，看如下代码：
~~~ JavaScript
const booleanObj = new Boolean(false);
console.log(booleanObj && true);
~~~
如上代码返回`true`，因为`new Boolean(false)`实际返回了一个对象而非`Boolean`值，这会给人带来误解。
~~~ JavaScript
console.log(typeof (new Boolean(true)));
~~~
就像上面说的，此处返回`object`。

### 5.2 Number
`Number.toFixed()`方法具有四舍五入的功能。

### 5.3 String
`str.charAt(1)`基本等同于`str[1]`。
除此之外还可以使用`str.charCodeAt()`来获取指定字符的字符编码。

## 6. 单体内置对象

### 6.1 Global
`Global`对象提供了两个`URI`编码方法：`encodeURI()`和`encodeURIComponent()`，前者可以编码整个`URI`中的空格，而后者会编码所有非字母数字字符。因而我们通常用`encodeURIComponent()`来编码`URI`中的参数部分。
对应的，我们也可以使用`decodeURI()`和`decodeURIComponent()`方法进行`URI`解码。

`eval()`运行执行`JavaScript`代码，但该方法也会带来注入风险，在不了解的情况下不应该轻易使用。

最后，`Global`对象是无法直接访问的，但浏览器中的`window`对象包含了`Global`的一部分作为实现，也正因为如此，全局变量和函数最终都成了`window`对象的变量或函数。