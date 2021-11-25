##2019年1月3日13:41:00
> 闲的蛋疼鼓捣了一下node上发送邮件的插件`nodemailer` ，正好之前javaMail那个一直发不出去，弥补一下小小的遗憾。
###1.安装`nodemailer`
~~~
npm i nodemailer -s
~~~
###2.编写发送邮件的js文件
~~~
//引入模块
const nodemailer = require('nodemailer');

//设置邮箱配置
let transporter=nodemailer.createTranspoter({
  host:'',//邮箱服务的主机，如smtp.qq.com
  port:'',//对应的端口号
  //开启安全连接
  secure:false,
  //secureConnection:false,
  //用户信息
  auth:{
    user:'',
    pass:''
  }
});

//设置收件人信息
let mailOptions={
  from:'',//谁发的
  to:'',//发给谁
  subject:'',//主题是什么
  text:'',//文本内容
  html:'',//html模板

   //附件信息
  attachments:[
  {
      filename:'',
      path:'',
    }
  ]
};

//发送邮件
transporter.sendMail(mailOptions,(error,info)=>{
  if(error)
    return console.log(error);
   console.log(`Message: ${info.messageId}`);
   console.log(`sent: ${info.response}`);
});
~~~
###3.
`secureConnection`参数开启后可能出现`ssl`版本的问题，以上即可实现发送邮件。
