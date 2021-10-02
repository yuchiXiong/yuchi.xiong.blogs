# Rails使用puma带证书启动

**问题描述**

不常见的场景，偶尔间因为没有`Nginx`服务器可以用，但又需要测试`HTTPS`，因此使用这种方式来带证书启动。

**解决方案**

~~~ shell
rails s puma -p 3000 -b 'ssl://0.0.0.0:3000?key=config/your_key_file.key&cert=config/your_certificate_file.crt'
~~~