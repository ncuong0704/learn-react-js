import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onClickTodo: PropTypes.func,
};

function TodoList({todoList = [], onClickTodo = null}) {
    const handleClickTodo = (id)=>{
        if(onClickTodo){
            onClickTodo(id)
        }
    }
    return (
       <ul>
        {todoList.map(todo=>(
            <li key={todo.id} onClick={()=>handleClickTodo(todo.id)}>{todo.title}</li>
        ))}
       </ul>
    );
}

export default TodoList;