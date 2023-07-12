import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AddField } from "./components/AddField/AddField";
import { TodoList } from "./components/TodoList/TodoList";

import { ApiProvider } from "@reduxjs/toolkit/query/react";

export const App: React.FC = () => {
  const todos = [
    { id: 1, text: "Learn React", status: "todo", checked: false },
    { id: 2, text: "Build a todo app", status: "inprogress", checked: false },
    { id: 3, text: "Deploy to production", status: "done", checked: false },
  ];

  return (
    <div className="App">
      <div
        className="todo-component"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <AddField />
          <ul>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "2px",
                borderBottom: "1px solid #bf4f74",
                width: "100%",
              }}
            >
              <span>
                <input type="checkbox" />
              </span>
              <span style={{ flexGrow: 1.3 }}>Task Name</span>
              <span style={{ flexGrow: 0.1 }}>Status</span>
              <span style={{ flexGrow: 0.1 }}>Action</span>
            </li>
            {todos.map((todo) => (
              <TodoList
                key={todo.id}
                text={todo.text}
                status={todo.status}
                checked={todo.checked}
                // onUpdate={() => handleUpdate(todo.id)}
                // onDelete={() => handleDelete(todo.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
