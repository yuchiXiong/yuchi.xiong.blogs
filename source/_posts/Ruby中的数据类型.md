---
title: Ruby 中的数据类型
date: 2019-11-22 21:22:02
tags:
  - Rails
categories:
  - Rails踩坑记录
---

# 数据类型
就和几乎所有语言一样，`Ruby`也定义了几种基础的数据类型，它们分别是
- Numeric
- String
- ...

## 1 Numeric
`Numeric`类用来表示数字，其中又包含了`Integer`，`Float`，`Complex`，`BigDecimal`，`Rational`共5个子类。

在日常开发中，`Integer`与`Float`类使用的较多。

### 1.1 Integer
一个`Integer`类的对象就是一串数字，当该值的范围超过`2^32`时，该值将被透明的转化为`Bignum`类对象，反之则被转化为`Fixnum`类对象。
在开发过程中，我们可以使用 **千分符** 使数值更具有可读性，如：
~~~ruby
100_00
~~~
与其他语言相同，当一个数值以0开头且长度不小于2位时，它将不会被当做十进制处理。同样，我们可以使用0x开头来表示十六进制数，如：
~~~ruby
0xFF
~~~
### 1.2 Float
在`Ruby`中使用浮点数其实与其他动态语言中并没有太大的区别，不过需要注意的是，`Ruby`并不支持缩写，如`.1`，我们必须完整的写作`0.1`。

### 1.3 运算
`Numeric`类的运算规则遵循数学中的规则，但相比其他语言，`Ruby`还提供了一个非常便捷的指数运算：
~~~ruby
2 ** 10    # => 1024
~~~
当然，`Ruby`中也存在着一些意外的规则。
**不同数据类型的溢出规则**
`Interger`在运算后会对大数进行转化（`Bignum`），因此`Integer`不会产生溢出。但这一点在`Float`上却并不适用，当数据超出范围后它会溢出为`Infinity/-Infinity/0`三种情况。
~~~ruby
2.6.5 :006 > (2 ** 1024)
 => 179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624224137216
2.6.5 :007 > (2 ** 1024).to_f
 => Infinity
~~~
**不同数据类型的除法**
在`Integer`的除法运算中，当除数为0时，会抛出`ZeroDivisionError`异常（我通常使用这种方式来刻意触发异常）、而在`Float`的除法运算中，除数为0时会返回`Infintiy/-Infintiy`。当然，这里也有一个例外，当发生`0.0/0.0`的运算时，会返回`NaN`（`not a number`）
~~~ruby
2.6.5 :011 > 1/0
Traceback (most recent call last):
        5: from /usr/local/rvm/rubies/ruby-2.6.5/bin/irb:23:in`<main>'
        4: from /usr/local/rvm/rubies/ruby-2.6.5/bin/irb:23:in`load'
        3: from /usr/local/rvm/rubies/ruby-2.6.5/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in`<top (required)>'
        2: from (irb):11
        1: from (irb):11:in`/'
ZeroDivisionError (divided by 0)
2.6.5 :012 > 1.0/0
 => Infinity
2.6.5 :013 > 0.0/0.0
 => NaN
~~~
**取余操作和除法**
当有以下操作时，我们很容易得出结论为2
~~~ruby
7/3
~~~
当上述除数为负数时，在大部分语言里，我们都会得到-2的结论，然而当我们在`irb`中输入表达式的时候却发现得到的结果是-3。这是因为`Ruby`在对负数做除法时时是向负无穷大取整的。
由此我们很容易推导得到一个结论：
~~~ruby
-(a/b) != a/(-b)
~~~
**指数操作的运算顺序**
指数操作的计算顺序为从右向左，如：
~~~ruby
2 ** 2 ** 3 == 2 ** 8 == 256 != 4 ** 3
~~~

## 2 String
`Ruby`中每次使用字符串字面量时，实则都会创建一个新的对象。
~~~ruby
2.6.5 :004 > 3.times{puts 'hello'.object_id}
12676760
12676700
12676640
 => 3

2.6.5 :006 > str = 'hello'
 => "hello"
2.6.5 :007 > 3.times{puts str.object_id}
12681240
12681240
12681240
=> 3
~~~
需要注意的一点是，字符串的加法运算并不会将右侧操作数转化为字符串，因此在使用过程中需要手动转化，如
~~~ruby
2.6.5 :001 > '111' + 2
Traceback (most recent call last):
        5: from /usr/local/rvm/rubies/ruby-2.6.5/bin/irb:23:in`<main>'
        4: from /usr/local/rvm/rubies/ruby-2.6.5/bin/irb:23:in`load'
        3: from /usr/local/rvm/rubies/ruby-2.6.5/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in`<top (required)>'
        2: from (irb):1
        1: from (irb):1:in`+'
TypeError (no implicit conversion of Integer into String)
2.6.5 :002 > '111' + 2.to_s
 => "1112"
~~~
当然，在使用字符串内插操作时，转化是自动的
~~~ruby
2.6.5 :003 > "1 + 1 = #{2}"
 => "1 + 1 = 2"
~~~
另外一个非常有趣的细节是当使用`<<`操作符对字符串进行追加，且被追加的内容是一个数字时，该数值会被按照`ASCII`码转移为字符，如
~~~ruby
str = "a"
 => "a"
2.6.5 :005 > str << 97
 => "aa"
~~~
