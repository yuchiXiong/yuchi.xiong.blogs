## 2018年12月16日
> 我翻了一下之前那篇Vue已经是一个半月前写的了，也没啥内容，干脆删了重新写好了。从基本的指令开始写吧，没什么准备工作，弄个Vue.js文件就可以开始撸了。

### 0.实例化一个Vue组件
使用`{{}}`完成数据的绑定，在Vue里有el，data，methods，computed等等属性与自定义属性。

~~~html
<div id="app">{{msg}}</div>

<script src="vue.js"></script>
<script>
  var app=new Vue({
    el:"#app",
    data:{
      msg:"hello,world",
    }
  });
</script>
~~~
### 1.属性v-bind
`v-bind`用来绑定属性，缩写为`:`，页面元素的属性都能绑，比如`class`，`href`等等，可以传递一个值也可以是一个对象
~~~html
<div v-bind:class="{logo1:isLogo1,logo2:isLogo2}"></div>
~~~
### 2.数据绑定v-model
`v-model`用来绑定数据，不仅包括text，还有CheckBox和radio这类选择标签，前者在选择时会自动的对绑定的数组进行增与删，后者也能动态的修改。
可以使用`.number`,`.lazy`等词缀修饰，使绑定的数据更符合需求。
~~~html
<label>
  <input type="checkbox" v-model="sex" name="sex" value="nan" checked="checked"/>
  男
 </label>
<label>
  <input type="checkbox" v-model="sex" name="sex" value="nv" checked="checked"/>
  女
</label>
<p>{{sex}}</p>
~~~
### 3.事件监听v-on
`v-on`可以对事件进行监听，简写为`@`，传递的参数可以是一个函数名也可以是一个对象，对象可以对应申明多个函数。函数则在Vue的构造函数中的methods对象里申明。
~~~html
<button v-on="{mouseenter:onEnter,mouseleave:onLeave}" 
v-on:click="onClick()">button</button>
~~~
### 4.计算computed
`computed`申明在Vue构造函数的`computed`对象中，以函数形式存在，计算属性会在被侦听的元素发生变化后重新计算。而当元素没有发生变化时，会有缓存存在，减少执行的次数。
### 5.组件component
#### 5.1全局组件定义
使用Vue.component自定义组件，注意data以函数形式存在。
~~~javascript
Vue.component("mytag", {
  props:["ms"],
  data: function () {
    return {
      islike: false,
      likeCount: 0
    }
  },
template: "<button @click='onClick'>{{ms}}({{likeCount}})</button>",
  methods: {
    onClick: function () {
      this.islike ? this.likeCount-- : this.likeCount++;
      this.islike=!this.islike;
    }
  }
})
~~~
#### 5.2父子组件通信
使用props接收参数数组
#### 5.3子父组件通信
在子组件的方法中使用$emit("eventName")传递数据，在父组件中对子组件绑定对应的事件并传递数据，当然，数据需要在父组件的data中申明。
~~~
Vue.component("parent",{
  template:`<div>
              <son @parent="parent_event=true"></son>
              <p v-if="parent_event">子组件与父组件通信</p>
            </div>`,
  data:function(){
    return{
      parent_event:false,
    }
  }
});
 Vue.component("son",{
  template:`<button @click="onClick">button</button>`,
  methods:{
    onClick(){
      this.$emit("parent");
    }
   }
});
~~~
#### 5.4平行组件通信
与上面类似，使用`$emit`对组件1绑定事件并传递数据，注意因为是全局组件所以由Vue调用该函数，在组件2的`mounted`函数中使用`$on`函数监听事件，`mounted`函数在组件被挂载后尚未渲染前执行，然后在`$on`中使用回调函数接收到数据完成数据的传递。
~~~
var event=new Vue();
  Vue.component("p1",{
    template:`<div>我说<input @keyup='onKeyup' type='text' v-model='p1_content'></input><p>{{p1_content}}</p></div>`,
    data:function(){
      return{
        p1_content:'',
      }
    },
    methods:{
      onKeyup:function(){
        event.$emit('p1Change',this.p1_content);
      }
    }
  });
Vue.component("p2",{
  template:`<div>p1:<span>{{p2_content}}</span></div>`,
    data:function(){
      return{
        p2_content:'',
      }
    },
    mounted:function() {
      var that=this;
      event.$on('p1Change',function(data){
        that.p2_content=data;
      });
    },
  });
~~~
### 6.过滤器filter
> 我就一直在想`java`里有个过滤器，和前端的路由概念很像，那前端的过滤器又是干嘛的呢，后来我发现我想多了，就真的只是过滤而已。

在`{{}}`中使用`{{data | filtername}}`这种奇怪的语法来调用过滤器，之后使用`Vue.filter`方法注册过滤器，一般`data`会作为`val`传递进过滤器，其它的参数可以自定定义，在过滤器中完成操作之后返回，返回的结果在调用处渲染，就是这么low。。。
~~~html
<input type="text" v-model.number="price">
<p>{{price | currency("usd")}}</p>
script
  Vue.filter("currency", function (val, unit) {
    val = val || 0;
    unit = unit || "元";
    return val + unit;
  });
~~~
### 7.条件渲染v-if/v-else/v-else-if以及v-show
别问我为什么这个时候才写条件渲染因为我忘了。
字面意思，根据得到的布尔值决定渲染与否，差异在于`v-if`会把页面元素直接删除掉的样子，而`v-show`是隐藏，因此每一次切换状态`v-if`都会消耗大量资源，但是我依然觉得之前那个别踩白块儿还真得用`v-if`才行，不然大量页面元素会很卡。
### 8.列表渲染v-for
同上
在data中申明一个对象或数组然后对其遍历进行自动渲染
### 9.自定义指令Directive
#### 9.1创建自定义指令
使用`Vue.directive`自定义指令，需要说明的是在标签中使用的指令需要以`v-`开头，在申明的时候则不需要写，回调函数中传递是当前页面元素对象以及自定义指令需要传递的参数，当然这些参数也是要在data中申明的，不过有个有意思的地方是如果有很多标签使用了该指令，完全可以在data中为不同的标签申明不同的对象属性。
~~~html
<div v-finish="tag11.state" class="tag">
  <button @click="tag11.state=!tag11.state">finish</button>
  一堆废话
</div>
<script>
  Vue.directive("finish",function(el,state){
    if(state.value){
      ...样式修改
      }else{
      ...样式修改
      }
  });
</script>
~~~
#### 9.2利用指令传递参数
首先对指令传递参数的写法如下有两种
- 第一种使用.传递参数一次可以传递多个参数，读取时使用属性的modifiers,在modifiers中存储了所有通过该方法传递的参数，将其遍历之后就可以取出来了
- 第二种使用:传递参数一次只能传递一个参数，使用arg读取
~~~html
<div v-finish.bottom.right="tag1.state" class="tag">
<div v-finish:bottom.right="tag1.state" class="tag">

<script>
  Vue.directive("finish", function (el, state) {
    if (state.value) {
      ...
      for (var key in state.modifiers) {
        if(state.modifiers[key]){
          el.style[key] = '10px';
        }
      }
    ...
    } else {
      ...
      }
  });
</script>
~~~
