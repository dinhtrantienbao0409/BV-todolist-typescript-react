import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Popup, TodoData } from "../Popup/Popup";
import {
  useGetAllTodosQuery,
  useDeleteTodoMutation,
  useLazyGetTodoByIdQuery,
  useUpdateTodoMutation,
  useCreateTodoMutation,
} from "../../services/todos";
import { LoadingComponent } from "../Loading/Loading";
import { AddField } from "../AddField/AddField";

interface IChecked {
  id: string;
}

type ColorStatusType = {
  Pending: string;
  ["In progress"]: string;
  Done: string;
};

const colorStatusOpts: ColorStatusType = {
  Pending: "#BAE6FD",
  ["In progress"]: "#FEF9C3",
  Done: "#BBF7D0",
};

const colorStatusDot: ColorStatusType = {
  Pending: "#0000CC",
  ["In progress"]: "#FFD700",
  Done: "#2E8B57",
};
const TodoHeader = styled.li`
  display: flex;
  align-tiem: center;
  padding: 20px 0px;
  color: #333;
  background-color: rgba(255, 228, 225);
  border-radius: 2px;
  border-bottom: 1px solid white;
  width: 100%;
`;

const TodoItemContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 20px 0;
  color: #333;
  background-color: white;
  border-radius: 2px;
  border: none;
  width: 100%;
`;

const TodoText = styled.span<{ $textDecorationLine?: boolean }>`
  flex-grow: 1;
  display: flex;
  padding-left: 20px;
  align-content: start;
  font-weight: bold;
  text-decoration-line: ${(props) =>
    props.$textDecorationLine ? "line-through" : "none"};
  color: ${(props) => (props.$textDecorationLine ? "#9CA3AF" : "#484B6A")};
`;

const TodoStatus = styled.span<{ color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  background-color: ${(props) => props.color || "white"};
  padding: 4px 8px;
  font-size: 13px;
  color: black;
  font-weight: bold;
  margin-right: 50px;
`;

const TodoButton = styled.button<{ $color?: boolean }>`
  margin: 0 10px 0 0;
  padding: 5px 10px;
  visibility: hidden;
  cursor: pointer;
  font-weight: bold;
  border: none;
  background-color: rgba(253, 245, 230);
  &:hover {
    color: ${(props) => (props.$color ? "green" : "red")};
  }
`;

const TodoItemContainerHover = styled(TodoItemContainer)`
  &:hover ${TodoButton} {
    visibility: visible;
  }
  &:hover {
    background-color: rgba(253, 245, 230);
  }
`;

const TodoCheckbox = styled.input`
  margin: 0 15px;
  outline: none;
`;

const DeleteAllButton = styled.button`
  margin: 0 15px;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  background-color: #66ccff;
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
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

export const TodoList = () => {
  const [visible, setVisible] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkedList, setIsCheck] = useState<IChecked[]>([]);

  const { data: todosData, error, isLoading } = useGetAllTodosQuery();
  const [
    trigger,
    { data: todoData, error: errTodoData, isLoading: isLoadingTodoData },
  ] = useLazyGetTodoByIdQuery();
  const [addTodo, { isLoading: CreateLoading, isError, isSuccess }] =
    useCreateTodoMutation();

  const [
    deteleTodo,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: delelteSuccess,
    },
  ] = useDeleteTodoMutation();
  const [updateTodo, updateRes] = useUpdateTodoMutation();

  const handleOpenPopup = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLButtonElement;
    setVisible(true);
  };

  const handleConfirmUpdate = (updatedData: TodoData) => {
    updateTodo(updatedData);

    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleConfirmDelete = (id: any) => {
    deteleTodo(id);
  };

  const handleCheck = (e: any) => {
    const { id, checked } = e.target;
    setIsCheck([...checkedList, id]);
    if (!checked) {
      setIsCheck(checkedList.filter((item) => item !== id));
    }
  };

  const handleCheckAll = (e: any) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(todosData.map((todo: any) => todo.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      {isLoading && <LoadingComponent />}
      {todosData && (
        <TodoHeader>
          <span>
            <TodoCheckbox
              type="checkbox"
              onClick={handleCheckAll}
              checked={isCheckAll}
              onChange={() => {}}
            />
          </span>
          <span style={{ flexGrow: 1 }}>Total: {todosData.length}</span>
          <DeleteAllButton
            onClick={() => {
              checkedList.map((checkedItem) => {
                handleConfirmDelete(checkedItem);
              });
            }}
          >
            Delete Selections
          </DeleteAllButton>
        </TodoHeader>
      )}
      {todosData &&
        todosData.map((todo: any) => (
          <TodoItemContainerHover key={todo.id}>
            <TodoCheckbox
              type="checkbox"
              id={todo.id}
              onClick={handleCheck}
              checked={checkedList.includes(todo.id)}
              onChange={() => {}}
            />
            {todo.status === "Done" ? (
              <TodoText $textDecorationLine>{todo.title}</TodoText>
            ) : (
              <TodoText>{todo.title}</TodoText>
            )}
            <TodoStatus
              color={colorStatusOpts[todo.status as keyof ColorStatusType]}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-yellow-500 text-sm font-extralight"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                color={colorStatusDot[todo.status as keyof ColorStatusType]}
              >
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
              </svg>
              {todo.status}
            </TodoStatus>
            <TodoButton
              $color
              onClick={(event: React.SyntheticEvent) => {
                trigger(todo.id);
                handleOpenPopup(event);
              }}
            >
              Update
            </TodoButton>
            <TodoButton
              onClick={() => handleConfirmDelete(todo.id)}
              disabled={deleteLoading}
            >
              Delete
            </TodoButton>
          </TodoItemContainerHover>
        ))}
      {visible && todoData && (
        <>
          <BackgroundOverlay onClick={handleCancel} />
          <Popup
            todoData={todoData}
            open={visible}
            onOpen={visible}
            onSave={handleConfirmUpdate}
            onCancel={handleCancel}
          />
        </>
      )}
    </>
  );
};
