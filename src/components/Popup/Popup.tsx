import { styled } from "styled-components";
import { Status } from "../../constaints";

interface PopupProps {
  popupType: string;
  open: boolean;
  onOpen: boolean;
  onSave: () => void;
  onCancel: () => void;
  // onDelete: () => void;
}
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
  border: 1px solid #bf4f74;
  border-radius: 2px;
  padding: 10px;
  outline: none;
`;

const StyledOption = styled.option.attrs((props) => ({}))`
  size: 1em;
  color: black;
  font-size: 1em;
  border: 1px solid #bf4f74;
  border-radius: 2px;
  outline: none;
`;
const StyledSelect = styled.select.attrs((props) => ({}))`
  size: 1em;
  color: black;
  font-size: 1em;
  border: 1px solid #bf4f74;
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
  background: ${(props) => (props.$primary ? "#BF4F74" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#BF4F74")};
  font-size: 1em;
  padding: 0.5em 1em;
  border: 1px solid #bf4f74;
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
  background-color: #bf4f74;
  border: 1px solid #bf4f74;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  &:hover {
    transform: scale(1.1);
  }
`;

// const RadioGroup = styled.div`;
//   display: flex;
//   flex-direction: row;
// `;
// const DropdownSelect = styled.select`
//   margin-bottom: 8px;
//   padding: 4px;
// `;

export const Popup: React.FC<PopupProps> = (onCancel) => {
  return (
    <>
      <TodoPopup>
        <TodoForm>
          {/* {popupType.popupType && popupType.popupType == "update" ? ( */}
          <>
            {/* <RadioGroup>
              <FormLabel>
                <input type="radio" value="option1" />
                {Status["PENDING"]}
              </FormLabel>

              <FormLabel>
                <input type="radio" value="option2" />
                {Status["IN_PROGRESS"]}
              </FormLabel>

              <FormLabel>
                <input type="radio" value="option3" />
                {Status["DONE"]}
              </FormLabel>
            </RadioGroup> */}
            <FormLabel>
              <h2>Update Todo</h2>
            </FormLabel>
            <DashedLine />
            <FormLabel>
              Title:
              <StyledInput />
            </FormLabel>
            <FormLabel>
              Status:
              <StyledSelect>
                <StyledOption value={Status["PENDING"]}>Pending</StyledOption>
                <StyledOption value={Status["IN_PROGRESS"]}>
                  In Progress
                </StyledOption>
                <StyledOption value={Status["DONE"]}>Done</StyledOption>
              </StyledSelect>
            </FormLabel>
            <ButtonContainer>
              <StyledButton $primary type="submit">
                Save
              </StyledButton>
              <StyledButton type="button">Cancel</StyledButton>
            </ButtonContainer>
          </>
          {/* ) : ( */}
          {/* <>
              <h3>Are you sure to delete this todo?</h3>
              <div>
                <button type="submit">Delete</button>
                <button type="button">Cancel</button>
              </div>
            </>
          )} */}
        </TodoForm>
        <CloseButton>X</CloseButton>
      </TodoPopup>
    </>
  );
};
