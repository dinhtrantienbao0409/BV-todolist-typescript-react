import React from "react";
import "./App.css";
import { AddField } from "./components/AddField/AddField";
import { TodoList } from "./components/TodoList/TodoList";
import { styled } from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;
const TodoUl = styled.ul`
  width: 100%;
  padding: 0;
`;
export const App: React.FC = () => {
  return (
    <AppContainer className="App">
      <TodoContainer>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        > */}
        <AddField />
        <TodoUl>
          <TodoList
          // key={todo.id}
          // text={todo.text}
          // status={todo.status}
          // checked={todo.checked}
          // onUpdate={() => handleUpdate(todo.id)}
          // onDelete={() => handleDelete(todo.id)}
          />
        </TodoUl>
        {/* </div> */}
      </TodoContainer>
    </AppContainer>
  );
};
