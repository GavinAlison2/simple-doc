import React from 'react';
import { useState } from 'react';

const TodoCreate = ({ createTodo }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="输入待办事项"
            />
            <button type="submit">添加</button>
        </form>
    );
};

export default TodoCreate;