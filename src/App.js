import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

import React, { useRef, useReducer, useCallback, useMemo } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((el) =>
        el.id === action.targetId
          ? {
              ...el,
              isDone: !el.isDone,
            }
          : el
      );
    }
    case "DELETE": {
      return state.filter((el) => el.id !== action.targetId);
    }
    default:
      return state;
  }
}
export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

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

  const [todo, dispatch] = useReducer(reducer, MockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  // todolist 체크박스
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    const confirmDelete = window.confirm("삭제하겠습니까?");
    if (confirmDelete) {
      dispatch({
        type: "DELETE",
        targetId,
      });
    }
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);
  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={{ todo }}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
      <div>footer</div>
    </div>
  );
}
export default App;
