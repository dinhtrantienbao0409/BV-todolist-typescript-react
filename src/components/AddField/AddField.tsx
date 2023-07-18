import React, { useState } from "react";
import { styled } from "styled-components";
import { useCreateTodoMutation } from "../../services/todos";
import { v4 } from "uuid";
import { Status } from "../../constaints";
import { LoadingComponent } from "../Loading/Loading";
import { TodoData } from "../Popup/Popup";

const StyledAddField = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  color: black;
  font-size: 1em;
  border: 2px solid rgba(255, 228, 225);
  border-radius: 5px;
  padding: 10px 10px;
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
  padding: 10px 80px;
  border: 2px solid rgba(255, 228, 225);
  border-radius: 3px;
  position: absolute;
  cursor: pointer;
`;
interface AddFieldProps {
  onCreate: (body: TodoData) => any;
}

export const AddField = ({ onCreate }: AddFieldProps) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleChangeTitle = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setTodoTitle(target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onCreate({ id: v4(), title: todoTitle, status: Status.PENDING });
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
          />
          <StyledButton type="submit">+</StyledButton>
        </form>
      </StyledAddField>
    </>
  );
};
