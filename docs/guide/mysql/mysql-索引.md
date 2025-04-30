# MySQL 索引

- 主键索引
- 普通索引
- 联合索引

## 主键索引

- clustered index

## 普通索引

- non-clustered index
- secondary index, 查找普通索引数据带id,在回表查询clustered index数据
  
## 联合索引

- multi column index
- 联合索引的列数越多，查询效率越高
- 最左前缀匹配
- 只有索引最后的col2, 会存在索引失效的问题
