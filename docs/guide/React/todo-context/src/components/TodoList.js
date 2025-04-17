import TodoShow from './TodoShow';
import TodosContext from '../context/todos';
import { useContext } from 'react';

const TodoList = () => {
  const { todos } = useContext(TodosContext);
  //
  const renderedTodos = todos.map((todo) => {
    return <TodoShow key={todo.id} todo={todo} />;
  });

  return <ul className="todo-list">{renderedTodos}</ul>;
};

export default TodoList;
