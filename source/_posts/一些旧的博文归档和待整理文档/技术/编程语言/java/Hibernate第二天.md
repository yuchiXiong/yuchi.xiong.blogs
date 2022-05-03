# Hibernate第二天

在浪费了很多时间之后……又回过头来写`Hibernate`的基础内容，加上今天学校的课很多，所以只能用了一些课堂的时间来写一下之前的内容。

## 1. 整个框架的搭建
搭建一个`Hibernate`框架的开发环境在上一篇已经说过了，其中包括：
1. 创建`*.hbm.xml`文件描述有关连接数据库的底层内容
	- `connection.username`: 数据库用户名
	- `connection.password`: 数据库密码
	- `connection.diriver_class`: 数据库的驱动（对应jdbc中的映射方式获取类驱动）
	- `connection.url`:描述数据库的主机号端口号以及库名称，其中`localhost:3306`可以简写成单斜杠`/`
	- `dialect`:数据库方言，我注意到在`org.hibernate.dialect.*`中很多各种版本的数据库方言，但事实上目前为止我的使用中都只允许使用`MySQL5InnoDBDialect`这个类文件 
	- `hibernate.show_sql`:数据库语句的显示信息，我们通常是指为`True`以在控制台输出`Hibernate`框架为我们生成的`sql` 语句。
	- `hibernate.format_sql`:与上者相似，设置为 `True`后可以使控制台输出的内容具有规定的格式。 
	- `hbm2ddl.auto`:该属性常用的有`create`,`update`两种，对应每一次执行时对表的修改操作，前者会删除已有的表重新创建，后者在已有的基础上增加新的内容。（其中也包括了列）
2. 编写实体类，与`javaBeans`的基本思想无异，不做过多的赘述
3. 创建`*.cfg.xml`文件完成实体类的映射，此处也是对于`Hibernate`秒描述中“映射”二字的诠释。需要注意的是，在生成了这个文件之后，需要在`*.hbm.xml`文件中添加对应的映射标签
	~~~xml
	<mapping resource="Students.hbm.xml"/>
	~~~
4. 编写测试类用于测试
	~~~java
	// ......导入相关的包
	public class JunitTest {
		//预先定义需要使用的类对象
		SessionFactory sessionFactory=null;
		Session session=null;
		Transaction transaction=null;
		
		@Before
		public void init() {
			//1.生成配置文件
			Configuration config=new Configuration().configure();
			//注册服务
			ServiceRegistry serviceRegistry=new ServiceRegistryBuilder().applySettings(config.getProperties()).buildServiceRegistry();
			//创建会话工厂
			sessionFactory=config.buildSessionFactory(serviceRegistry);
			//开启会话
			session=sessionFactory.openSession();
			//开启事务
			transaction=session.beginTransaction();
		}
		
		@Test
		public void test() {
				iStudents s=new Students("0001","小明","男",new Date());
							session.save(s);
				}
		}
		
	//关闭连接
		@After
		public void destory() {
			transaction.commit();
			session.close();
			sessionFactory.close();
		}
	}
	~~~

5. 这样就完成了一个基本的使用`Hibernate`框架对表进行操作了。然而如果对数据库不能进行基本的增删改查，似乎并不能解决什么实际问题。

## 2. 增删改查操作
之前已经写过增删改查主要使用的是`save()`,`delete()`,`update()`,`get()/load()`方法，这里需要将的是查，也就是`get()/load()`

之前在视频中老师只是讲解了一个查询单条记录的操作方法，而我们往往要查询更多的记录，因此我们需要使用到`Hql`来完成指定的查找。

~~~java
String hql = "from Students";
List<Students> students = session.createQuery(hql).list();
for (Students s : students) {
	System.out.println(s.toString());
}
~~~

如上就使用`hql`完成了多记录查询，因为我重写了`Students.toString()`这个方法，可以看到如下图运行结果。

![结果](https://upload-images.jianshu.io/upload_images/13085799-8fe0e9119f582638.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
