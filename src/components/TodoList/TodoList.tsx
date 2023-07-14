import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Popup } from "../Popup/Popup";
import {
  useGetAllTodosQuery,
  useDeleteTodoMutation,
} from "../../services/todos";
import { LoadingComponent } from "../Loading/Loading";

interface TodoItemProps {
  // text: string;
  // status: string;
  // checked: boolean;
  //   onUpdate: () => void;
  //   onDelete: () => void;
}
const TodoHeader = styled.li`
  display: flex;
  align-tiem: center;
  padding: 20px;
  background-color: #aba6a6;
  border-radius: 2px;
  border-bottom: 1px solid #bf4f74;
  width: 100%;
`;

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
  display: flex;
  padding-left: 20px;
  align-content: start;
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
  &:hover {
    background-color: lightgray;
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
  opacity: 0.2;
  z-index: 0.5;
`;

export const TodoList: React.FC<TodoItemProps> = (
  {
    // text,
    // status,
    // checked,
    //   onUpdate,
    //   onDelete,
  }
) => {
  const [visible, setVisible] = useState(false);
  console.log("🚀 ~ file: TodoList.tsx:85 ~ visible:", visible);
  const [popupType, setPopupType] = useState("");
  console.log("🚀 ~ file: TodoList.tsx:85 ~ popupType:", popupType);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { data, error, isLoading } = useGetAllTodosQuery();
  const [deteleTodo, res] = useDeleteTodoMutation();

  const handleOpenPopup = (e: any) => {
    setVisible(true);
    setPopupType(e.target.value);
  };

  const handleConfirmUpdate = () => {
    // onUpdate();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleConfirmDelete = (id: any) => {
    deteleTodo(id);
  };

  // const handleCheck = (e: any) => {
  //   const { id, checked } = e.target;
  //   setIsCheck([...isCheck, id]);
  //   if (!checked) {
  //     setIsCheck(isCheck.filter(item => item !== id));
  //   }
  // }

  useEffect(() => {}, []);
  return (
    <>
      {isLoading && <LoadingComponent />}
      {data && (
        <TodoHeader>
          <span>
            <input type="checkbox" />
          </span>
          <span style={{ flexGrow: 1 }}>Total: {data.length}</span>
          <button>Delete Selections</button>
        </TodoHeader>
      )}

      {data &&
        data.map((todo: any) => (
          <>
            <TodoItemContainerHover key={todo.id}>
              <TodoCheckbox
                type="checkbox"
                id={todo.id}
                // checked={}
                // onClick={}
              />
              <TodoText>{todo.title}</TodoText>
              {/* <TodoButton onClick={onToggle}>{status ? "Undo" : "Complete"}</TodoButton> */}
              <TodoStatus>{todo.status}</TodoStatus>
              <TodoButton onClick={handleOpenPopup}>Update</TodoButton>
              <TodoButton onClick={() => handleConfirmDelete(todo.id)}>
                Delete
              </TodoButton>
              {/* <TodoButton
                value="update"
                onClick={(e: any) => handleOpenPopup(e)}
              >
                Update
              </TodoButton>
              <TodoButton
                value="delete"
                onClick={(e: any) => handleOpenPopup(e)}
              >
                Delete
              </TodoButton> */}
            </TodoItemContainerHover>
          </>
        ))}
      {visible && (
        <>
          <BackgroundOverlay />
          <Popup
            popupType={popupType}
            open={visible}
            onOpen={visible}
            onSave={() => handleConfirmUpdate()}
            // onDelete={() => handleConfirmDelete(todo.id)}
            onCancel={handleCancel}
          />
        </>
      )}
    </>
  );
};
