# 面向对象的程序设计

## 1. 对象
创建一个对象很简单，我们可以很轻松的为其添加属性和方法。属性在创建时都会有一些特性值，它们定义了属性的行为。

### 1.1 属性类型
在`JavaScript`中属性被分为两种：数据属性和访问器属性。

#### 1.1.1 数据属性
数据属性中包含了数据值的位置，这个位置可以写入和读取值，它有4个特性：
- `[[Configurable]]`：是否可以被`delete`删除属性，是否可以修改属性，是否可以将属性修改为访问器属性等。它的默认值是`true`。
- `[[Enumerable]]`：是否可以被`for-in`循环返回属性，它的默认值是`true`。
- `[[Writeable]]`：是否可以修改该属性的值，默认值为`true`。
- `[[Value]]`：该属性的数据，默认值是`undefined`。
当需要修改一个数据属性的的特性时，必须使用`Object.defineProperty()`方法：
~~~JavaScript
let obj = {}
Object.defineProperty(obj, 'name', {
    writable: false,
    value: 'yuchi'
});

obj.name = 'bubu';

console.log(obj.name);
~~~
上述代码打印`yuchi`，且由于该属性的`writable`被这设定为`false`，因而该值无法被修改，在非严格模式下，上述代码中的修改没有效果；在严格模式下，上述代码会抛出错误。

上述规则同样适用于 'configurable`特性，但需要注意一点，一旦将一个属性设置为`configurable: false`， 就不可以再将其设置为`configurable: true`了，此时再使用`Object.defineProperty()`方法仅能修改`writable`属性。

#### 1.1.2 访问器属性
访问器属性与数据属性的区别在于它不包含数据值，但它包含一对`getter/setter`函数。当访问一个属性的时候，会触发该属性的`getter`函数，当修改一个属性的时候，会触发该属性的`setter`函数。与数据属性相似，它也有4个属性：
-`[[Configurable]]`：是否可以被`delete`删除属性，是否可以修改属性，是否可以将属性修改为访问器属性等。它的默认值是`true`。
-`[[Enumerable]]`：是否可以被`for-in`循环返回属性，它的默认值是`true`。
-`[[Get]]`：读取时调用的函数。
-`[[Set]]`：修改时调用的函数。
相同的，我们依然需要使用`Object.defineProperty()`方法来为对象定义访问器属性。
~~~ JavaScript
const data = {
    _name: ''
};

Object.defineProperty(data, 'name', {
    get: function () {
        return this._name
    },
    set: function (val) {
        console.log(`${this._name} -> ${val}`);
        this._name = val;
    }
});

data.name = 'xiaoming';
data.name = 'yuchi';
~~~
如上代码将`data.name`定义为访问器属性，并为其遍写了`getter/setter`函数，当我们修改其值时，就可以自动打印属性值的变化情况，需要注意，此处无论是`getter()`函数返回的`name`，还是`setter()`修改了`name`，都会再度触发`getter/setter`函数，因而我们使用下划线来表示只能通过对象方法访问的属性。

### 1.2 定义多属性
当我们需要定义多个属性，可以使用`Object.defineProperties()`方法，它的用法和上面类似，不过它的第二个参数是一个对象，通过`key-value`的结构描述了属性与特性的关系。
~~~ JavaScript
Object.defineProperties(data, {
    name: {
        get: function () {
            return this._name
        },
        set: function (val) {
            console.log(`${this._name} -> ${val}`);
            this._name = val;
        }
    },
    age: {
        writable: false,
        value: 18
    }
});
~~~


### 1.3 读取属性的特性
当我们需要获取到某属性的特性时，可以使用`Object.getOwnPropertyDescriptor()`方法。直接看代码：
~~~ JavaScript
Object.defineProperties(data, {
    name: {
        get: function () {
            return this._name
        },
        set: function (val) {
            console.log(`${this._name} -> ${val}`);
            this._name = val;
        }
    },
    age: {
        writable: false,
        value: 18
    }
});

var descriptor = Object.getOwnPropertyDescriptor(data, 'age');
console.log(descriptor.value);
console.log(descriptor.writable);
~~~

## 2. 创建对象
创建对象可以使用构造函数或者对象字面量两种方式。但这样的创建方式略微有些不优雅，因此就有了如下几种衍生的创建方式。

### 2.1 工厂模式
工厂模式是指使用一个特定的函数来封装对象创建的细节。
~~~JavaScript
function getConn(url, username, password){
    var conn = new Object();
    conn.url = url;
    conn.username = username;
    conn.password = password;
    return conn;
}
~~~
上述代码使用`getConn`方法来创建对象，这样做大大缩减了创建同一对象时的代码。
单它也带来了一个新的问题，就是这样创建的对象是无法识别的，即没有办法知道这个对象的类型。

### 2.2 构造函数模式
构造函数模式有效的解决了工厂模式无法识别对象类型的问题。
~~~ JavaScript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayHello = function () {
        console.log('heelo');
    };
}
var person1 = new Person('yuchi', 18, 'api caller');
~~~
上述代码我们定义了`Person`构造函数，要使用它来创建新实例，我们必须使用`new`操作符。创建一个对象会经历如下4个步骤：
1. 创建一个对象。
2. 将构造函数的作用域赋给新的对象。
3. 执行构造函数里的代码。
4. 返回新的对象。

每一个`Person`构造函数实例化的对象都会保存一个单独的实例，它们都具备一个`constructor`属性，该属性指向了`Person`构造函数。
这样我们就可以使用`instanceof`操作符来确定该实例的类型：
~~~JavaScript
console.log(person1.constructor === Person);
~~~
上面的代码返回`true`。

另外，构造函数实际和其它函数并无区别，换言之你可以使用`new`来调用任何函数。不过需要注意一点，像如下代码一样不使用`new`操作符来实例化对象，最终会将属性绑定到`window`对象上。
~~~JavaScript
var person2 = Person('yuchi', 18, 'coder');
window.sayHello();
~~~
虽然使用构造函数的方式让我们解决了对象类型无法识别的问题，但仔细看我们会发现，不仅是属性，每一次实例化的时候，我们都会重新创建一个`sayHello`方法，即**不同实例上的同名方法是不相等的**。虽然有些场景下我们也许确实需要这样的处理机制，但似乎大多数情况下我们并不希望这样。如何解决这个问题，就要说到原型模式了。

### 2.3 原型模式
`JavaScript`是基于原型编程的语言，因而原型是`JavaScript`中相当重要的概念。
我们创建的每一个函数都有一个`prototype`属性，它是一个指向原型对象的指针。原型对象里包含了该特定类型所有实例可以共享的属性与方法。
~~~JavaScript
function Person() {

}

Person.prototype.sayHello = function () {
    console.log('hello');
};

var person1 = new Person();
var person2 = new Person();

person1.sayHello();
person2.sayHello();
~~~
上述的代码中，我们为`prototype`属性添加了一个`sayHello`方法，而后所有的实例都可以使用该方法。

我们之前提到过，使用构造函数创建的实例有各自不同的属性和方法，哪怕它们的创建机制是一样的，不用实例上的同名方法依然是不相等的。但是用原型来创建的方法很好的解决了这个问题，下面的代码将返回`true`。
~~~JavaScript
person1.sayHello === person2.sayHello;
~~~
在原型模式的一些特性之前，我们首先要理解原型对象。

本小节开始我们就提到了，每个函数都有一个`prototype`属性，它是一个指向原型对象的指针。当我们创建一个自定义的构造函数后，`prototype`原型对象里默认只保存了一个属性——`constructor`属性，它是一个指向`prototype`属性所在的函数的指针。这样说也许非常晦涩难懂，我们简单的理解为我们调用的那个构造函数，即：
~~~JavaScript
Person.prototype.constructor === Person;
~~~
上述语句返回`true`。

当我们使用构造函数来实例化一个对象后，该对象同样保存了一个指向原型对象的指针，我们通常称之为`[[Prototype]]`，在`chrome`等浏览器里，可以使用`__proto__`来访问到它。我们既然提到了`__proto__`与构造函数的`prototype`都是指向原型对象，就很容易得到如下代码会返回`true`：
~~~JavaScript
Person.prototype === person1.__proto__;
~~~
我们必须要提到一点：构造函数与实例间的关联正是通过原型对象来建立**而非直接由构造函数与实例间建立**。实例的`__proto__`是否指向构造函数的原型对象，我们可以使用`isPrototypeOf`方法来进行判断。如下代码返回`true`。
~~~JavaScript
Person.prototype.isPrototypeOf(person1);
~~~

当代码开始读取实例的某个属性或方法时，会进行一次搜索：当实例具备属性或方法时，返回该属性或方法；当实例不具备属性或方法时，查询它的原型对象是否具备该属性或方法。

虽然我们可以获取到原型对象中的属性值，却不能修改它，当试图修改原型对象中的属性或方法时，实际只是为实例定义了一个同名属性或方法。根据刚才我们讲到的搜索方法，实例的属性将会屏蔽掉原型对象里的属性，即使将该值设置为`null`，我们也无法再次使它获取到原型对象里的属性。不过我们可以使用`delete`操作符将实例上的属性或方法完全删除掉，这样再次访问时就会继续访问原型对象上的属性和方法了。
~~~JavaScript
function Person() {
}
Person.prototype.name = 'yuchi';

var person1 = new Person();

// 输出yuchi
console.log(person1.name);

person1.name = 'lala';
// 输出 lala
console.log(person1.name);

person1.name = null
// 输出null
console.log(person1.name);

delete person1.name;
// 输出yuchi
console.log(person1.name);
~~~
我们可以使用`hasOwnProperty`方法来判断一个属性究竟在实例上还是原型对象上。
~~~ JavaScript
// 结果为false
person1.hasOwnProperty('name');
~~~
由于`hasOwnProperty`只能判断属性是否在实例上，当我们需要判断一个属性是否存在与原型上时，可以将它与`in`操作符配合起来使用。`in`操作符仅在属性可以访问时返回`true`而不会关心属性在实例上还是原型上。因此，当使用`in`操作符时返回`true`而`hasOwnProperty`返回`false`时，就可以认为该属性位于原型对象。
~~~JavaScript
!person1.hasOwnProperty('name') && ('name' in person1);
~~~
当我们有大量的属性与方法需要添加到原型对象上时，可以使用字面量的语法来减少`Person.prototype`的键入：
~~~JavaScript
Person.prototype = {
    name: 'yuchi',
    age: 23,
    sayHello: function() {
        console.log('hello');
    }
};
~~~
不过你可能需要注意了，这样的写法本质上覆盖了`Person.prototype`的所有属性和方法，所以此时的`constructor`已经无法确定对象的类型了。
~~~JavaScript
function Person(){}

Person.prototype = {
    name: 'yuchi',
    age: 23,
    sayHello: function() {
        console.log('hello');
    }
};

Person.prototype.constructor === Person;
~~~
上述的代码将会返回`false`。解决这个问题也很简单，我们只需要显式的指定`constructor`即可。
~~~JavaScript
function Person(){}

Person.prototype = {
    constructor: Person,
    name: 'yuchi',
    age: 23,
    sayHello: function() {
        console.log('hello');
    }
};

Person.prototype.constructor === Person;
~~~
这样做之后，代码又可以正常的返回`true`了。不过这样的作法并非没有代价，对原型对象的修改可以立即作用在所有已创建的实例上，让我们看看下面的代码：
~~~JavaScript
function Person(){}

var person1 = new Person();
Person.prototype = {
    constructor: Person,
    name: 'yuchi',
    age: 23,
    sayHello: function() {
        console.log('hello');
    }
};

person1.sayHello();
~~~
该段代码会抛出异常：`Uncaught TypeError: person1.sayHello is not a function`。

这是因为我们在创建了实例后又重写了整个原型对象，事实上，调用构造函数时会为实例添加一个指向最初原型的`[[Prototype]]`指针。修改改对象的内容等同于切断了它与最初的原型之间的联系。

最后，我们虽然使用原型来解决了很多问题，但这并不代表原型对象是完美的。
~~~JavaScript
function Person(){}

Person.prototype.obj = {name: 'yuchi', age: 18};
Person.prototype.friends = ['xiaohong', 'xiaoming', 'xiaogang'];

var person1 = new Person()
var person2 = new Person()

person1.obj.name = 'bubu'
person2.obj.name

person1.friends.push('xiaowang')
person1.friends
~~~
上述代码中对于引用类型的修改最终都直接作用到了原型对象的属性上了，当我们需要使属性共享时，这样是没有问题的。但实例通常要求拥有自己的独立的属性，因而在实际的场景里我们很少单独使用原型模式。


### 2.4 组合使用构造函数模式和原型模式
创建一个自定义的类型最常见的方式就是组合使用构造函数和原型模式。使用构造函数来定义实例属性，使用原型模式来定义共享的属性。
~~~JavaScript
function Person(name, age){
    this.name = name;
    this.age = age;
}

Person.prototype = {
    constructor: Person,
    sayHello: function(){console.log('hello')}
}
~~~

### 2.5 动态原型模式
动态原型模式是使用构造函数的模式来定义示例属性，根据需要动态的添加共享属性的模式。
~~~JavaScript
function Person(name, age){
    this.name = name;
    this.age = age;

    if (type this.sayHello != 'function') {
        Person.prototype.sayHello = function () { console.log('hello'); };
    }
}
~~~
上述代码会在初次调用构造函数时检测是否具有`sayHello`方法，仅在其不存在时动态的对原型添加`sayHello`方法。同样要注意此处不应该使用字面量的方法来修改原型，因为它会切断已有实例与原型方法之间的联系。

### 2.6 寄生构造函数模式
寄生构造函数通常用来对不方便修改的构造函数追加方法（这和`Ruby`使用`Open Class`来遍写`Monkey Patch`有一点相似）。
~~~ JavaScript
function NumberArray() {
    var arr = Array();
    arr.push.apply(arr, arguments);
    arr.numberSort = function () {
        return arr.sort(function(val1, val2){return val1 - val2});
    };
    return arr;
}
~~~
上述代码我们封装了一个`NumberArray`构造函数，并借用 `Array`构造函数扩展了一个用来给数字进行排序的方法。

### 2.7 稳妥构造函数模式
稳妥构造函数要求不使用`new`操作符初始化示例，且在构造函数内部使用局部变量。
~~~JavaScript
function Person(name) {
    var o = new Object();
    var name = name;

    o.sayName = function () {
        console.log(name);
    };

    return o;
}

var person = Person('yuchi');
person.sayName();
~~~
上述代码示例的`person`对象将无法直接访问`name`属性。这样的代码会更安全。

## 3. 继承
继承是面向对象中的一个重要概念。`JavaScript`的继承要从原型链开始说起。

### 3.1 原型链
在上一节中我们说过，每一个函数都有一个`prototype`指针指向了构造函数的原型对象，每个实例同样有个`[[Prototype]]`指针指向了它的构造函数的原型对象。

当我们使一个对象的原型对象等于另一个类型的实例时，就行成了一种原型相互指向的链式结构，这就是原型链。
~~~JavaScript
function SuperType() {
    this.superName = 'super name';
}

function SubType() {
    this.subName = 'sub name';
}

SuperType.prototype.saySuperName = function () {
    console.log(this.superName);
};

SubType.prototype = new SuperType();

SubType.prototype.saySubName = function () {
    console.log(this.subName);
};

var subType = new SubType();
subType.saySuperName();
subType.saySubName();
~~~
如上代码实现了一个简单的继承，`subType`不仅可以调用自己的方法`saySubName`，还可以通过原型链调用`saySuperName`方法。同时要注意，现在`subType`的`constructor`指向了`SuperType`构造函数。

确定原型和实例的关系依然可以使用`instanceof`或者`isPrototypeOf`方法，由于原型链的关系，只要当前实例的原型链上出现了将要判断的原型，就会返回`true`。
~~~JavaScript
console.log(subType instanceof Object);
console.log(subType instanceof SubType);
console.log(subType instanceof SuperType);

console.log(Object.prototype.isPrototypeOf(subType));
console.log(SubType.prototype.isPrototypeOf(subType));
console.log(SuperType.prototype.isPrototypeOf(subType));
~~~
上面的代码都会返回`true`。

另外需要注意，对子类型添加方法的操作需要放在修改子类型原型对象之后，否则子类型的新方法将会被覆盖掉。同样的，对子类型添加方法时也不可以使用对象字面量。

使用原型链虽然可以实现继承，但原型链实际存在如下问题：
- 所有子类型的属性都来源与超类型的实例，引用类型会共享。
- 创建子类型时无法向父类型进行参数扩展。

### 3.2 借用构造函数
所谓借用构造函数，就是在子类型中去调用超类型的构造函数，而非直接使用超类构造函数定义的属性。
~~~ JavaScript
function SuperType(arr) {
    this.arr = arr;
}

function SubType(arr, title) {
    SuperType.call(this, arr);
    this.title = title;
}

var subType = new SubType([1, 2, 3, 4], 'oo');
~~~
上述代码中，我们在子类型的构造函数上执行了父类型的构造函数，同时在子类型构造函数里抽象了对应的参数传递入口，解决了上一小节中提到的问题。

### 3.3 组合继承
我们在使用构造函数定义对象的章节曾经提到，使用构造函数定义对象时，每一个实例上的同名方法都是不同的，此处使用构造函数实现的继承一样存在这个问题。并且如果使用这种方式实现继承，定义在超类型的原型上的方法将无法继承到子类型上，因而我们将使用两者结合的组合继承。

组合继承类似于前面提到的组合使用构造函数模式和原型模式，即借用构造函数方法来继承属性，而后使用原型链来继承方法。
~~~JavaScript
function SuperType(arr) {
    this.arr = arr;
}

SuperType.prototype.sayArr = function () {
    console.log(this.arr);
}

function SubType(arr, title) {
    SuperType.call(this, arr);
    this.title = title;
}

SubType.prototype = new SuperType();

var subType1 = new SubType([1, 2, 3, 4], 'oo1');
var subType2 = new SubType([2, 3, 4, 5], 'oo2');

subType1.arr.push(200);

console.log(subType1.arr);
console.log(subType2.arr);
console.log(subType1.sayArr());
console.log(subType2.sayArr());
~~~
像这样修改了代码之后，我们可以使用父类型的方法了，这也是一种比较常见的实现继承的方式。

### 3.4 原型式继承
原型式继承使用如下格式进行来基于一个已有的对象创建一个类似的，新的对象：
~~~JavaScript
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
~~~
在`ECMA Script5`中定义了`Object.create`方法用来实现同样的操作。

这样的方式实现的继承和原型链继承一样，引用类型的数据会在多个实例间共享。

### 3.5 寄生式继承
寄生式继承是原型式继承的延续，它使用一个函数来对继承的子类型进行扩展。
~~~JavaScript
function createObject(o) {
    var clone = object(o);
    clone.sayHi = function () {
        console.log('hi');
    }
    return clone;
}
~~~

### 3.6 寄生组合式继承
组合继承存在一个问题，即使用组合继承会调用两次超类型的构造函数（第一次在修改子类型的原型对象，第二次在实例化时）。

我们可以使用寄生组合式继承来解决这个问题：
~~~JavaScript
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
    alert(this.name);
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
    alert(this.age);
}

function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
~~~
在上述的代码中，我们使用了寄生组合式来实现继承。

在组合继承中，为了继承父类型的方法，我们第一次调用了父类型的构造函数以获取父类型实例，进而使子类型的原型能够指向父类型。而后继承属性的时候我们实则又调用了一次父类型的构造函数，用于将其绑定到子类型上。

我们不难看出，在组合继承中我们只是希望获得父类型的方法，属性我们另外使用了借用构造函数的技巧来继承。因而在寄生组合式继承里我们直接选择了绕开调用父类型构造函数的过程，直接使用原型式继承的方式获取了一个和父类型原型相似的对象，并将该对象直接赋值给子类型的原型对象实现原型链继承，当然了在这个过程中我们还可以修改原型链继承中导致的子类型`constructor`丢失。