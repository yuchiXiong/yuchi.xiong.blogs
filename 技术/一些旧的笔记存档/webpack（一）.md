##2019年1月4日15:28:21
###1.预备工作
要使用webpack先要安装webpack（废话）
~~~
npm i -g webpack
~~~
以上是基于全局安装的webpack4，根据需要可能会需要直接装在项目里且限定版本。
###2.webpack的基本使用
使用webpack可以完成项目的打包工作，最基本是使用方法是使用`webpack main.js`完成打包，打包后默认生成`/dist/bundle.js`
###3.webpack.config.js
在`webpack.config.js`文件中可以对`webpack进行配置`，以下配置使`webpack`默认对`./js/base.js`文件进行打包，打包后的文件位于`./dist/js/base.bundle.js`,为了使用绝对路径，所以使用了`path`模块以调用`resolve()`函数，该函数生成了一个绝对路径。
同时在以下代码中可以看到，我们可以设置多个`entry`来实现对应的打包工作，但是你需要在`output`的`filename`属性中使用`[name]`以便于获取到源文件的名字，当然你也可以使用`[hash]`使用`hash`值作为文件名。另外请注意`entry`与`output`都并不是只有如下属性，例如`output`中可以设置`publicPath`，该属性对应项目上线后生产的路径，可以根据需要将其设置为`http://cdn.com/`等。
补充一点是现在似乎已经不可以使用`__dirname+'/dist'`的方式来生成绝对路径了，因为斜杠会被转义。
~~~
const path = require("path");
module.exports={
    entry:{
        base:'./js/base.js',
        other:'./js/other.js',
        main:'./js/main.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].bundle.js',
        // publicPath:'http://127.0.0.1:8080/'
    },
~~~
###4.自动打包参数
可以使用`webpack --watch`命令在没一次文件发生变化后自动的完成对应的打包工作。
###5.html-webpack-plugin
我们使用`webpack`也需要对`html`文件进行打包，因此就需要使用到`html-webpack-plugin`模块
~~~
npm i -s html-webpack-plugin
~~~
完成安装后需要在`webpack.config.js`文件中添加对应的参数
~~~
const htmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
    entry:{
        ...
    },
    output:{
        ...
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./views/index.html',
            filename:'index.bundle.html',
            inject:false,
            chunks:['other','base'],
            title:'webpack niu pi!',
            // minify:{
            //     //删除注释
            //     removeComments:true,
            //     collapseInlineTagWhitespace:false,
            //     collapseWhitespace:true
            // }
        }),
        new htmlWebpackPlugin({
            ...
        }),
    ],
}
~~~
`plugins`是一个数组，存储了对`html`打包所需要用到的配置表，每一个`new htmlWebpackPlugin()`都会对应完成一次`html`文件的打包工作。
在`new htmlWebpackPlugin()`里，当我们完全没有设置任何参数时，`webpack` 会完成默认的打包工作，输出到`output`目录下，但打包的`html`文件是不会有结构的。
####5.1打包html文件
因此需要为其配置属性，必要的两个属性分别是`template`和`filename`，前者代表了打包的模板路径，后者代表了打包后的文件名，我们依然可以使用`[name]`直接以原文件名进行命名。另外需要注意，该输出目录是`output`的输出目录，为了区分`js`文件与`html`问价，我们最好将`output`中的`path`设置为`dist`目录，而文件名设置为`js/....`，这样就可以使打包后的`js`文件放进一个`/js`文件夹中。
####5.2自动导入需要的js文件
慕客网上的课程里讲的步骤很细致，但我认为我们需要的是最直接的使用。
`inject`属性设置了打包后自动导入的`js`文件具体在哪一个标签中，可以选择`body`或者`html`标签，以及`false`直接关闭该选项。
`chunks`属性作为一个数组，存储了该条`htmlWebpackPlugin`对象下的文件输出需要引入的`js`文件，反之可以使用`excludeChunks`属性选择不需要的`js`文件，然后将打包的其它`js`文件全部引入。
`minify`对象中可以设置打包后的`html`文件的格式，例如使用`removeComments:true`来删除注释，使用`collapseInlineTagWhitespace:true`来去除换行符，使用`collapseWhitesapce:true`压缩代码等。
另外还可以使用`title`等属性存储一个数据，该数据存储在`htmlWebpackPlugin.options`中，我们可以需要打包的模板文件里拿到这个属性。
####5.3模板的渲染
其实`webpack`似乎并没有所谓渲染模板的说法，此处是我自己随便取的个名字。重点在于，使用`webpack`是可以使用类似于`Vue`框架的操作数据的。
我们可以在模板文件中使用`htmlWebpackPlugin`对象，该对象里存储了`webpack.config.js`中设置的属性。例如我们在模板文件的`<title></title>`中使用`<%=htmlWebpack.options.title%>`即可在打包后的文件里得到相对应的值。需要说明的是，`<%%>`语法是特有的，它类似于`JSP`，对于值的输出可以使用`<%=%>`的方式。
在`htmlWebpackPlugin.files`对象中存储的则是对应的其它属性。
之所以在前面说这么多其实也是为了下面的东西做铺垫。
####5.4使用webpack将公有的js文件注入
在非`SPA`单页应用中，我们往往有很多`js`文件需要使用，有一些常用的我们通常封装为`base.js`，而这些内容如果都以`<script>`标签的形式存在，就很增加很多`http`请求，因此对于公有的`js`文件，我们选择将其注入进`html`中。
在`html-webpack-plugin`的`github`页里，有一个官方提供的方法
~~~
<%=compilation.assets[htmlWebpackPlugin.files.chunks.base.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source()%>
~~~
使用如上方法可以将指定的`js`文件注入进`html`文件中，以减少不必要的`http`请求。
需要说明的是，尽管这个`js`是公有的，我们依然需要保证它存在于这个页面模板配置的`chunks`中，否则我们没有办法获取到它的`entry`值。
到这一步我们会发现虽然这个公有的`js`文件被注入进了页面里，但`webpack`打包时依然把这个`js`文件使用`script`的方式加载进了页面里，所以我们在对页面进行渲染时需要首先进行一次判断，将这个公有的`js`文件筛选出来。
~~~
<%for(var key in htmlWebpackPlugin.files.chunks){%>
        <%if(key!=='base'){%>
            <script type="text/javascript" src="<%=JSON.stringify(htmlWebpackPlugin.files.chunks[key].entry)%>"></script>
        <%}%>
    <%}%>
~~~
##总结：其实这点东西一点也不多，看完了自己写也就这么一点点东西，`loader`等内容都还没有开始，但是理解起来还是需要一定的功夫，今天就写到这儿，明天再对`loader`进行学习。
