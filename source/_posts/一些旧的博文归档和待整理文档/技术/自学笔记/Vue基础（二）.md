##2018年12月16日21:24:39

###10.Mixins
别问我为啥没中文有道没翻译出来
组件中很容易遇到需要使用相同的函数与属性，为了重用使用Mixins将重复的内容封装
~~~
var base = {
  data: function () {
    return {
      visible: false,
    }
  },
  methods: {
    show: function () {
      this.visible = true;
    },
    hide: function () {
      this.visible = false;
    }
  }
}
Vue.component("name", {
  mixins:[base],
......
});
Vue.component("beeeeee", {
......
  mixins:[base],
});
~~~
###11.插槽slot
slot插槽可以在组件中自定义的添加数据和默认数据
~~~
<div id="app">
    <panel>
      <div slot="header">震惊！王小明居然……</div>
      <div slot="content">居然是dcd</div>
      <div slot="footer">更多傻逼新闻</div>
    </panel>
    <panel></panel>
   <panel></panel>
</div>
<template id="panel_tpl">
  <div class="panel">
    <div class="header">
      <slot name="header">title</slot>
    </div>
    <hr>
    <div class="content">
      <slot name="content">content</slot>
    </div>
    <hr>
    <div class="footer">
      <slot name="footer">footer</slot>
    </div>
  </div>
</template>
~~~
