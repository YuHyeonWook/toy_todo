import "./css/TodoEditor.css";
import React, { useState, useRef, useContext } from "react";
import { TodoContext } from "../App";

const TodoEditor = () => {
  const { onCreate } = useContext(TodoContext);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (!content) {
      // 내용을 입력안하면 focus
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="TodoEditor">
      <h3> 새로운 할일 작성하기</h3>
      <div className="editor_wrapper">
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="새로운 할일...."
        />
        <button onClick={onSubmit}>+</button>
      </div>
    </div>
  );
};

export default TodoEditor;
