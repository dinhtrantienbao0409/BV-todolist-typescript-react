import { styled } from "styled-components";
import { Status } from "../../constaints";
import React, { useState, useRef } from "react";

const TodoPopup = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  width: 30%;
`;

const StyledInput = styled.input`
  color: black;
  font-size: 1em;
  border: 1px solid #66ccff;
  border-radius: 2px;
  padding: 10px;
  outline: none;
`;

const StyledOption = styled.option`
  size: 1em;
  color: black;
  font-size: 1em;
  border: 1px solid #66ccff;
  border-radius: 2px;
  outline: none;
`;
const StyledSelect = styled.select`
  size: 1em;
  color: black;
  font-size: 1em;
  border: 1px solid #66ccff;
  border-radius: 2px
  width: 100%;
  padding: 10px;
  outline: none;
`;

const FormLabel = styled.label`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-content: start !important;
  margin-bottom: 8px;
  gap: 10px;
`;

const TodoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const DashedLine = styled.div`
  width: 100%;
  border-top: 1px dashed #000000;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: end;
  gap: 10px;
  margin: 1em 0;
`;

const StyledButton = styled.button<{ $primary?: boolean }>`
  background: ${(props) => (props.$primary ? "#66ccff" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#66ccff")};
  font-size: 1em;
  padding: 0.5em 1em;
  border: 1px solid #66ccff;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 13px;
  background-color: #66ccff;
  border: 1px solid #66ccff;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  &:hover {
    transform: scale(1.1);
  }
`;

export interface TodoData {
  id: string;
  title: string;
  status: string;
}

interface PopupProps {
  todoData: TodoData;
  open: boolean;
  onOpen: boolean;
  onSave: (body: TodoData) => any;
  onCancel: () => void;
}

export const Popup = (props: PopupProps) => {
  const { onSave, onCancel, todoData } = props;
  console.log("🚀 ~ file: Popup.tsx:117 ~ Popup ~ todoData:", todoData.id)

  const [updatedTodo, setUpdatedTodo] = useState({
    id: todoData.id,
    title: todoData.title,
    status: todoData.status,
  });

  const handleChangeTitle = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;

    setUpdatedTodo({ ...updatedTodo, title: target.value });
  };

  const handleChangeStatus = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setUpdatedTodo({ ...updatedTodo, status: target.value });
  };

  const handleSubmitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSave(updatedTodo);
  };


  return (
    <>
      {todoData && (
        <TodoPopup>
          <TodoForm onSubmit={handleSubmitForm}>
            <FormLabel>
              <h2>Update Todo</h2>
            </FormLabel>
            <DashedLine />
            <FormLabel>
              Title:
              <StyledInput
                key={todoData.id}
                defaultValue={todoData.title}
                // value={todoData.title}
                onChange={handleChangeTitle}
                // onChange={(e: any) => setUpdatedTodo({ ...updatedTodo, title: e.target.value })}
              />
            </FormLabel>
            <FormLabel>
              Status:
              <StyledSelect
                key={todoData.id}
                defaultValue={todoData.status}
                onChange={handleChangeStatus}
                // onChange={(e: any) => setUpdatedTodo({ ...updatedTodo, status: e.target.value })}
              >
                <StyledOption defaultValue={Status.PENDING}>
                  Pending
                </StyledOption>
                <StyledOption defaultValue={Status.IN_PROGRESS}>
                  In progress
                </StyledOption>
                <StyledOption defaultValue={Status.DONE}>Done</StyledOption>
              </StyledSelect>
            </FormLabel>
            <ButtonContainer>
              <StyledButton $primary type="submit">
                Save
              </StyledButton>
              <StyledButton onClick={onCancel}>Cancel</StyledButton>
            </ButtonContainer>
          </TodoForm>

          <CloseButton onClick={onCancel}>X</CloseButton>
        </TodoPopup>
      )}
    </>
  );
};
