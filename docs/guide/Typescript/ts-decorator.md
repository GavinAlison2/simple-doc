# TS Decorator ts 的装饰器

```sh
npm i reflect-metadata --save

# 在 tsconfig.json 里配置 emitDecoratorMetadataL: true, experimentalDecorators: true 选项。
# 在文件头 import "reflect-metadata";
```

## 对应的 API

- `@Reflect.metadata(key: string, value: any)` 给类添加元数据
- `@Reflect.defineMetadata(metadataKey: string, metadataValue: any, target: Function)` 给类定义元数据
- `@Reflect.hasMetadata(metadataKey: string, target: Function)` 判断是否有元数据
- `@Reflect.getMetadata(metadataKey: string, target: Function)` 获取元数据
- `@Reflect.getOwnMetadata(metadataKey: string, target: Function)` 获取自己的元数据
- `@Reflect.getMetadataKeys(target: Function)` 获取元数据的键名列表

## 示例

· 定义元数据

```typescript
import "reflect-metadata";

function setMetadata(key: string, value: any) {
  return Reflect.metadata(key, value);
}

@setMetadata("name", "zhangsan")
class Person {}
```

· 获取元数据

```typescript
import "reflect-metadata";

function getMetadata(key: string) {
  return Reflect.getMetadata(key, this);
}

console.log(new Person().getMetadata("name")); // zhangsan
```
