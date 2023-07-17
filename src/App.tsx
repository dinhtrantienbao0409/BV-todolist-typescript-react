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
  margin-top: 70px;
  @media screen and (min-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 992px) {
    .column {
      width: 50%;
    }
  }
`;
const TodoUl = styled.ul`
  width: 100%;
  padding: 0;
`;
export const App: React.FC = () => {
  return (
    <AppContainer className="App">
      <TodoContainer>
        <AddField />
        <TodoUl>
          <TodoList />
        </TodoUl>
      </TodoContainer>
    </AppContainer>
  );
};
