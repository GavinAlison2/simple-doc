# vue2 slot

`template scope-slot="scope"` , `scope.row` 获取当前行的数据.

在 table 中, 需要 scoped slot 来自定义显示整行的数据内容, 如下:

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
    name: 'Table',
        return {
            items: [
                { id: 1, name: 'John', age: 25 },
                { id: 2, name: 'Mary', age: 30 },
                { id: 3, name: 'Tom', age: 28 }
            ]
        }
}
</script>
```

在上面的代码中, 我们定义了一个 `Table` 组件, 其中包含一个 `items` 数组, 数组中包含三个对象, 对应表格的每一行的数据.

我们希望在每一行的 `td` 标签中显示自定义的内容, 而不是默认的 `id`, `name`, `age` 等内容.

我们可以用 `scoped slot` 来实现这个功能.

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>
          <slot name="id">{{ item.id }}</slot>
        </td>
        <td>
          <slot name="name">{{ item.name }}</slot>
        </td>
        <td>
          <slot name="age">{{ item.age }}</slot>
        </td>
        <template scope-slot="scope">
          <td>{{ scope.row }}</td>
        </template>
        <td>
          <slot name="action">
            <button>Edit</button>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
    name: 'Table',
        return {
            items: [
                { id: 1, name: 'John', age: 25 },
                { id: 2, name: 'Mary', age: 30 },
                { id: 3, name: 'Tom', age: 28 }
            ]
        }
}
</script>
```
