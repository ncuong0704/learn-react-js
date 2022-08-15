import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import "./style.scss";
import classNames from "classnames";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onClickTodo: PropTypes.func,
};

function TodoList({ todoList = [], onClickTodo }) {
    const handleClickTodo = (id)=>{
        if(onClickTodo){
            onClickTodo(id)
        }
    }
  return (
    <Box component="ul">
      {todoList.map((todo) => (
        <li
          className={classNames({
            completed: todo.status === "completed",
            new: todo.status === "new"
          })}
          key={todo.id}
          onClick={()=>handleClickTodo(todo.id)}
        >
          {todo.title}
        </li>
      ))}
    </Box>
  );
}

export default TodoList;
