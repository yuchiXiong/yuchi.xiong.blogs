###Vue-Router路由

####1路由基础

创建一个路由对象数组，每个对象分别有，path，component等属性，在component中定义对应的模板。在视图上需要使用如下两组标签来完成渲染

~~~

<router-link to="/">首页</router-link>

<router-link to="/views">视图</router-link>

<router-link to="/about">关于我们</router-link>

<router-view></router-view>

-------------------------------------------------------------------------

var routes=[

    {path:'/',component:{template:`<h1>Hello!Welcome to Home!</h1>`}},

    {path:'/views',component:{template:`<h1>visited this list!</h1>`}},

    {path:'/about',component:{template:`<h1>about this web!</h1>`}},

];

var router=new VueRouter({

  routes:routes,

});

var app=new Vue({

  el:"#app",

  router:router,

});

~~~

####2路由的参数

其实叫动态路由更好吧。。

在path中使用/path/:name的方式接收参数，存储在`$route.params`中，同时可以使用？的方式传递url数据，参数存储在`$route.query`中

~~~

{path:'/user/:name?',component:{template:`

<h1>hello!{{$route.params.name}}{{$route.query.age}}</h1>`}},

~~~

####3子路由

在路由中定义一个children数组存放一个子路由对象，然后在父级路由的模板中需要加入路由渲染的两个标签，如下图

~~~

{path:'/user/:name?',component:{template:`

    <div>

      <h1>hello!{{$route.params.name}}{{$route.query.age}}</h1>

      <router-link :to="'/user/'+$route.params.name+'/more'">显示更多      </router-link>

      <router-link to="more" append>显示更多</router-link>

      <router-view></router-view>

    </div>`},

    children:[

      {

        path:'more',

        component:{

          template:`<div><h6>{{$route.params.name}}的详细信息</h6></div>`

        }

      }

    ]

},

~~~

####4手动给路由传递参数（push）

在函数中使用路由的push函数可以指定跳转到对应的路由路径上

~~~

//参数是路由路径

router.push("/user/张三蛋蛋");

//参数是路由name属性以及要传递的参数对象

router.push({name:'home',params:{param:"world!"}})；

~~~

####5路由视图

可能存在一个`router-view`不便于渲染的情况，因此需要对路由视图命名并重新定义渲染内容

该部分在路由配置的数组对象中完成，对于视图的定义要写在`components`中

~~~

var routes=[

  {

    path:'/',

    component:{

      template:`<h1>首页</h1>`

    },

    components:{

      view1:{

        template:`<h1>首页标题</h1>`

      },

      view2:{

        template:`<h4>首页副标题</h4>`

      }

    }

  },

];

~~~
###6.导航钩子

有时候我们并不希望所有路由都直接被渲染，此时我们调用`beforeEach`函数对路由进行拦截（自个儿起的名字），当不符合条件时我们使用next将路由导向其它的路径。

~~~

router.beforeEach(function(to,from,next){

    var login_in=false;

    if(!login_in && to.path=='/admin'){

      next('/login');

    }

    else{

      next();

    }

});

~~~

###7.路由匹配

在6操作之后我们发现，虽然/admin被拦截了，但/admin/...却依然可以通行，因此我们需要对路由进行更深一步的拦截，在`beforeEach`函数的参数`to`中有一个`matched`属性存储了被访问路由的所有父级路由，因此我们可以便利它，如果找到/admin那么证明当前路由路径是/admin的子路由路径

~~~

router.beforeEach(function (to, from, next) {

    var login_state = false;

    if (!login_state && to.matched.some(function (item) {

      return item.path=='/admin';

    }

  )) {

      next("/login");

    } else

  next();

});

~~~

另外还有一种方法是在需要拦截的根目录上自定义一个参数，然后在遍历时我们直接返回该参数，如果能得到该参数则证明当前访问路径一定是拦截目录的子路径（妈耶说的我都晕了）

![添加的属性](https://upload-images.jianshu.io/upload_images/13085799-7271644e2777dfee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

~~~

router.beforeEach(function (to, from, next) {

  var login_state = false;

  if (!login_state && to.matched.some(function (item) {

    return item.meta.login_require;

  }

  )) {

      next("/login");

    } else

      next();

  });

~~~


> ######笔记先写到这儿吧，可能还得找个例子写了才能完全吸收，目前对于一些东西依然不是很明白到底应该怎么做，比如前后端模块等。如果能找一个vue+node+MongoDB的项目做一下应该就差不多了。困了，洗洗睡了。
