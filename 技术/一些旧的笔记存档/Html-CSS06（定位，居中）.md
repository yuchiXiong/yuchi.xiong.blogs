>#今天是2018年7月16日

##1.相对定位
>####给元素设置`position: relative;`可以使元素处于相对定位中。
~~~
<style>
        /* 相对定位就是元素在页面上正常的位置 */
        div{
            width: 100px;
            height: 100px;
            background-color: red;
            position: relative;
            top: 0px;
            left:0px;
            /* 相对定位一般不适用right/bottom */
            right: 0px;
            bottom: 0px;
        }
    </style>
~~~

##2.绝对定位
>####不同于相对定位，绝对定位是指在父元素中绝对的位置
~~~
<style>
        .parent{
            width: 200px;
            height: 200px;
            background-color: red;
            position: relative;
        }
        .child{
            width: 50px;
            height: 50px;
            background-color: blue;
            position: absolute;
            right: 0;
        }
    </style>
~~~

##3.元素的垂直水平居中
>####利用绝对定位和相对定位，可以实现元素在父类中的水平垂直居中
原理是使父元素相对定位，子元素绝对定位，给子元素50%定位后利用margin-top和margin-left回移子元素width和height属性的一半。
~~~
<style>
        *{padding: 0;margin: 0}
        .parent{
            width:300px;
            height: 300px;
            background-color: red;
            position: relative;
        }
        .child{
            width: 50px;
            height: 50px;
            position: absolute;
            left: 50%;
            top: 50%;
            background-color: blue;
            margin-top: -25px;
            margin-left: -25%;
        }
    </style>
~~~

##4.固定定位
>####固定定位可以使元素不受到滚动条的影响，始终固定在某一个位置
~~~
    <style>
        body{
            line-height: 30px;
        }
        div{
            width: 20px;
            height: 50px;
            background: tomato;
            position: fixed;
            right: 10px;
            bottom: 500px;
        }
    </style>
~~~

##5.Z-index
>####给元素设置z-index值可以更改元素覆盖情况下的优先显示顺序
~~~
<style>
        .parent{
            width: 300px;
            height: 300px;
            background-color: red;
            position: relative;
        }
        .one{
            width: 100px;
            height: 200px;
            background-color: green;
            position: absolute;
            z-index: 2;
        }
        .two{
            width: 200px;
            height: 100px;
            background-color: blue;
            position: absolute;
            z-index: 3;
        }
        .parent:hover .one{
            z-index:20;
        }
    </style>
~~~
