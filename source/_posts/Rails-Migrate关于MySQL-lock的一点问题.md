---
title: Rails Migrate 关于 MySQL Lock 的一点问题
date: 2020-05-22 21:34:12
tags:
  - Rails
  - MySQL
categories:
  - Rails 踩坑记录
---
**问题描述**

本周将数据由`PSQL`迁移到了`MySQL`，在迁移顺利进行之后，于周三进行了一个小规模的`BUG`修复，为修复数据表中的错误，增加了 4 个`migration`文件，运行如下指令:
~~~ shell
RAILS_ENV=production rails db:migrate
~~~

得到如下报错:
~~~ log
ActiveRecord::ConcurrentMigrationError:
Failed to release advisory lock
~~~

**解决方案**

`Rails 6` 文档中提到了如下内容
> Advisory Locks are enabled by default on MySQL and are used to make database migrations concurrent safe. You can disable advisory locks by setting advisory_locks to false:
> [Configuring Rails Applications](https://edgeguides.rubyonrails.org/configuring.html#configuring-a-mysql-or-mariadb-database)

该特性在`Rails 6`开始支持，对于不太方便升级`Rails`的朋友，实际上上述的异常并不会影响迁移的执行（如果影响到我想应该不是该问题导致的），一个我并不太推荐的方法是使用`Rails 6`的工程来跑特定的迁移。
