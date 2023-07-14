import React, { useState } from "react";
import { styled } from "styled-components";
import { useCreateTodoMutation } from "../../services/todos";
import { v4 } from "uuid";
import { Status } from "../../constaints";

const StyledAddField = styled.div.attrs(() => ({}))`
  position: relative;
  width: 100%;
`;
const StyledInput = styled.input.attrs((props) => ({
  type: "text",
}))`
  color: black;
  font-size: 1em;
  border: 2px solid #bf4f74;
  border-radius: 5px;
  padding: 30px 0;
  width: 100%;
  outline: none;
`;

const StyledButton = styled.button<{ $primary?: boolean }>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.$primary ? "#BF4F74" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#BF4F74")};

  font-size: 1em;
  right: 0;
  top: 0;
  margin-right: -2px;
  padding: 30px 20px;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  position: absolute;
`;

export const AddField = () => {
  const [todo, setTodo] = useState("");

  const [addTodo] = useCreateTodoMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTodo({ id: v4(), title: todo, status: Status.PENDING });
    setTodo("");
  };

  return (
    <>
      <StyledAddField className="add-component">
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <StyledInput
            value={todo}
            onChange={(e: any) => setTodo(e.target.value)}
            placeholder="Create new task..."
          />
          <StyledButton type="submit" $primary>
            +
          </StyledButton>
        </form>
      </StyledAddField>
    </>
  );
};
