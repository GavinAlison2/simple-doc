# typescript

## 工具

```sh
npm install  typescript ts-node --save
npm i nodemon --save-dev  # 安装 nodemon 包以监控更改并自动重启 Node 应用程序
npm init -y  # 初始化 package.json 文件


package.json

{
   "scripts": {
      "start": "nodemon",
      "build": "tsc",  # 编译 ts 文件为 js 文件
      "exec": "ts-node ./src/index.ts",
      "dev": "nodemon --exec ts-node ./src/index.ts --watch ./src --ext .ts,.js --ignore dist,node_modules",  # 监视更改并自动重启应用程序
   }
}
```

## table of contents

1. 什么是 ts
   -. ts 类型
   -. 类型注解
2. 类型推断 `x as y` 就是类型转换
3. 类型声明 `let var const :`
4. 类型总览
5. 常用类型
   5.0.1 原始类型 string number boolean null undefined void unknown symbol never any bigint 字面量类型
   5.0.2 对象类型 function array object tuple enum 联合类型 交叉类型 类型别名
   5.1. 基础类型 - number - string - boolean - null - undefined - void - any - array - object - symbol - bigint - never - 字面量类型 123 'abc' - 枚举类型 enum - 元组类型 tuple
   5.2 联合类型 - `|  &`
   5.3 交叉类型
   5.4 类型别名 type 关键字定义别名
   5.5 字符串字面量类型
6. 接口
   6.1 扩展接口
7. 类
   7.1 类声明
   7.2 类表达式
   7.3 类属性, 只读属性, 静态方法和属性
   7.4 构造函数, 实例方法, 静态属性, 实例属性, 访问器属性
   7.5 抽象类
   7.6 接口多继承 类单继承
8. 泛型
9. 装饰器 decorator 装饰器可以用来拓展类的功能 `@xx` 类装饰器, `@function` 函数装饰器, `@parameter` 参数装饰器, `@property` 类属性装饰器, `@method` 类方法装饰器, `@class` 类装饰器
10. 模块
11. 命名空间
12. 控制语句
    12.1 if else switch case
    12.2 for while do
    12.3 break continue return throw try catch finally
13. 函数
    13.1 函数声明
    13.2 函数表达式, 函数类型
    13.3 默认参数
    13.4 剩余参数
    13.5 函数重载
