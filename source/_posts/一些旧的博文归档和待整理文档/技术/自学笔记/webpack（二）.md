##2019年1月8日19:21:47
今天主要写一下关于`loader`的东西，虽然各种`npm i -s xxx-loader`装个不停，但是总体上的思路却没什么特别大的变化。
另外关于`webpack4.x`与`webpack3.x`的区别似乎又成为了一个让人头疼的问题。
###1.将`es6`转化为`es5`
使用`babel-loader`与`babel-core`可以使在打包时将`es6`语法转化为`es5`语法。安装后需要在`webpack.config.js`里添加对应的配置信息。
~~~
npm i -s babel-loader babel-core
~~~
其中，正则表达式的部分不能使用`i`来进行大小写的设置，设置`exclude`可以忽略指定目录，设置`include`可以仅打包指定目录，节省打包所需的时间。
~~~
module:{
        rules:[
            {
                test:/\.js$/,
                use:{loader:"babel-loader"},
                exclude: /(node_modules|bower_components)/,
                include : path.resolve(__dirname,'src')
            },
          ]
}
~~~
###2.处理`css`文件
~~~
npm i -s css-loader style-loader
~~~
使用`css-loader`和`style-loader`可以处理`css`文件，但需要注意的是，在`use`数组中添加对应的`loader`时引用顺序是从下往上的
###3.给`css`加上浏览器前缀
考虑兼容问题`css`需要加上前缀才可以使用，需要安装`postcss-loader`和`autoperfixer`
~~~
npm i -s postcss-loader autoprefixer
~~~
为了正确的使用`postcss-loader`我们需要配置一个`postcss.config.js`文件
~~~
postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 5 versions']
        })
    ]
}
~~~
###4.处理`@import`引入的`css`文件
在`loader`里给`css-loader`设置参数`autoperfixer:1`即可使`@import`引入的文件添加浏览器前缀
~~~
{
                    loader:"css-loader",
                    options:{
                        importLoaders:1
                    }
                }
~~~
###5.处理`less`文件
使用`less-loader`可以处理`less`文件，但同时在处理`less`文件时，项目里也需要安装`less`依赖
###6.处理`html`模板与`ejs`模板
对于`html`模板的处理，其实安装`html-loader`就可以了，`ejs`的话对应的是`ejs-loader`，两者没有特别大的区别，只是前者在`app.js`中以文本的形式插入进`innerHTML`中，后者则是一个带参函数直接渲染页面里的数据。
###6.处理图片及其他资源
使用`file-loader`可以打包图片资源，但如果引用在模板里，会出现资源的路径问题。解决方法是在模板里使用如下语法
~~~
${ require(...path) }
~~~
打包图片资源时可以使用`url-loader`并设置参数`limit`使文件体积大于该数值的资源压缩。
对于图片资源还可以使用`image-webpack-loader`直接压缩图片资源。
