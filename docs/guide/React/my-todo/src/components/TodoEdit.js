import React from "react";
import { useState } from "react";

const TodoEdit = ({ todo, handleSubmit }) => {
    const [text, setText] = useState(todo.text);

    const handleEdit = (e) => {
        e.preventDefault();
        handleSubmit(todo.id, text, todo.done);
    };

    return (
        <form onSubmit={handleEdit} className="todo-edit-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Edit</button>
        </form>
    );
};
export default TodoEdit;