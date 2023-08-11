import React, { useState } from "react";
import { styled } from "styled-components";
import { useCreateTodoMutation } from "../../services/todos";
import { v4 } from "uuid";
import { Status } from "../../constaints";
import { LoadingComponent } from "../Loading/Loading";
import { TodoData } from "../Popup/Popup";
import useFormInput from "../../hooks/useFormInput";

const StyledAddField = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media screen and (max-width: 626px) {
    width: 80%;
  }
`;

const StyledInput = styled.input`
  color: black;
  font-size: 1em;
  border: 2px solid rgba(255, 228, 225);
  border-radius: 5px;
  padding: 10px 10px;
  width: 100%;
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
  @media screen and (max-width: 626px) {
    padding: 10px 40px;
  }
`;
interface AddFieldProps {
  onCreate: (body: TodoData) => any;
}

export const AddField = ({ onCreate }: AddFieldProps) => {
  const todoTitle = useFormInput("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onCreate({
      id: v4(),
      title: todoTitle.defaultValue,
      status: Status.PENDING,
    });
  };

  return (
    <>
      <StyledAddField className="add-component">
        <form
          style={{ width: "100%" }}
          id="create"
          role="create"
          action="/create/"
          onSubmit={handleSubmit}
        >
          <StyledInput
            {...todoTitle}
            type="create"
            id="create-input"
            name="create"
            spellCheck="false"
            placeholder="Create new task..."
            tabIndex={0}
          />
          <StyledButton
            type="submit"
            role="button"
            aria-label="create"
            id="createBtn"
          >
            +
          </StyledButton>
        </form>
      </StyledAddField>
    </>
  );
};
