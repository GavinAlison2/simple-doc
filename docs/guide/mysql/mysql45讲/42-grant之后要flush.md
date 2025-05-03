# 42-grant之后要flush

```sql
create user 'ua'@'%' identified by 'ua123';
```

这条命令做了两个动作：

1. 磁盘上，往 mysql.user 表里插入一行，由于没有指定权限，所以这行数据上所有表示权限的字段的值都是 N；

2. 内存里，往数组 acl_users 里插入一个 acl_user 对象，这个对象的 access 字段值为 0。

## 全局权限

```sql
// 增加权限
grant all privileges on *.* to 'ua'@'%' with grant option;
// 取消权限
revoke all privileges on *.* from 'ua'@'%';

```

将上述第1步权限字段的值 N 全改为 Y；把上述第2步内存数组 acl_users 全改为1。

## db 权限

```sql
grant all privileges on db1.* to 'ua'@'%' with grant option;
```

grant 操作对于已经存在的连接的影响，在全局权限和基于 db 的权限效果是不同的。如果当前会话已经处于某一个 db 里面， use 这个库的时候拿到的库权限会保存在会话变量中，所以 revoke 会不生效。

## 表权限和列权限

```sql
create table db1.t1(id int, a int);

grant all privileges on db1.t1 to 'ua'@'%' with grant option;

GRANT SELECT(id), INSERT (id,a) ON mydb.mytbl TO 'ua'@'%' with grant option;

```

## flush privileges 使用场景

正常情况下，grant 命令之后，没有必要跟着执行 flush privileges 命令，因为会同时刷新内存数据。
但当数据表中的权限数据跟内存中的权限数据不一致的时候，flush privileges 语句可以用来重建内存数据，达到一致状态。这种不一致往往是由不规范的操作导致的，比如直接用 DML 语句操作系统权限表。

