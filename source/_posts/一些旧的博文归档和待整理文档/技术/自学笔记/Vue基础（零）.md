##2018年11月4日
> ######最近面试比较多，也算是丧了有点久了，终于打开了vue的官方文档，看的比较慢做个总结。
###0.Vue对象
#####开始之前自然需要创建一个`Vue`对象
~~~
var app=new Vue({
            el:'#app',
            data:{
                  message:'hello,world'
                }
            }
        })
~~~
#####`el`所指的是需要绑定的元素，data则是申明的变量
###1.v-bind
`v-bind`指令可缩写为“：”，已接触的有
`:title`:显示提示信息
`:style`:样式
###2.v-if
`v-if`指令用于判断，根据判断的结果决定元素是否存在于页面上，可配合`v-else` ,`v-else if`等指令使用。并且这些标签需要以连续的状态存在。
###3.v-on
`v-on`指令的作用是监听事件，可简写为`@`，例如`@click`,`@mouseover`等等
###4.v-for
`v-for`字面意思嘛，循环，可以输出的是数组，对象等。
~~~
<span v-for='item in items'>{{item}}</span>
~~~
###5.v-model
`v-model`用于数据的双向绑定
~~~
<input>{{msg}}</input>
<p v-model='msg'></p>
~~~
###6.v-once
`v-once`指令会使标签中的数据不再程序动态修改
###7.v-html
`v-html`指令对标签内Html做转义
###8.v-show
`v-show`指令会根据指定的条件隐藏或显示页面元素
###9.v-show与v-if
两者都能通过逻辑判断来隐藏/显示元素，但它们存在一些差异
不管判断结果是什么，`v-show`指令都会加载该页面元素，并且将其隐藏是使用的`display:none`
`v-if`隐藏的元素实际上并不是隐藏，打开网页源代码会发现原有的元素被注释掉了，也就是说，`v-if`会让这个页面元素不存在。
###10.组件
使用`component`申明模板化的组件
~~~
<ol>
   <todo-item v-for="list in List" v-bind:todo="list" :key="list.id"></todo-item>
</ol>
//-------------------------script----------------------------------------
Vue.component("todo-item",{
            props:['todo'],
            template:"<h6 class='h6Style'>{{todo.text}}</h6>"
        })
~~~
###11.数据绑定
`Vue`框架的操作都是基于数据的而不再是基于`Dom`，在元素里可以使用变量名来动态修改数据，这种操作就被叫做数据绑定
双向绑定则是指标签与数据绑定，而页面上还存在着其他的数据与该数据`v-model`绑定，这样就形成了双向绑定，任意一个标签导致的变量值的变化都会使所有绑定该变量的标签中的值变化（好绕口。。。）
