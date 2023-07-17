import { styled } from "styled-components";
import { Status } from "../../constaints";


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

const StyledInput = styled.input.attrs((props) => ({
  // type: "text",
  // $size: "1em",
}))`
  color: black;
  font-size: 1em;
  border: 1px solid #66ccff;
  border-radius: 2px;
  padding: 10px;
  outline: none;
`;

const StyledOption = styled.option.attrs((props) => ({}))`
  size: 1em;
  color: black;
  font-size: 1em;
  border: 1px solid #66ccff;
  border-radius: 2px;
  outline: none;
`;
const StyledSelect = styled.select.attrs((props) => ({}))`
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

interface TodoData {
  id: string;
  title: string;
  status: string;
}

interface PopupProps {
  todoData: TodoData;
  open: boolean;
  onOpen: boolean;
  onSave: () => void;
  onCancel: () => void;
  // onDelete: () => void;
}

export const Popup = (props: PopupProps) => {
  const {onSave, onCancel, todoData} = props;
  return (
    <>
    {
      todoData && (
        <TodoPopup>
        <TodoForm>
          <>
            <FormLabel>
              <h2>Update Todo</h2>
            </FormLabel>
            <DashedLine />
            <FormLabel>
              Title:
              <StyledInput value={todoData.title}/>
            </FormLabel>
            <FormLabel>
              Status:
              <StyledSelect defaultValue={todoData.status}>
                <StyledOption value={Status["PENDING"]}>Pending</StyledOption>
                <StyledOption value={Status["IN_PROGRESS"]}>
                  In Progress
                </StyledOption>
                <StyledOption value={Status["DONE"]}>Done</StyledOption>
              </StyledSelect>
            </FormLabel>
          </>
        </TodoForm>
        <ButtonContainer>
              <StyledButton $primary >
                Save
              </StyledButton>
              <StyledButton onClick={onCancel} >Cancel</StyledButton>
            </ButtonContainer>
        <CloseButton onClick={onCancel} >X</CloseButton>
      </TodoPopup>
      )
    }
      
    </>
  );
};
