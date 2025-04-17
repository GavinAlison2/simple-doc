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
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            console.log(`Completed: ${todo.task}`);
        } else {
            console.log(`Todo with id ${id} not found.`);
        }
    }

    list(): void {
        console.log('To-Do List:');
        this.todos.forEach(todo => {
            console.log(`${todo.id}. ${todo.task} [${todo.completed ? '✓' : ' '}]`);
        });
    }
}

// 示例用法
const myTodoList = new TodoList();
myTodoList.add('Learn TypeScript');
myTodoList.add('Build a To-Do App');
myTodoList.list();
myTodoList.complete(1);
myTodoList.list();
