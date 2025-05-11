# MySQL 索引失效

## 索引失效的场景

- 使用函数或者表达式
- 存在隐式类型转换
- 组合索引未遵循最左匹配原则
- like 查询使用左通配符
- OR 条件中没有存在索引列
- 使用`!=`、`<>`、`NOT IN` 条件，无法使用索引
- 使用 `IS NULL` 或 `IS NOT NULL`, 无法使用索引
- 使用 `ORDER BY` 或 `GROUP BY` 中的列没有使用索引，无法使用索引
- 使用 `SELECT *` 返回的数据量过大，无法使用索引

```sql
-- case1 使用函数或者表达式
SELECT LENGTH(name) as length_name, name FROM table_name WHERE LENGTH(name) > 5;

-- case2 存在隐式类型转换
SELECT name FROM table_name WHERE age > '20';

-- case3 组合索引未遵循最左匹配原则
SELECT name, age FROM table_name WHERE name = 'Tom' AND age > 20;

-- case4 like 查询使用左通配符
SELECT name FROM table_name WHERE name LIKE '%Tom';

-- case5 OR 条件中没有存在索引列
SELECT name FROM table_name WHERE name = 'Tom' OR age > 20;

-- case6 使用!=、<>、NOT IN 条件，无法使用索引
SELECT name FROM table_name WHERE age NOT IN (10, 20, 30);

-- case7 使用 IS NULL 或 IS NOT NULL, 无法使用索引
SELECT name FROM table_name WHERE age IS NULL;

-- case8 使用 ORDER BY 或 GROUP BY 中的列没有使用索引，无法使用索引
SELECT age FROM table_name ORDER BY name;

-- case9 使用 SELECT * 返回的数据量过大，无法使用索引
SELECT * FROM table_name; 
```

## 索引失效的原因

- 索引列数据类型不匹配
- 索引列数据分布不均匀
- 索引列数据存在空值
- 索引列数据过大
- 索引列数据过多
- 索引列数据存在重复值
- 索引列数据存在外键关联
- 索引列数据存在函数计算
- 索引列数据存在表达式索引
- 索引列数据存在聚合函数
- 索引列数据存在排序
- 索引列数据存在分组
- 索引列数据存在子查询
- 索引列数据存在多表关联
- 索引列数据存在多列索引
- 索引列数据存在索引覆盖
- 索引列数据存在索引下推

- 索引不满足最左前缀匹配
- 索引字段隐式转换
- 字符串 like '%xx' 索引失效
- 字符串 like 'xx%' 索引生效
- MySQL 引擎优化不需要走索引

## 索引类型

- 联合索引, index(col1, col2)
- 最左匹配原则，先 col1, 后 col2
- 存在联合索引，查询条件不满足最左匹配原则，则索引失效
  - 只存在col2,则失效
  - 如果 col1 and col2都存在，则索引生效
  - 如果col2 and col1， 索引生效
