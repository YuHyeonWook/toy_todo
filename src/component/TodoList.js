import { useMemo, useState } from "react";
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

  const analyzeTodo = useMemo(() => {
    console.log("analy 함수 호출");
    const totalCount = todo.length;
    const doneCount = todo.filter((el) => el.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);

  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  return (
    <div className="TodoList">
      <h4>목록 {totalCount}</h4>
      <h4>완료된 할일: {doneCount}</h4>
      <h4>아직 완료하지 못한 한 일: {notDoneCount}</h4>
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
