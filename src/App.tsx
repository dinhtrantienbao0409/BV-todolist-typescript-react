import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AddField } from "./components/AddField/AddField";
import { TodoList } from "./components/TodoList/TodoList";
import { Popup } from "./components/Popup/Popup";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="todo-component"></div>
      <AddField />
      <TodoList />
      <Popup />
    </div>
  );
}

export default App;
