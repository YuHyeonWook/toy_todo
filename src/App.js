import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

import React, { useState, useRef } from "react";

function App() {
  const MockData = [
    {
      id: 0,
      isDone: false,
      content: "React 공부하기",
      createdDate: new Date().getTime(),
    },
    {
      id: 1,
      isDone: false,
      content: "js 공부하기",
      createdDate: new Date().getTime(),
    },
    {
      id: 2,
      isDone: false,
      content: "vvvvv",
      createdDate: new Date().getTime(),
    },
  ];

  const [todo, setTodo] = useState(MockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  // todolist 체크박스
  const onUpdate = (targetId) => {
    setTodo(
      todo.map((el) =>
        el.id === targetId ? { ...el, isDone: !el.isDone } : el
      )
    );
  };

  const onDelete = (targetId) => {
    setTodo(todo.filter((el) => el.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      <div>footer</div>
    </div>
  );
}
export default App;
