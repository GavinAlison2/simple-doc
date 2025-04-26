import { useState, useContext } from 'react';
import TodosContext from '../context/todos';

const TodoCreate = () => {
  const [todo, setTodo] = useState('');
  const { createTodo } = useContext(TodosContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(todo);
    setTodo('');
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-create">
      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="Enter a todo"
        value={todo}
        onChange={handleChange}
      />
    </form>
  );
};

export default TodoCreate;

const handleSubmit = (e) => {
  e.preventDefault();
  createTodo(todo);
  setTodo('');
};
