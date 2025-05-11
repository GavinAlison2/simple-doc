-- +++++++++++++++++++++++++++++++++
-- case4. mysql MRR (Multi Range Read)
-- +++++++++++++++++++++++++++++++++

-- DDL

CREATE TABLE `student` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `student_name` varchar(20) DEFAULT NULL COMMENT '名称',
  `age` smallint(6) DEFAULT NULL COMMENT '年龄',
  `info` varchar(30) DEFAULT NULL COMMENT '信息',
  PRIMARY KEY (`id`),
  KEY `idx_age_name` (`age`,`student_name`)
) ENGINE=InnoDB  AUTO_INCREMENT=1  DEFAULT CHARSET=utf8;


CREATE TABLE `seat` (
  `seat_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '座位ID',
  `seat_code` char(10) DEFAULT NULL COMMENT '座位码',
  `student_id` bigint(20) DEFAULT NULL COMMENT '座位关联的学生ID',
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB  AUTO_INCREMENT=1  DEFAULT CHARSET=utf8;

-- DML

#开启函数创建
set global log_bin_trust_function_creators=1;
#ON表示已开启
show variables like 'log_bin_trust%';

#分割符从;改为$$
delimiter $$
#函数名ran_string 需要一个参数int类型 返回类型varchar(255)
drop function if EXISTS ran_string ;
create function ran_string(n int) returns varchar(255)
begin
    #声明变量chars_str默认'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    declare chars_str varchar(100) default 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    #声明变量return_str默认''
    declare return_str varchar(255) default '';
    #声明变量i默认0
    declare i int default 0;
#循环条件 i<n
    while i < n do
        set return_str = concat(return_str,substring(chars_str,floor(1+rand()*52),1));
        set i=i+1;
    end while;
    return return_str;
end $$

#生成范围生成整形的函数
delimiter $$
create function range_nums(min_num int(10),max_num int(10)) returns int(5)
begin
    declare i int default 0;
    set i = FLOOR(RAND() * (max_num - min_num + 1)) + min_num;
    return i;
end $$


#插入 从参数start开始 插入max_num条数据
delimiter $$ 
create procedure insert_students_tests(in start int(10),in max_num int(10))
begin
    declare i int default start;
    set autocommit = 0;
    repeat
        set i = i+1;
        #SQL 语句
        insert into student(student_name,age,info) 
        values (ran_string(10),range_nums(0,100),ran_string(20));
        until i=max_num
    end repeat;
    commit;
end $$

#执行插入函数
delimiter ;
call insert_students_tests(0,19000000); -- cost 

alter table student add index idx_age_name(age,student_name);


