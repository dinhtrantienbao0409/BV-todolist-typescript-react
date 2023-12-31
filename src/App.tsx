import React from "react";
import "./App.css";
import { AddField } from "./components/AddField/AddField";
import { TodoList } from "./components/TodoList/TodoList";
import { styled } from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 300px) {
    width: 100%;
  }
`;

const TodoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin-top: 70px;
  @media screen and (max-width: 760px) {
    width: 80%;
  }
  @media screen and (max-width: 1130px) {
    width: 90%;
  }
`;
const TodoUl = styled.ul`
  width: 100%;
  padding: 0;
  @media screen and (max-width: 626px) {
    box-sizing: border-box;
  }
`;
export const App: React.FC = () => {
  return (
    <AppContainer className="App">
      <TodoContainer className="todo-container">
        <TodoUl aria-label="todo list">
          <TodoList />
        </TodoUl>
      </TodoContainer>
    </AppContainer>
  );
};
