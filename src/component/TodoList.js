import { useState } from "react";
import TodoItem from "./TodoItem";
import "./css/TodoList.css";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  /*
   * 목록 검식 함수
   */
  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((el) =>
          el.content.toLowerCase().includes(search.toLowerCase())
        );
  };

  return (
    <div className="TodoList">
      <h4>목록 {`${"갯수"}`}</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력하세요"
      />
      <div className="list_wrapper">
        {getSearchResult().map((el) => (
          <TodoItem
            key={el.id}
            {...el}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
