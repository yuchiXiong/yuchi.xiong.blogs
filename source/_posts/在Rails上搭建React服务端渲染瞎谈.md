---
title: 在 Rails 上搭建 React 服务端渲染瞎谈
date: 2020-12-15 14:32:58
tags:
  - Rails
  - MongoDB
categories:
  - Rails 踩坑记录
---

本文主要提供了一种在 `Rails` 里 `React` 搭建服务端渲染 SPA 的思路，主要涉及的技术栈如下：

**ruby**:
- [Rails 5.x ](https://ruby-china.github.io/rails-guides/)
- [webpacker](https://github.com/rails/webpacker)
- [react-rails](https://github.com/reactjs/react-rails)

**JavaScript**
- [React](https://react.docschina.org/docs/getting-started.html)
- [React-Router](https://reactrouter.com/web)
- [React-Redux](https://github.com/reduxjs/react-redux)


## 1. 在 Rails 中搭建基本的 SPA 单页应用

我们将基于 `React` 搭建一个 `DEMO` ，它包含了两个页面 `home` 和 `about`，可以来回切换 。

撇开 `React` 不看，我们首先需要构建一个基础的 `MVC` 标准结构，在 `Rails` 里使用相关脚手架可以很快实现：

```shell
rails _5.2.4_ new my_blog --webpack=react

rails g controller blogs index
```

使用 `rails s` 启动项目，可以访问 `/blogs/index` 页面看到 `Rails` 生成的页面。

接下来我们需要添加 `react-rails` 扩展：

```ruby
# add to Gemfile.lock
gem 'react-rails'
```

并执行安装：

```shell
bundle install
rails g react:install
```

此时打开 `app/javascript` 目录，可以查看到项目目录下多了 `components` 目录，以及 `packs` 目录里增加了对应的入口文件。

接下来，我们会把前面生成的 `/blogs/index` 作为入口页，渲染一个 `SPA` 标准单页应用。

为了实现一个可用的 `SPA` 应用，我们可能有一些需要用到的库：

```shell
yarn add react-router-dom
```

为了引入 `JavaScript` 渲染脚本，我们需要在页面里进行一些配置，打开 `app/views/layouts/application.html.erb` 并在 `<head></head>` 标签中添加：

```html
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```

它相当于现代前端在空白的 `index.html` 页面上添加 `<script src='./app.js'></script>` 。

接下来我们编写一个 `React` 应用，在 `app/javascript/components` 目录下创建前端工程目录，如果你很熟练 `React` 则不必刻意与我的结构一样，但起码你应该能够很快的找到它：

```shell
- app
    - javascript
        - components
            - routes
            - app.jsx
        - pages
            - home
                - index.jsx
                - index.scss
          - about
              - index.jsx
              - index.scss
```

如果你不熟练 `React` 与 `react-router-dom` ，你可以点击文章顶部的链接翻阅它们的文档。

以下是我编写的 `React` 应用的所有代码，它很简单：

```jsx
# app/javascript/components/pages/home/index.jsx
import React from 'react';

export default () => <h1>Home</h1>

# app/javascript/components/pages/home/about.jsx
import React from 'react';

export default () => <h1>About me</h1>

# app/javascript/components/routes/index.jsx
import React from 'react';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import Home from '../pages/home';
import About from '../pages/about';

export default () => {
    return (
        <BrowserRouter>
            <ul>
                <Link to='/'>home</Link>
        		<br/>
                <Link to='/about'>about</Link>
            </ul>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/about' component={About}/>
            </Switch>
        </BrowserRouter>
    )
}
```

编写完成以后，我们需要把根组件渲染在页面上，这一步有点类似于 `React.render(<App />, rootEle)` 的操作。

修改 `app/views/index.html.erb` ，添加 `React` 组件：

```ruby
<%= react_component 'routes' %>
```

此处的参数 `routes` 会自动寻找 `app/javascript/components` 目录下的 `routes` 组件，其规则与 `JavaScript` 相同，它可以使 `routes/index.jsx` 或者 `routes.jsx` 。

到这里我们已经在 `Rails` 中实现了一个基本的 `SPA` 应用了，刷新页面可以看到有两个链接，点击能够来回切换不同的页面。

美中不足的是此时刷新浏览器可能会得到 `404` 错误，这是因为在 `react-router` 里定义的路由与 `Rails Router` 里定义的不相同，当刷新浏览器，首先会请求的是 `Rails` 服务器，因此我们可以在 `config/routes.rb` 里添加对应配置，不用太复杂，只要能使对应的请求进入到挂载了 `routes` 根组件的页面里，就可以渲染对应的页面。

```ruby
Rails.application.routes.draw do
  root 'blogs#index'
  get '*path', to: 'blogs#index'
end
```

## 2. 使用预渲染解决首屏白屏问题

当页面越来越大，结构越来越复杂时，`SPA` 可能会遇到首屏白屏的问题。这是因为复杂页面结构导致 `JavaScript` 文件的体积越来越大，且渲染流程更复杂。

我们可以使用服务端预渲染来解决首屏白屏的问题，这很简单：

```ruby
<%= react_component 'routes', {}, { prerender: true } %>
```

添加 `prerender` 参数可开启预渲染。接下来的每一次用户请求，`react-rails` 都会直接将 `React` 组件预先渲染成 `HTML` 文本，这样可以节省大量的客户端渲染时间。

到这里为止，我们在传统的 `Rails MVC` 架构上，增加了在页面里使用 `React` 的技巧，它可以使我们更灵活的构建页面， `React` 不是什么高深莫测的东西，只是帮助你构建 `HTML` 的工具，其它方面的 `Rails` 没有发生任何变化。

因而你很容易发现，我们依然在使用 `Rails Router` 进行页面的管理。

在这样一种方案下，预渲染可以很有效的解决白屏问题。

为了更快的进行服务端预渲染，`CRuby/MRI Ruby` 用户可以添加 `mini_racer` 以获得更好的渲染效率：

```ruby
# Gemfile.lock
gem 'mini_racer'
```

安装后重新启动服务，观察日志可以发现 `Controller` 层的耗时明显得到了优化。

需要注意一点，由于页面在被服务端被渲染，因而渲染脚本 `application.js` 不需要在页面渲染前加载了，我们可以将其位置进行调整：

```html
<! DOCTYPE html>
<html>
  <head>
    <title>MyBlog</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <%= yield %>
    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
  </body>
</html>
```

以防止脚本阻塞页面的加载。

最后，由于渲染过程调整到了服务端，需要注意几点：

- 在服务端无法识别 `window`，`document` 等对象，因此需要在指定的生命周期（如 `componentDidMount`）里使用 `DOM/BOM` 。部分直接操作 `DOM` 的库如部分 `JQuery` 的插件直接引入 `React` 会导致异常，目前只能在入口页（`layout.html.erb`）上引入。
- ~~在服务端无法正常处理 `CSS` 样式，不要在 `React` 组件里直接引入 `CSS` 文件~~。
- 由于 `style-loader` 会在样式导入时自动使用 `DOM` 操作进行样式注入，参考上一条，在服务端渲染场景下，`style-loader` 将无法正常工作。

`React` 合成事件的绑定与 `Turbolinks` 换页的机制之间存在某种矛盾关系，在页面里使用 `Turbolinks` 将需要更加小心。

你可能需要在 `React` 组件卸载的时候注销掉对应的事件，不过幸好这也是 `React` 开发中常涉及到的习惯，因而无需花费过多的心智。

另一种可能是你希望在页面里使用 `react-router`，则此时仅仅开启 `prerender: true` 就不满足我们的需求了。

## 3. 基于 React-Rails 的服务端渲染方案

当在应用中使用 `react-router` 时，我们需要调整应用架构。

主要问题在于 `BrowserRouter` 不能很好的处理服务端渲染的场景，这一点在 `react-router` 文档中也有提到。通常当你在一个使用了 `BrowserRouter` 的组件上开启 `prerender: true`，不出意外的话你会得到一个错误。

由于整个应用依然是 `SPA` ，且我们开启服务端渲染的目的也只是解决首屏问题，因而首先要明确一点：**初次打开页面时并不需要渲染整个应用**。

我们将对 `app/javascript/components/routes/index.jsx` 进行调整： 

```jsx
import React from 'react';
import {BrowserRouter, StaticRouter, Switch, Link, Route} from 'react-router-dom';

import Home from '../pages/home';
import About from '../pages/about';

export default props => {
    return (
        <StaticRouter location={props.path}>
            <ul>
                <Link to='/'>home</Link>
                <br/>
                <Link to='/about'>about</Link>
            </ul>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/about' component={About}/>
            </Switch>
        </StaticRouter>
    )
}

```

此处我们把 `BrowserRouter` 替换为 `StaticRouter` ，它的作用是匹配渲染 `Router` 里的某个路由，它需要一个参数来确认需要渲染的是那一条路由，因此我们需要传递一个 `location` 给它。

`location` 并不是一定要从 `props` 中获取，但这样做我们只需要在入口页上添加一个属性既可，相对来说更加的动态和方便：
```html
# 位于 app/views/blogs/index.html.erb 的入口页
<%= react_component 'routes', {path: request.path}, {prerender: true} %>
```

此时在浏览器里输入对应的路径可以进入到期望得到的 `React` 页面。

由于 `react-rails` 预渲染实际使用 `ReactDOMServer.renderToString()` 方法，这是一个 `React` 官方提供的用于服务端渲染的库。其特点是可以在 将 `React` 组件解析成静态的 `HTML` 内容。该方法是无法将 `React` 中使用的合成事件转化成静态内容的。

我们调整应用，在任意位置添加一个点击事件，可以发现我们的应用并没有出现上述描述的情况，点击事件是可用的。这是因为  `react-rails` 的 `prerender` 其实是按照 **同构渲染** 的思路进行设计的。

现代前端 **同构渲染** 解决方案的核心，是利用 `React` 服务端渲染 `API` 完成首屏渲染，然后再次请求服务器拉取客户端渲染代码进行二次渲染。这样做既可以快速渲染出首屏，也能在后续保证用户的体验。

来看一下它在 `Rails` 里的具体工作流程：

1. 用户访问任意页面至 `Rails` 服务器，`Rails Router` 进行处理与分发到对应 `Controller#action` 最终找到目标模板页准备渲染页面。
2. 在目标模板页中确认需要渲染的页面并执行服务器渲染。
3. 浏览器呈现服务器返回的静态页面。
4. 浏览器再次请求服务器获取渲染脚本 `application.js` 。
5. 浏览器下载 `application.js` 并自动执行完成客户端二次渲染。

整个流程看起来复杂了不少，不过前面提到，`react-rails` 已经为我们做好了基本工作。

回到应用里，点击 `Router` 会发现页面跳转无法正常工作，这是因为 `StaticRouter` 并不合适用在客户端上，二次渲染我们要使用之前的 `BrowserRouter` ，我们只需要对 `app/javascript/components/routes/index.jsx` 文件进行一些改造：

```jsx
import React from 'react';
import {BrowserRouter, StaticRouter, Switch, Link, Route} from 'react-router-dom';

import Home from '../pages/home';
import About from '../pages/about';

const Router = props => {
    if (typeof window === "undefined") {
        return <StaticRouter location={props.location}>
            {props.children}
        </StaticRouter>
    } else {
        return <BrowserRouter>
            {props.children}
        </BrowserRouter>
    }
}

export default props => {
    return (
        <Router location={props.path}>
            <ul>
                <Link to='/'>home</Link>
                <br/>
                <Link to='/about'>about</Link>
            </ul>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/about' component={About}/>
            </Switch>
        </Router>
    )
}
```

在新的代码里，我们添加了一个自定义的 `Router` 组件，该组件根据渲染场景动态的使用不同的 `React-Router API` ，可以注意我们是如何判断当前渲染场景的

```javascript
typof window === "undefined"
```

正如前面所说，服务端没有 `window` 对象。

此时再刷新浏览器，可以发现路由的跳转已经正常工作。

到这里为止，我们已经实现了服务端渲染的大部分内容。

不过还没结束，我们还有最后一个问题需要解决：**首屏渲染时的数据从哪儿获取？**

暂时注释掉 `app/views/layouts/javascript.html.erb` 里，`body` 标签里的二次渲染脚本引入代码：

```html
<! DOCTYPE html>
<html>
  <head>
    <title>MyBlog</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <%= yield %>
    <%#= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
  </body>
</html>
```

然后刷新页面，`右击 -> 查看源代码` 可以看到虽然页面预渲染了，但实际渲染的是空的模板页，如果你的组件设计是在 `componentDidMount` 生命周期里进行异步请求拉取数据，则首屏渲染的时候不会拉取任何数据。

对于一部分应用来说，这样也许无伤大雅，但对于另一部分应用，这个设计可能是一个缺陷。

> 举个实际的例子，当你正在用 `React` 开发自己的博客系统，为了提高自己的知名度，你希望你的每一篇文章都能在搜索引擎里被搜索到，这将要求你的博客系统能够对动态数据进行基本的 `SEO` 。

解决该问题的方法并不难，我们只需要在预渲染期间把数据注入到组件里既可。且由于 `react-rails` 本身是定义在 `Ruby` 环境里的，它对于将数据注入到组件里有着天然的优势。

就像 `path` 一样，我们可以把数据注入到组件里：

```html
<%= react_component 'routes', {path: request.path, blogs: @blogs}, {prerender: true} %>
```

此时会把数据注入到 `routes` 组件中，但我们需要使用的组件实际是 `pages` 路径下的页面，可以使用 `StaticRouter` 提供的 `context` 来实现：

```jsx
import React from 'react';
import {BrowserRouter, StaticRouter, Switch, Link, Route} from 'react-router-dom';

...

const Router = props => {
    if (typeof window === "undefined") {
        return <StaticRouter location={props.location} context={props.context}>
            {props.children}
        </StaticRouter>
    } else {
        ...
    }
}

export default props => {
    return (
        <Router location={props.path} context={{blogs: props.blogs}}>
            ...
        </Router>
    )
}

```

上面的代码将入口页传入的 `blogs Props` 一层一层的最终传递给了 `StaticeRouter` 的 `context` 属性，然后我们可以在组件里访问：

```jsx
import React from 'react';

export default props => {
    console.log(props.staticContext)

    return <>
        ......
    </>;
}

```

通过 `props.staticContext` 既可获取到对应的数据。

> 解开入口页注释掉的渲染脚本外部链接，然后刷新页面，会发现该语句打印了两次，第一次是我们注入的数据，第二次是 undefined。这也是服务端渲染与客户端渲染的差异之一。
>
> 但请注意 **不要通过 `props.staticContext` 来判断当前的渲染环境**，因为我们无法保证该变量里到底存储了什么，如果注入的数据本身就是 `false`，`null`之类的数据，那么 `if (props.staticContext) {}` 也许会得到错误的判断结果。
>
> 推荐的做法依然是 `if (typeof window !== "undefined") {}` 。

而后我们可以直接使用该值来作为服务端渲染时的初始状态：

```jsx
import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        if (typeof window !== "undefined") {
            this.state = {
                blogs: []
            }
        } else {
            this.state = {
                blogs: props.staticContext.blogs
            }
        }
    }
    
    componentDidMount() {
        axios.get('...').then(res => {
            this.setState({
                blogs: res.data.blogs
            })
        })
    }

    render() {
        return <>
            ......
        </>;
    }
}

```

我们在初始化状态时根据渲染环境的区别分别给了不同的初始值，当服务端渲染时，直接使用注入的数据作为初始状态进行预渲染。当客户端渲染时，组件挂载后从服务器拉取数据。

不难发现一个问题，并不是所有的入口页都需要注入数据，也不能保证所有的页面注入的数据结构都是 `{ blogs: [] }` ，因此最后的最后，我们需要统一服务端渲染时数据注入的格式，因为我们既不希望重复的入口页写多份，也不喜欢把数据弄的乱七八糟：

**入口页**
```html
<%= react_component 'routes', {path: request.path, context: @data}, {prerender: true} %>
```

**`Route` 组件**

```jsx
import React from 'react';
import {BrowserRouter, StaticRouter, Switch, Link, Route} from 'react-router-dom';

const Router = props => {
    if (typeof window === "undefined") {
        return <StaticRouter location={props.location} context={props.context}>
            {props.children}
        </StaticRouter>
    } else {
        return <BrowserRouter>
            {props.children}
        </BrowserRouter>
    }
}

export default props => {
    return (
        <Router location={props.path} context={props.context}>
            ......
        </Router>
    )
}
```

在对参数进行调整后，我们可以在 `Controller` 层动态的构造需要注入的数据，而不用关心渲染的模板页细节。

> 事实由于组件是相同的，预渲染注入的数据与二次渲染的数据结构是一致的，因而我们可以利用 `Rails` 的自定义渲染特性来共用 `Controller` 层实现代码的精简。

到这里，我们就实现了一个完整的服务端渲染`React`应用。它能够快速的响应用户请求渲染首屏，同时也能支持 `SEO` ，并且在页面完成渲染后，它还保留了 `SPA` 良好的用户体验。让我们回过头来看看我们做了哪些事情：

1. 开启服务端预渲染选项，在这个过程里我们需要替换更高性能的 `NodeJS RunTime` ，同时还要调整脚本加载的位置，使之不要阻塞首屏渲染。
2. 根据渲染环境使用不同的 `Router` ，其中服务端渲染需要传递 `path` 属性给 `StaticRouter` 。
3. 预渲染的数据注入，在 `Controller` 层动态构建注入数据，通过 `context` 方式传入具体页面用作初始化。

## 4. 最后说两句
同构渲染是目前最流行的前端解决方案之一，但在实践的过程中我们不难发现任然有几个问题需要解决：

1. 同构渲染的实践并不轻松，我们需要围绕渲染流程做许多准备工作。
2. 当一部分组件需要在服务端渲染时，开发人员的职责会变得更混乱——注入数据的部分到底应该由服务端开发人员编写？还是前端开发人员编写？

对此我的看法是，我们应该更加理性的对待不同的需求，毕竟不是所有的 `SPA` 都需要服务端渲染的。

> 如果觉得本文对您有帮助，请给我一个赞~
> 如果您对本文有不同的理解，可以在评论区留言告诉我~