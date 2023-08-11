import { useEffect, useState, useContext } from "react";
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
import { ReactComponent as Dot } from "../../assets/statusDot.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { ReactComponent as UpdateIcon } from "../../assets/updateIcon.svg";
import { Status, filterListName } from "../../constaints";
import { Alert } from "../Alert/Alert";

interface Todo {
  id: string;
  title: string;
  status: "Pending" | "In progress" | "Done";
}

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
  align-items: center;
  padding: 20px 0px;
  color: #333;
  background-color: rgba(255, 228, 225);
  border-radius: 2px;
  width: 100%;
  @media screen and (max-width: 626px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }
`;

const TodoItemContainer = styled(TodoHeader)`
  background-color: white;
  border-bottom: 1px solid rgba(255, 228, 225);
  @media screen and (max-width: 626px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 0;
  }
  outline: none;
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
  @media (max-width: 900px) {
    font-size: 11px; /* Reduce font size for smaller screens */
  }

  @media (max-width: 400px) {
    font-size: 9px; /* Further reduce font size for even smaller screens */
  }
`;

const TodoButton = styled.button<{ $color?: boolean; $type?: boolean }>`
  margin: 0 10px 0 0;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  background: none;
  outline: none;
  height: 100%;
  &:hover {
    color: ${(props) => (props.$color ? "green" : "red")};
  }
`;

const UpdateButtonIcon = styled(UpdateIcon)`
  width: 25px;
  height: 25px;
  &:hover {
    transition: 0.2s;
    filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg)
      brightness(119%) contrast(119%);
  }
`;

const DeleteButtonIcon = styled(DeleteIcon)`
  width: 25px;
  height: 25px;
  &:hover {
    transition: 0.2s;
    filter: invert(48%) sepia(72%) saturate(6014%) hue-rotate(342deg)
      brightness(101%) contrast(100%);
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
    transition: 0.3s;
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

const MessageContainer = styled.span`
  margin: 20px 0;
`;

const FilterContainer = styled.span`
  @media screen and (max-width: 626px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  :focus {
    outline: 1px solid;
  }
`;

const FilterList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
`;

const FilterItem = styled.li``;

const StatusDot = styled(Dot)``;

export const TodoList = () => {
  const [visible, setVisible] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkedList, setIsCheck] = useState<IChecked[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<
    "All" | "Pending" | "In progress" | "Done"
  >("All");

  const {
    data: todosData,
    isLoading: fetchAllLoading,
    error: fetchAllError,
    isSuccess: fetchAllSuccess,
  } = useGetAllTodosQuery();

  const [
    trigger,
    {
      data: todoData,
      isLoading: fetchLoading,
      error: fetchError,
      isSuccess: fetchSuccess,
      isFetching,
    },
  ] = useLazyGetTodoByIdQuery();

  const [
    addTodo,
    {
      isLoading: createLoading,
      isError: createError,
      isSuccess: createSuccess,
    },
  ] = useCreateTodoMutation();

  const [
    deteleTodo,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: delelteSuccess,
    },
  ] = useDeleteTodoMutation();

  const [
    updateTodo,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateTodoMutation();

  const handleOpenPopup = (e: React.SyntheticEvent, id: any) => {
    trigger(id);
    setVisible(true);
  };

  const handleCreate = (createdData: TodoData) => {
    addTodo(createdData);
  };

  const handleConfirmUpdate = (updatedData: TodoData) => {
    updateTodo(updatedData);

    setVisible(false);
  };

  const handleConfirmDelete = (id: any) => {
    deteleTodo(id);
  };

  const handleCancel = () => {
    setVisible(false);
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

  const handleFilter = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLButtonElement;
    setFilter(target.value as Todo["status"]);
  };

  const FilterTodo = () => {
    switch (filter) {
      case "Pending":
        const pendingTodo = todoList.filter(
          (todo) => todo.status === Status.PENDING
        );
        return pendingTodo;
      case "In progress":
        const inProgressTodo = todoList.filter(
          (todo) => todo.status === Status.IN_PROGRESS
        );
        return inProgressTodo;
      case "Done":
        const doneTodo = todoList.filter((todo) => todo.status === Status.DONE);
        return doneTodo;
      default:
        return todoList;
    }
  };

  useEffect(() => {
    setTodoList(todosData);
  }, [todosData]);

  return (
    <>
      <AddField onCreate={handleCreate} />
      <MessageContainer>
        {createSuccess || delelteSuccess || updateSuccess ? (
          <Alert type="success" message="Successfully!" timeout={3000} />
        ) : createError || deleteError || updateError ? (
          <Alert type="error" message="Failed!" timeout={3000} />
        ) : null}
      </MessageContainer>
      {fetchAllLoading && <LoadingComponent />}
      {FilterTodo() && (
        <TodoHeader>
          <span>
            <TodoCheckbox
              type="checkbox"
              onClick={handleCheckAll}
              checked={isCheckAll}
              onChange={() => {}}
            />
          </span>
          <span>Total: {FilterTodo().length}</span>

          <span style={{ flexGrow: 1 }}>
            {fetchLoading || createLoading || deleteLoading || updateLoading ? (
              <LoadingComponent />
            ) : null}
          </span>

          <FilterContainer>
            <nav aria-label="Filter">
              {/* {filterListName &&
                filterListName.map((filterName) => (
                  <TodoButton
                    $type
                    onClick={handleFilter}
                    key={filterName.id}
                    value={filterName.filterName}
                  >
                    {filterName.filterName}
                  </TodoButton> */}
              <FilterList>
                {filterListName &&
                  filterListName.map((filterName) => (
                    <FilterItem>
                      <TodoButton
                        $type
                        onClick={handleFilter}
                        key={filterName.id}
                        value={filterName.filterName}
                      >
                        {filterName.filterName}
                      </TodoButton>
                    </FilterItem>
                  ))}
              </FilterList>
              {/* ))} */}
            </nav>
          </FilterContainer>
          {/* <span>
            <select id="filter" value={filter} onChange={handleFilter}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </span> */}
          <DeleteAllButton
            aria-disabled={`${isCheckAll ? "false" : "true"}`}
            // aria-disabled="true"
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
      {FilterTodo() &&
        FilterTodo().map((todo: any) => (
          <TodoItemContainerHover key={todo.id} aria-label={todo.title}>
            <TodoCheckbox
              type="checkbox"
              id={todo.id}
              onClick={handleCheck}
              checked={checkedList.includes(todo.id)}
              onChange={() => {}}
            />

            <TodoText $textDecorationLine={todo.status === "Done"}>
              {todo.title}
            </TodoText>

            <TodoStatus
              color={colorStatusOpts[todo.status as keyof ColorStatusType]}
            >
              <StatusDot />
              {todo.status}
            </TodoStatus>
            <TodoButton
              $color
              onClick={(e: React.SyntheticEvent) => handleOpenPopup(e, todo.id)}
            >
              <UpdateButtonIcon />
            </TodoButton>
            <TodoButton
              onClick={() => handleConfirmDelete(todo.id)}
              disabled={deleteLoading}
            >
              <DeleteButtonIcon />
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
