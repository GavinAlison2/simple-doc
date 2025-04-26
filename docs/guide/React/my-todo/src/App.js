import './App.css';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { useState } from 'react';
import { initialTodos } from './TodoVo.js';



function App() {
  const [todos, setTodos] = useState(initialTodos);

  const createTodo = (text) => {
    const todo = {
      id: todos.length + 1,
      text: text,
      name: 'Task ' + (todos.length + 1),
      descript: 'This is the ' + (todos.length + 1) + ' task',
      create_by: 'user1',
      create_time: new Date().toLocaleString(),
      done: false
    };
    setTodos([...todos, todo]);
  }

  const removeTodos = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  const changeTodos = (id, text, done = false) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text, done };
      }
      return todo;
    }));
  }
  return (
    <main className="main">
      <h1>My Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} removeTodos={removeTodos} changeTodos={changeTodos} />
      <TodoCreate createTodo={createTodo} />
    </main>
  );
}

export default App;
