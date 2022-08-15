import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

AddAndDeleteTodoFeature.propTypes = {};

function AddAndDeleteTodoFeature(props) {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "Code",
    },
    {
      id: 2,
      title: "Sleep",
    },
    {
      id: 3,
      title: "Eat",
    },
  ]);
  const handleClickTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };
  const handleSubmitForm = (value) => {
    const newTodo = {
      id: todoList.length + 1,
      title: value.title,
    };
    const newTodoList = [...todoList, newTodo]
    setTodoList(newTodoList);
  };
  return (
    <div>
      <TodoForm onSubmit={handleSubmitForm} />
      <TodoList todoList={todoList} onClickTodo={handleClickTodo} />
    </div>
  );
}

export default AddAndDeleteTodoFeature;
