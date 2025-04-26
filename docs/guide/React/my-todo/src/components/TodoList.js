
import '../App.css'
import TodoShow from './TodoShow'

const TodoList = ({ todos, setTodos, removeTodos, changeTodos }) => {
    return (
        <div>
            <div className="todo-list">
                <ul className='todo-list-ul'>
                    {todos.map((todo) => (
                        <TodoShow
                            key={todo.id}
                            todo={todo}
                            removeTodos={removeTodos}
                            changeTodos={changeTodos}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default TodoList;