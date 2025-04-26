import React from "react";

const TodoList = ({ todos }) => {
    return (
        <ul>
            {
                todos.map((todo) => {
                    const { id, title, completed } = todo;
                    return <li key={id}>
                        {title} -
                        {completed ? 'Completed' : 'Not Completed'}
                        {/* {completed && 'Completed'} */}
                        {/* {completed || 'Not Completed'} */}
                    </li>;
                })
            }
        </ul>
    );
};


const AppTodo = () => {

    const todos = [
        { id: 1, title: 'Learn React', completed: true },
        { id: 2, title: 'Build an app', completed: false },
        { id: 3, title: 'Deploy the app', completed: false },
    ];

    return (
        <main>
            <h1>Todo List</h1>
            <TodoList todos={todos} />
        </main>
    );
};

export default AppTodo;