import { useEffect, useMemo, useState } from "react";
import TodoList from "./components/TodoList";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState(() => [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "code",
      status: "new",
    },
  ]);

  const [filter, setFilter] = useState(() => {
    const urlParam = queryString.parse(location.search);
    return urlParam.status || "all";
  });

  const handleClickTodo = (id) => {
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex((todo) => todo.id === id);
    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === "new" ? "completed" : "new",
    };
    setTodoList(newTodoList);
  };

  useEffect(() => {
    const urlParam = queryString.parse(location.search);
    if (urlParam.status) {
      setFilter(urlParam.status);
    }
  }, [location.search]);

  const handleClickAll = () => {
    const urlParam = {
      status: "all",
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(urlParam),
    });
  };
  const handleClickNew = () => {
    const urlParam = {
      status: "new",
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(urlParam),
    });
  };
  const handleClickCompleted = () => {
    const urlParam = {
      status: "completed",
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(urlParam),
    });
  };

  const renderTodoList = useMemo(
    () => todoList.filter((todo) => todo.status === filter || filter === "all"),
    [filter, todoList]
  );
  return (
    <div>
      <div>{filter}</div>
      <TodoList todoList={renderTodoList} onClickTodo={handleClickTodo} />
      <button onClick={handleClickAll}>All</button>
      <button onClick={handleClickNew}>New</button>
      <button onClick={handleClickCompleted}>Completed</button>
    </div>
  );
}

export default TodoFeature;
