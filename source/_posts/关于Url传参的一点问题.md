---
title: 关于 Url 传参的一点问题
date: 2018.09.07 22:00
tags:
  - Java
categories:
  - 程序员的幸福：让代码变成强有力的工具
---
晚一点看完比赛突然想起来 URL 传参的问题。

当页面使用 URL 传参时，可以在浏览器通过修改 URL 来达成修改传参的效果，对于某些要插入到数据库的操作，这样的现象就略微有些危险了。虽然能使用`doPost()`方法不再在 URL 中显示传递的参数，但是通过尝试我发现，在已知参数名的情况下，依然可以通过 URL 进行参数的修改。

**分析：**

其实很容易明白，不过在页面中我是使用了`url?arg=`的方式，还是利用`form-submit`的方式，最终使用的都是`request.getParameter()`在页面开始前获取参数，而后在 URL 中传递的参数都会再次触发`request.getParameter()`从而覆盖掉之前的数据。

**思考：**

在明白了以上内容后，我尝试使用重定向`response.sendRedirect()`方法在不修改 URL 的情况下重定向，继而发现这样依然避免不了在新的页面使用`request.getParameter()`方法来获取上一个页面中的内容。

联想到上一次的验证码，我想到了使用`Session`来尝试在新的页面直接由`Session`获取隐私数据，而不再使用这种传参方式。

**困难：**

然而很快我就发现这种想法的实现似乎有些难度，主要问题在于，我似乎没有办法把当前页面用户填写的数据马上获取后存入`Session`中，获取当前页面用户填写的内容的方法我能想到的是`JavaScript`的`document.getElementById()`函数，而这个数据我并没有办法将其存入`Session`中。

**解决：**

之后我想到了使用`Servlet`尝试完成，创建了用于测试的`TestServlet`类，重写了其`doPost()`方法，同时也将`doGet()`方法默认为`doPost()`方法。

~~~java
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub
	String c=request.getParameter("c");
	request.getSession().setAttribute("c_val",c);
	response.sendRedirect("../index4.jsp");
}
~~~

此处遇到了一个问题：在 Servlet 中转发/重定向的文件路径与 jsp 中并不相同，如上代码中，如果单填写`index4.jsp`是无法访问的，会 404。在查阅了相关资料后发现要写`../index4.jsp`

配置 web.xml
~~~xml
<servlet>
  	<servlet-name>TestServlet</servlet-name>
  	<servlet-class>com.YuChi.TestServlet</servlet-class>
  </servlet>
  <servlet-mapping>
  	<servlet-name>TestServlet</servlet-name>
  	<url-pattern>/servlet/TestServlet</url-pattern>
  </servlet-mapping>
~~~

运行

![直接访问](./images/guan-yu-url-chuan-can-de-yi-dian-wen-ti/1.webp)

![url 修改](./images/guan-yu-url-chuan-can-de-yi-dian-wen-ti/2.webp)

到此为止，终于实现了对于 url 传参的屏蔽效果，但事实上我并不知道这种所谓的屏蔽是否存在其意义，因为当我们使用`doPost()`方法传参时，用户是没有办法通过 url 得知控制参数的变量的，那么想要通过 url 修改参数的可行性也就有待考证了。
