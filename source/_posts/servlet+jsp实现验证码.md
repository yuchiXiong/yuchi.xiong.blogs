---
title: Servlet  + JSP 实现验证码
date: 2018.09.06 15:52:2
tags:
  - Linux
categories:
  - Rails 踩坑记录
---
使用 Servlet+Jsp 完成验证码主要有如下步骤
1. 完成 HTML 页面的编写
2. 完成生成随机验证码的 Servlet
3. 完成刷新更换验证码的功能
4. 完成验证验证码是否正确是 Servlet

## 1. Html 的编写

页面结构相对比较简单，主要有`input-text`,`img`,`a`三种元素组成，`input-text`用于用户输入验证码，`img`用于显示验证码，而通常页面中都会用`a`标签来保证用户能更好的输入验证码。

~~~jsp
验证码：
<input type="text" name="CheckCode">
<img alt="验证码" id="imagecode" src="<%=request.getContextPath()%>/servlet/ImageServlet"/>
<a href="javascript:ReloadCode();">看不清楚，换一张</a>
~~~

效果如图

![预览](https://r2.xiongyuchi.com/servlet-jsp-shi-xian-yan-zheng-ma/1.webp)

## 2. 完成生成随机验证码的 Servlet

我们使用 Servlet 来完成对应的功能，创建`ImageServlet`类并继承自`HttpServlet`类。编写`doGet()`方法

~~~java
package com.yuchi;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ImageServlet extends HttpServlet {
	public void doGet(HttpServletRequest Request,HttpServletResponse Response) throws IOException {
		//BufferedImage 将图片存入缓存中，有三个构造方法，此处的三个参数为图片的宽，高，以及创建的图像类型。
		BufferedImage bi = new BufferedImage(68, 22, BufferedImage.TYPE_INT_RGB);
		//为 bi 创建图形上下文
		Graphics g = bi.getGraphics();
		//设置颜色，此处调用的构造方法是基于 RGB 数值作为参数的
		Color c = new Color(200, 150, 255);
		//设置颜色			
		g.setColor(c);
		//该方法用于填充指定的矩形，参数是坐标和宽高
		g.fillRect(0, 0, 68, 22);
			
		//编写随机获取验证码的部分
			
		//将字符串转换为字符数组
		char[] ch = "abcdefghijklmnopqrstuvwxyz0123456789".toCharArray();
		//随机类，在本程序中只使用了 int nextInt(int n) 方法，作用是生成一个 0-n 的伪随机 int 值
		Random r = new Random();
			
		int len = ch.length,index;
			
		//用于存储随机生成的四位验证码
		StringBuffer sb = new StringBuffer();
			
		for(int i = 0; i < 4; i++) {
			//从 0-len 随机获取一个作为下标
			index = r.nextInt(len);
			//随机获取颜色
			g.setColor(new Color(r.nextInt(200), r.nextInt(150), r.nextInt(255)));
				
			//在图形中绘制指定的 String，参数对应要绘制的 String 以及坐标
			g.drawString(ch[index] + " ", (i * 15) + 3, 18);
				
			//将内容添加到 StringBuffer
			sb.append(ch[index]);
		}
			
		//将验证码信息放入 session 中用于验证
		Request.getSession().setAttribute("PicCode", sb.toString());
		//将文件流输出，参数要写入的 RenderedImage，输出的文件格式，输出到的 ImageOutputStream
		ImageIO.write(bi, "JPG", Response.getOutputStream());
	}
}
~~~
## 2.5 关于`doGet()`方法中的内容详解（个人理解）
~~~java
BufferedImage bi = new BufferedImage(68, 22, BufferedImage.TYPE_INT_RGB);
~~~

查阅了 API，`BufferedImage`类似乎用于将图片存入缓存中，在这里我们调用的构造方法有三个参数，分别对应图片的宽高和创建的图像格式。此处的`BufferedImage.TYPE_INT_RGB`是一个类成员属性。详见 API

![TYPE_INT_RGB](https://r2.xiongyuchi.com/servlet-jsp-shi-xian-yan-zheng-ma/2.webp)

~~~java
//为 bi 创建图形上下文
Graphics g = bi.getGraphics();
//设置颜色，此处调用的构造方法是基于 RGB 数值作为参数的
Color c = new Color(200, 150, 255);
//设置颜色			
g.setColor(c);
//该方法用于填充指定的矩形，参数是坐标和宽高
g.fillRect(0, 0, 68, 22);
~~~

API 上说 “Graphics 类是所有图形上下文的抽象基类，允许应用程序在组件（已经在各种设备上实现）以及闭屏图像上进行绘制。 ”

这里我认为其类似于 MFC 里那个`PDC`，获取了屏幕之后，所有的操作都是基于它的，这里的`Graphics`也是一样，关于颜色，大小等操作都是基于它进行设置的。

即`setColor()`和`fillRect()`方法，前者的参数是一个`Color`类对象，该类有多重构造方法，而此处使用的是三个`int`数值，对应的是`RGB`数值大于 0 小于 256.而后者则用于填充指定的矩形，参数是坐标和宽高。

~~~java
//编写随机获取验证码的部分
			
//将字符串转换为字符数组
char[] ch = "abcdefghijklmnopqrstuvwxyz0123456789".toCharArray();
~~~

此处使用了`toCharArray()`方法将字符串转换为字符数组，如果不适用该方法，`char[] ch`是没有办法这样赋值的。

~~~java
//随机类，在本程序中只使用了 int nextInt(int n) 方法，作用是生成一个 0-n 的伪随机 int 值
Random r = new Random();
~~~

API 中将`Random`称为伪随机，并称`Math.random()`更容易使用= =！

![Random](https://r2.xiongyuchi.com/servlet-jsp-shi-xian-yan-zheng-ma/3.webp)

~~~java
int len = ch.length, index;
			
//用于存储随机生成的四位验证码
StringBuffer sb = new StringBuffer();
~~~

定义了用于存储长度的`len`以及对应的下标`index `，并定义了`StringBuffer`类对象用来存储随机生成的验证码。

~~~java
for(int i = 0; i < 4; i++) {
	//从 0-len 随机获取一个作为下标
	index = r.nextInt(len);
	//随机获取颜色
	g.setColor(new Color(r.nextInt(200), r.nextInt(150), r.nextInt(255)));
				
	//在图形中绘制指定的 String，参数对应要绘制的 String 以及坐标
	g.drawString(ch[index] + " ",(i * 15) + 3, 18);
				
	//将内容添加到 StringBuffer
	sb.append(ch[index]);
}
~~~

使用 for 循环生成 4 次随机字符，`r.nextInt(int len)`方法用于生成一个随机的 0~len 之间的`int`变量。后面的获取颜色中也是如此使用。

`void drawString(String str, int x,int y)`方法用于将指定文本绘制到图形中，参数分别对应指定的 String 文本，以及宽高。

最后利用`StringBuffer.append()`方法将生成的字符添加到类对象`sb`中。

~~~java
//将验证码信息放入 session 中用于验证
Request.getSession().setAttribute("PicCode", sb.toString());
//将文件流输出，参数要写入的 RenderedImage，输出的文件格式，输出到的 ImageOutputStream
ImageIO.write(bi, "JPG", Response.getOutputStream());
~~~

创建 session 并添加`sb.toString()`用于实现判断

最后一个方法是我觉得最迷的- -！`ImageIO.write()`方法，API 中有三种构造方法，用于将`ImageWriter`按指定格式以三种不同方式输出。

![ImageIO.write() 方法](https://r2.xiongyuchi.com/servlet-jsp-shi-xian-yan-zheng-ma/4.webp)

完成了如上代码的编写之后需要配置`servlet`打开`web.xml`添加如下代码。

~~~xml
<servlet>
	<servlet-name>ImageServlet</servlet-name>
	<servlet-class>com.yuchi.ImageServlet</servlet-class>
</servlet>
<servlet-mapping>
	<servlet-name>ImageServlet</servlet-name>
	<url-pattern>/servlet/ImageServlet</url-pattern>
</servlet-mapping>
~~~
部署后运行。

![部署后运行](https://r2.xiongyuchi.com/servlet-jsp-shi-xian-yan-zheng-ma/5.webp)

到此处为止，随机生成验证码的功能就完成了。

## 3. 完成刷新更换验证码的功能

事实上我们在页面中使用验证码时往往容易出现验证码看不清的情况，因此我们需要有一个用户按钮使得验证码可以刷新，此处我们给`a`标签写上`JavaScript`以完成刷新功能的实现。

~~~js
<script type="text/javascript">
	function ReloadCode(){
		var time = new Date();
		document.getElementById("imagecode").src = "<%=request.getContextPath()%>/servlet/ImageServlet?d=" + time;
	}
</script>
~~~

此处使用了`document.getElementById()`获取到`img`标签之后，直接修改其`src`属性即可完成刷新，但 IE 浏览器似乎有一个缓存功能会使得刷新并不能生效，因此需要增加一个时间作为参数，使得每一次刷新的内容都不相同，这样 IE 才不会认为此次刷新是不需要的。

到这里，整个用户界面就算完成了效果如图

![效果预览](https://r2.xiongyuchi.com/servlet-jsp-shi-xian-yan-zheng-ma/6.webp)

## 4. 完成对验证码的验证功能

其实验证功能的原理很简单，取出之前存入`Session`中的验证码，与用户的填入的验证码对比即可。

新建`LoginServlet`类，同样继承自`HttpServlet`类
~~~java
package com.yuchi;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet {
	public void doPost(HttpServletRequest Request,HttpServletResponse Response) throws IOException {
		String PicCode = (String) Request.getSession().getAttribute("PicCode");
		String CheckCode = Request.getParameter("CheckCode");
				
		CheckCode = CheckCode.toLowerCase();
				
		Response.setContentType("text/html;charset=gbk");
		PrintWriter out=Response.getWriter();
				
		if(CheckCode.equals(PicCode)) {
			out.print("正确！");
		}else {
			out.print("错误！");
		}
		out.flush();
		out.close();
	}
}

~~~

这一次我们选择使用`post`传参，因此方法也变成了`doPost()`【实在因为我对 get 那种 URL 传参的方式有点厌恶……】。


在类的编写中需要注意到几个问题
- 验证码的大小写问题
- 字符编码
- 输出流的关闭

因此在类中我们编写了一些用于解决这些问题的语句
~~~java
//将用户的验证码统一为小写
CheckCode=CheckCode.toLowerCase();
//设置页面的字符编码为 gbk
Response.setContentType("text/html;charset=gbk");
//刷新流并关闭
out.flush();
out.close();
~~~

编写对应的 Servlet 并更改 HTML 结构

~~~xml
<servlet>
	<servlet-name>LoginServlet</servlet-name>
	<servlet-class>com.yuchi.LoginServlet</servlet-class>
</servlet>
<servlet-mapping>
	<servlet-name>LoginServlet</servlet-name>
	<url-pattern>/servlet/LoginServlet</url-pattern>
</servlet-mapping>
~~~

~~~jsp
<form action="<%=request.getContextPath()%>/servlet/LoginServlet" method="post">
	......
	<input type="submit" value="提交">
</form>
~~~

以上，一个基本的验证码功能就完成了。效果如图:

![基本演示](https://r2.xiongyuchi.com/servlet-jsp-shi-xian-yan-zheng-ma/7.webp)
