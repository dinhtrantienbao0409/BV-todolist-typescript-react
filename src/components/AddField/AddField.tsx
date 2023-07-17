import React, { useState } from "react";
import { styled } from "styled-components";
import { useCreateTodoMutation } from "../../services/todos";
import { v4 } from "uuid";
import { Status } from "../../constaints";
import { LoadingComponent } from "../Loading/Loading";

const StyledAddField = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  color: black;
  font-size: 1em;
  border: 2px solid rgba(255, 228, 225);
  border-radius: 5px;
  padding: 30px 10px;
  width: 100%;
  outline: none;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background: rgba(255, 228, 225);
  color: white;
  font-size: 1em;
  right: 0;
  top: 0;
  margin-right: -2px;
  padding: 30px 20px;
  border: 2px solid rgba(255, 228, 225);
  border-radius: 3px;
  position: absolute;
`;
interface AddFieldProps {
  loading: boolean;
}

export const AddField = () => {
  const [todoTitle, setTodoTitle] = useState("");

  const [addTodo, { isLoading: createLoading, isError, isSuccess }] =
    useCreateTodoMutation();

  const handleChangeTitle = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setTodoTitle(target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addTodo({ id: v4(), title: todoTitle, status: Status.PENDING });
    setTodoTitle("");
    // setIsLoading(true);
  };

  return (
    <>
      <StyledAddField className="add-component">
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <StyledInput
            value={todoTitle}
            onChange={handleChangeTitle}
            placeholder="Create new task..."
            disabled={createLoading}
          />
          <StyledButton type="submit">+</StyledButton>
        </form>
      </StyledAddField>
    </>
  );
};
