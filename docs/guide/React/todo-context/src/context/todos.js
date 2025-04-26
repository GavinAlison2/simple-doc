import { createContext, useState } from 'react';

const TodosContext = createContext();

const Provider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const url = 'http://localhost:5000/todos';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const storedTodos = await response.json();
      // Update the state
      if (storedTodos) setTodos(storedTodos);
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  const createTodo = async (title) => {
    // call an API to create a new todo
    const url = 'http://localhost:5000/todos';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();

      const newTodo = { ...responseData };

      // add the new todo to the list
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error creating a todo:', error);
    }
  };

  const removeTodo = async (id) => {
    // Delete the todo
    const url = `http://localhost:5000/todos/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // const responseData = await response.json();
      // console.log('DELETE request succeeded with JSON response:', responseData);

      // Update the state
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error during DELETE request:', error);
      throw error;
    }
  };

  const changeTodo = async (id, newTitle, completed = false) => {
    // Update todo
    const url = `http://localhost:5000/todos/${id}`;

    const data = { title: newTitle, completed };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('PUT request succeeded with JSON response:', responseData);

      // Update the state
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, ...responseData };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error during PUT request:', error);
      throw error;
    }
  };

  const shared = { todos, getTodos, createTodo, removeTodo, changeTodo };

  return (
    <TodosContext.Provider value={shared}>{children}</TodosContext.Provider>
  );
};

export default TodosContext;

export { Provider };
