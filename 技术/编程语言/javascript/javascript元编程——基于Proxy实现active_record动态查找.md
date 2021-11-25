# JavaScript元编程——基于Proxy实现active_record动态查找

## 1. 元编程

在网络上无意间看到《JavaScript权威指南》第七版的目录，除了`NodeJS`外，很意外的看到有一个章节叫元编程。

第一次听说元编程这一概念还是来自于`Ruby`，《Ruby元编程》这本书，很遗憾的是这本书我只看了一点点……对于元编程，我所掌握的也就只有`Open Class`和`method_missing`而已了，不过本文也就只是使用了这么点简单的内容。

### 1.1 Open Class
在很多面向对象的语言里是无法修改一个类的，但在`Ruby`中如下代码是合法的：

~~~ruby
class Book
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def to_s
    "书名：#{@name}"
  end

end

book = Book.new("《Ruby 元编程》")

puts book.to_s

# Open Class
class Book

  def pure_name
    @name[0] == "《" && @name[-1] == "》" ? @name[1..-2] : @name
  end

end

puts book.pure_name
~~~

虽然重复定义了`Book`类，但后定义的`pure_name`方法被“加入”到了原有的类定义中。通过这种方式我们可以在任意位置对我们的代码进行扩展，这一技巧被称为`Monkey Patch`，以下是一个更实用一点的例子，我们打开了`Array`类。

```ruby
# 通过 Open Class 为数组添加一个用于求平均值的方法
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class Array

  def average
    sum / size
  end

end

puts arr.average # 输出 5
```

除了扩展方法外，我们还可以通过这种手段使程序更具有表现力：

```ruby
arr = [...]

arr.first # 等同于 arr[0]
arr.second # 等同于 arr[1]
arr.last # 等同于 arr[-1]
```

不过这种手段也容易带来问题，例如打开类以后覆盖了一个已有的方法，那么极容易导致其它位置的方法调用出现问题。

### 1.2. method_missing

`Ruby`对象在调用方法时，如果不能找到目标方法，则会尝试执行`method_missing`方法，我们可以将`method_missing`方法看作一层代理：

```ruby
class Array

  def method_missing(method)
    case method
    when :average
      sum / size
    when :to_binary
      map{ |num| num.to_s(2) }
    end
  end

end

arr = (1..10).to_a

# 如下两个方法都没有直接在 Array 类中定义，而是在查询方法失败以后通过 method_missing 方法进行了处理
puts arr.average # 返回 5
puts arr.to_binary # 返回数组元素转为二进制之后组成的数组
```

## 2. 基于prototype和proxy尝试JavaScript元编程

我们知道`JavaScript`的类实际上是借由`prototype`实现的语法糖，利用`prototype`一样可以实现类似于上述的`Open Class`。

```javascript
const indexAlias = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    fifth: 4,
    sixth: 5,
    seventh: 6,
    eighth: 7,
    ninth: 8,
    tenth: 9,
    twentieth: 19,
    thirtieth: 29,
    last: -1,
}

Object.keys(indexAlias).map(alias => {
    Array.prototype[alias] = function () {
        const index = indexAlias[alias] === -1 ? this.length - 1 : indexAlias[alias];
        return this[index];
    }
});

const testArr = Object.keys(Array.from(new Array(100)));

console.log(testArr.first()); // 等同于 testArr[0]
console.log(testArr.second()); // 等同于 testArr[1]
console.log(testArr.third()); // 等同于 testArr[2]
console.log(testArr.last()); // 等同于 testArr[3]
```

上述例子动态的为数组类扩展了多个**类似的**方法。

不过这里有一个小细节，其实我并不一定需要所有的方法，有时候可能到头来只调用了`first`和`last`方法，但这些方法却实实在在的都挂到了`prototype`上。

基于代理来实现的方法动态定义其实可以解决这个问题。

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const customArr = new Proxy(arr, {
    get: function (target, prop, receiver) {
        if (Reflect.has(target, prop)) return Reflect.get(...arguments);
        switch (prop) {
            case 'average':
                return function () {
                    return this.reduce((sum, item) => sum + item, 0) / this.length;
                }
        }
    }
});

console.log(customArr.average());
```

需要注意几点细节：

1. 此处通过代理扩展的是**实例方法而非类方法**。
2. 考虑到数组和对象都可以用字面量的方式完成初始化，打开`Array/Object`类的时候，或许`prototype`会更管用一些，因为**prototype修改的是原有的类而代理是创建新的类**。

当然，完全可以将`average`方法直接放到`prototype`上，但如果我们要定义的是多个存在联系的方法，使用这种代理会灵活的多，关于这一点，接下来要尝试实现的`active_record`动态查找可能是一个不错的案例。

## 3. 基于Proxy实现active_record动态查找

`active_record`是`Ruby On Rails`中的`ORM`库，它有一个非常有用的魔法：假设存在一张数据表`users`，它有三个字段：

- `username`
- `nickname`
- `email`

根据以往我们对`ORM`的理解，此时需要创建一个实体类，且这个实体类一眼两个需要声明上述的三个属性。不过，在`ActiveRecord`里，创建实体类你只需要继承`ActiveRecord`即可，它会自动的添加类属性，同时还有包括如下三个方法在内的大量数据读写方法：

- `find_by_username`
- `find_by_nickname`
- `find_by_email`

其原理是根据数据表的字段名列表动态定义了各字段的查询方法。

`JavaScript`基于代理也可以实现类似的效果，下面的示例代码没有真正的链接数据库，而是使用了一个对象结构来进行模拟，同时为了让示例看起来像那么回事儿，还实现了`active_record`持久化数据的两个方法`save/create`。

先来看看最终的效果：

```javascript
const ActiveRecord = require('./ActiveRecord');

// 1. 初始化一个数据源（模拟数据库）
const DB = {};

ActiveRecord.init({
    db: DB,
});

class User extends ActiveRecord { // 2. 定义一个实体类
}

// 3.1 创建一条数据的方式1： 实例化一个对象然后调用 save 方法
const yuchi = new User({
    userName: 'yuchi',
    password: '123456',
    nickName: '鱼翅'
});

yuchi.save();

// 3.2 创建一条数据的方式2： 直接使用 create 类方法
User.create({
    userName: 'xiaoming',
    password: '11111',
    nickName: '小明'
});

// 4. 查看虚拟的数据库数据 
console.log(DB);

// 5. 通过属性生成的动态查询方法进行查询
console.log(User.findByUserName('yuchi'));
console.log(User.findByNickName('小明'));
console.log(User.findByPassword('11111'));

// 再创建一个
class Book extends ActiveRecord { }

Book.create({ name: '《我们的土地》', author: '[墨西哥] 卡洛斯·富恩特斯', pageTotal: '1036', price: '168', ISBN: '9787521211542' });
Book.create({ name: '《戛纳往事》', author: '[法]吉尔·雅各布', pageTotal: '712', price: '148', ISBN: '9787308211208' });


console.log('查询结果：', Book.findByName('《戛纳往事》'));
console.log('查询结果：', Book.findByAuthor('[法]吉尔·雅各布'));
console.log('查询结果：', Book.findByPageTotal('712'));
console.log('查询结果：', Book.findByPrice('168'));
console.log('查询结果：', Book.findByISBN('9787308211208'));
```

以下是`ActiveRecord`类的实现，它有如下细节：

1. `ActiveRecord`是一个经过代理的类。
2. 创建一个`ActiveRecord`类的子类，然后初始化，实际调用的是父类的构造函数，同时也会触发代理（注意`Proxy`里的代码，为了保证返回的对象依然是子类对象，手动修改了构造函数指向）。
3. `ActiveRecord`类经过代理后，增加了动态查询类方法。
4. `ActiveRecord`类的子类实例化后得到的也是一个经过代理的对象，代理中实现了一些实例方法。

```javascript
// 定义基础的 ActiveRecord 抽象类，并支持动态的初始化实例属性
class BaseActiveRecord {
    constructor(record) {
        Object.keys(record).map(item => this[item] = record[item])
    }

    // 一个用于验证代理后的类依然可以被继承的基础方法，也顺便用于数据序列化以便于存到 DB 中
    toJSON() {
        const res = {};
        Object.keys(this).map(item => res[item] = this[item]);
        return res;
    }
}

// 代理基础 ActiveRecord 类
const ActiveRecord = new Proxy(BaseActiveRecord, {
    // 代理构造方法，主要意图在希望实例化以后返回的 AR 对象一样是被代理过的
    construct: function (target, args, newTarget) {
        const nativeObj = new target(args[0]);
        nativeObj.__proto__ = newTarget.prototype;

        return new Proxy(nativeObj, {
            get: function (obj, prop) {
                if (Reflect.has(obj, prop)) return Reflect.get(...arguments);
                if (prop !== 'save') throw new Error(`${prop} is not a function!`)
                
                // 定义了一个 save 方法，自动根据实体类的名字将数据存到对应的表里
                return function () {
                    const tableName = obj.__proto__.constructor.name.toLowerCase() + 's';
                    ActiveRecord.db[tableName] = (ActiveRecord.db[tableName] || []);
                    ActiveRecord.db[tableName].push(this.toJSON());
                }
            },
        });
    },
    // 代理类属性和方法
    get: function (obj, prop, receiver) {
        if (Reflect.has(obj, prop)) return Reflect.get(...arguments);

        const tableName = receiver.prototype.constructor.name.toLowerCase() + 's';
        switch (prop) {
            // 定义一个 create 方法，基本与 save 方法相同
            case 'create':
                return function () {
                    ActiveRecord.db[tableName] = (ActiveRecord.db[tableName] || []);
                    ActiveRecord.db[tableName].push(arguments[0]);
                }
            default:
                // 根据属性动态定义 findByAttr 方法
                if (prop.startsWith('findBy')) {
                    const attr = prop.slice(prop.indexOf('findBy') + 6, prop.length).toLowerCase();

                    return function () {
                        return ActiveRecord.db[tableName].filter(item => item[Object.keys(item).filter(item => item.toLowerCase() === attr)[0]] === arguments[0]);
                    }
                }
        }
    }
});

// 用来初始化 DB 数据源的配置
ActiveRecord.init = function (option) {
    ActiveRecord.db = option.db;
}

module.exports = ActiveRecord;
```

代码：
[yuchiXiong/activeRecordByProxy](https://github.com/yuchiXiong/activeRecordByProxy)