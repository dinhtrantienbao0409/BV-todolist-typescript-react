import { useState } from "react";
import { styled } from "styled-components";
import { Popup } from "../Popup/Popup";

interface TodoItemProps {
  text: string;
  status: string;
  checked: boolean;
  //   onUpdate: () => void;
  //   onDelete: () => void;
}

const TodoItemContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 2px;
  border-bottom: 1px solid #bf4f74;
  width: 100%;
`;

const TodoText = styled.span`
  flex-grow: 1;
`;
const TodoStatus = styled.span`
  border-radius: 4px;
`;

const TodoButton = styled.button`
  margin-left: 8px;
  visibility: hidden;
`;

const TodoItemContainerHover = styled(TodoItemContainer)`
  &:hover ${TodoButton} {
    visibility: visible;
  }
`;
const TodoCheckbox = styled.input`
  margin-right: 8px;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0.5;
`;

export const TodoList: React.FC<TodoItemProps> = ({
  text,
  status,
  checked,
  //   onUpdate,
  //   onDelete,
}) => {
  const [visible, setVisible] = useState(false);
  console.log("🚀 ~ file: TodoList.tsx:51 ~ visible:", visible);

  const handleOpenPopup = () => {
    setVisible(true);
  };

  const handleConfirmUpdate = () => {
    // onUpdate();
    setVisible(false);
  };

  const handleCancelUpdate = () => {
    setVisible(false);
  };
  return (
    <>
      <TodoItemContainerHover>
        <TodoCheckbox type="checkbox" />
        <TodoText>{text}</TodoText>
        {/* <TodoButton onClick={onToggle}>{status ? "Undo" : "Complete"}</TodoButton> */}
        <TodoStatus>{status}</TodoStatus>
        <TodoButton onClick={handleOpenPopup}>Update</TodoButton>
        <TodoButton>Delete</TodoButton>
      </TodoItemContainerHover>
      {visible && (
        <>
          <BackgroundOverlay />
          <Popup
            open={visible}
            onOpen={visible}
            onSave={() => handleConfirmUpdate}
            onCancel={() => handleCancelUpdate}
          />
        </>
      )}
    </>
  );
};
