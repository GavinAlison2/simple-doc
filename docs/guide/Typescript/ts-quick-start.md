# TypeScript

## Installation

command

```sh
npm install -g typescript
tsc --v

npm config list
npm config get prefix

D:\dev\node\node_global

D:\dev\node\node_global\tsc.ps1
D:\dev\node\node_global\tsc.cmd

配置环境变量 path=%path%;d:\\dev\node\node_global
这样才可以找到 tsc

npm install -g ts-node
ts-node --help
ts-node app.ts
同样需要注意 环境变量
和 ts-node 对应的配置文件 tsconfig.json
和 package.json 配置文件

```

## configuration

需要配置对应的文件 tsconfig.json 和 package.json

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "es6"
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS" // 指定ts-node 时，使用 CommonJS
    },
    "transpileOnly": true,
    "files": true
  },
  "include": [
    "**/*.ts" // 指定ts文件路径
  ]
}
```

```json
// package.json
{} // 不可指定 type: module
```

## create project todo-list

```sh
mkdir ts-todo
cd ts-todo
npm init -y // 初始化 package.json
npm install typescript ts-node --save-dev // 安装 typescript 和 ts-node
npx tsc --init // 初始化 tsconfig.json

```

code todo-list.ts

```typescript
// todo.ts

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

class TodoList {
  private todos: Todo[] = [];
  private nextId: number = 1;

  add(task: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      task,
      completed: false,
    };
    this.todos.push(newTodo);
    console.log(`Added: ${task}`);
  }

  complete(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = true;
      console.log(`Completed: ${todo.task}`);
    } else {
      console.log(`Todo with id ${id} not found.`);
    }
  }

  list(): void {
    console.log("To-Do List:");
    this.todos.forEach((todo) => {
      console.log(`${todo.id}. ${todo.task} [${todo.completed ? "✓" : " "}]`);
    });
  }
}

// 示例用法
const myTodoList = new TodoList();
myTodoList.add("Learn TypeScript");
myTodoList.add("Build a To-Do App");
myTodoList.list();
myTodoList.complete(1);
myTodoList.list();
```
