import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { useEffect, useContext } from 'react';
import TodosContext from './context/todos';
import './App.css';

const App = () => {
  const { getTodos } = useContext(TodosContext);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="main">
      <h1>
        React Todo <span>Streamline Your Day, the React Way!</span>
      </h1>
      <TodoList />
      <TodoCreate />
    </main>
  );
};

export default App;
