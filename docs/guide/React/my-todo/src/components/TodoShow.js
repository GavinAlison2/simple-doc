import React from 'react';
import EditIcon from '../asserts/edit.svg';
import DeleteIcon from '../asserts/delete.svg';
import TodoEdit from './TodoEdit';

const TodoShow = ({ todo, setTodos, removeTodos, changeTodos }) => {
    const [showEdit, setShowEdit] = React.useState(false);

    const handleEdit = (e) => {
        setShowEdit(true);
    };

    const handleDelete = (e) => {
        removeTodos(todo.id);
    };
    const handleSubmit = (id, title) => {
        changeTodos(id, title);
        setShowEdit(false);
    };

    if (showEdit) {
        return (
            <TodoEdit todo={todo} handleSubmit={handleSubmit} />
        )
    }

    return (
        <li key={todo.id} className='todo-list-li'>
            <div className='todo-item'  >
                <span>{todo.id}</span>
                <span>{todo.text}</span>
                <span>{todo.name}</span>
                <span className='date_field'>{todo.create_time}</span>
                <span>{todo.create_by}</span>
                <span>{todo.done ? 'true' : 'false'}</span>

                <div className='' style={{ width: '120px' }}>
                    <button onClick={handleEdit}>
                        <img src={EditIcon} title="Edit" alt="edit" />
                    </button>
                    <button onClick={handleDelete}>
                        <img src={DeleteIcon} title="Delete" alt="delete" />
                    </button>
                    <div style={{ display: 'inline-flex', marginLeft: '10px' }}>
                        <input type='checkbox' checked={todo.done} onChange={() => changeTodos(todo.id, todo.title, !todo.done)} />
                    </div>
                </div>
            </div>
        </li>
    );
};
export default TodoShow;
