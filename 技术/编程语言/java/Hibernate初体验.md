# Hibernate初体验

开始接触`Hibernate`框架，抄了一天的代码……一脸懵逼= =！

## 1. 国际惯例：Hibernate是什么
> 百度百科：Hibernate是一个开放源代码的对象关系映射框架，它对JDBC进行了非常轻量级的对象封装，它将POJO与数据库表建立映射关系，是一个全自动的orm框架，hibernate可以自动生成SQL语句，自动执行，使得Java程序员可以随心所欲的使用对象编程思维来操纵数据库。

在很久之前我是很抗拒“映射”“映射关系”这一类词汇的……因为它们不仅看起来很抽象，用起来也很抽象。。。

说说我自己的理解吧，在前面已经接触过jdbc这样一个东西了，也可以使用它进行对数据库的操作了，但它却存在着一些弊端，这些弊端的主要表现是：我们往往使用jdbc的语句来操作数据库，以完成增删改查之类的操作。然而这些过程本身就是面向过程而不是面向对象的，它本身就与我们java的面向对象编程格格不入。于是就有了Hibernate这样一款框架，它给我们提供了一种新的思路，同时也简化了我们程序的可移植性。

## 2. Hibernate需要用到的东西
为了使用更好的体验Hibernate，我们需要用的以下内容。
1. Eclipse的(jboss tools)[http://tools.jboss.org/downloads/]插件
2. Hibernate框架，Junit调试工具，Jdbc所需要的jar包。

## 3. 搭建一个简单的Hibernate项目
搭建一个简单的Hibernate我们首先要知道这样一个项目包含并实现了哪些内容。

1. 在Hibernate.cfg.xml文件中编写配置文件以完成连接入数据库
2. 完成实体类的编写
3. 创建实体类对应的*.hbm.xml文件以完成表结构的关系映射
4. 编写Junit测试方法并完成测试。

以下代码实现了简单的往数据库中插入记录的功能。

### 1. 在Hibernate.cfg.xml文件中编写配置文件以完成连接入数据库
~~~xml
//数据库用户名
<property name="connection.username">root</property>
//数据库密码
<property name="connection.password">root</property>
//数据库类驱动文件
<property name="connection.driver_class">com.mysql.jdbc.Driver</property>
//数据库的url信息
<property name="connection.url">jdbc:mysql:///hibernate?useUnicode=true&amp;characterEncoding=UTF-8</property>
//设置方言，在org.hibernate.dialect类中包含了很多种不同的方言文件
<property name="dialect">org.hibernate.dialect.MySQL5InnoDBDialect</property>
    	
//执行完成后显示自动生成的sql语句
<property name="show_sql">true</property>
//执行完成后按格式生成sql语句
<property name="format_sql">true</property>
//执行完成后的表创建方式
<property name="hbm2ddl.auto">create</property>
~~~

### 2. 实体类的编写
~~~java
//学生类
public class StudentsClass {

	private int sid;
	private String sname;
	private String gender;
	private Date birthday;
	private String address;
	
	// ...有参与无参的构造方法

    // ...属性的getter()/setter()方法

    // ...重写的toString()方法
	
}

~~~

### 3. 创建实体类对应的*.hbm.xml文件以完成表结构的关系映射
~~~xml
<hibernate-mapping>
    <class name="com.jdbc.StudentsClass" table="STUDENTSCLASS">
        <id name="sid" type="int">
            <column name="SID" />
            <generator class="assigned" />
        </id>
        <property name="sname" type="java.lang.String">
            <column name="SNAME" />
        </property>
        <property name="gender" type="java.lang.String">
            <column name="GENDER" />
        </property>
        <property name="birthday" type="java.util.Date">
            <column name="BIRTHDAY" />
        </property>
        <property name="address" type="java.lang.String">
            <column name="ADDRESS" />
        </property>
    </class>
</hibernate-mapping>
~~~

以上内容都是文件创建时自动生成的。生成之后，在第一步中的xml文件中添加如下代码

~~~xml
<mapping resource="StudentsClass.hbm.xml"/>
~~~

### 4. 编写Junit测试方法并完成测试。

~~~java
public class StudentsTest {
	
	private SessionFactory sessionFactory;
	private Session session;
	private Transaction transaction;
	
	@Before
	public void init() {
		//创建配置对象		
		Configuration config = new Configuration().configure();
		//创建服务注册对象		
		ServiceRegistry serviceRegistry = new ServiceRegistryBuilder().applySettings(config.getProperties()).buildServiceRegistry();
		//创建会话工厂对象
		sessionFactory = config.buildSessionFactory(serviceRegistry);
		//会话对象
		session = sessionFactory.openSession();
		//开始事务
		transaction = session.beginTransaction();
	}
	
	@After
	public void destory() {
		transaction.commit();//提交事务
		session.close();//关闭会话
		sessionFactory.close();//关闭会话工厂
	}
	
	@Test
	public void testSaveStudents() {
		//生成学生对象
		StudentsClass sc = new StudentsClass(1, "张三丰", "男", new Date(), "武当山");
		session.save(sc);//保存对象进入数据库
	}
}
~~~
### 5. 测试
使用Junit测试工具测试testSaveStudents()方法

![测试](https://upload-images.jianshu.io/upload_images/13085799-ba5f969a086f95f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

查看数据库

![查看数据库](https://upload-images.jianshu.io/upload_images/13085799-6af2f986176b2e63.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如图可以看到Hibernate已经为我们创建了表并插入了记录。
