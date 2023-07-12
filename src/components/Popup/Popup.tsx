import { styled } from "styled-components";
import { Status } from "../../constaints";

interface PopupProps {
  open: boolean;
  onOpen: boolean;
  onSave: () => void;
  onCancel: () => void;
}
const TodoPopup = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const TodoForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Popup: React.FC<PopupProps> = () => {
  return (
    <>
      <TodoPopup>
        <TodoForm>
          <RadioGroup>
            <FormLabel>
              <input type="radio" value="option1" />
              {Status["TODO"]}
            </FormLabel>

            <FormLabel>
              <input type="radio" value="option2" />
              {Status["IN_PROGRESS"]}
            </FormLabel>

            <FormLabel>
              <input type="radio" value="option3" />
              {Status["DONE"]}
            </FormLabel>
          </RadioGroup>
          <FormLabel>
            Input Text:
            <input type="text" />
          </FormLabel>

          <div>
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
          </div>
        </TodoForm>
      </TodoPopup>
    </>
  );
};
