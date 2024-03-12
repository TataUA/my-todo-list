import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AppRootState } from "../../state/store";
import { addTaskAC } from "../../state/tasks-reduser";
import { Task } from "../Task/Task";
import { InputAddItem } from "../InputAddItem/InputAddItem";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { FilterValueType, TaskType } from "../../App";

type PropsType = {
  id: string;
  title: string;
  removeTodoList: (idTodoList: string) => void;
  changeTodoListTitle: (idTodoList: string, newTitle: string) => void;
  changeTodoListFilter: (idTodoList: string, value: FilterValueType) => void;
  filter: FilterValueType;
};

export const TodoList = (props: PropsType) => {
  const tasks = useSelector<AppRootState, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );
  const dispatch = useDispatch();

  const removeTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  const onAllClickHandler = () => props.changeTodoListFilter(props.id, "all");

  const onActiveClickHandler = () =>
    props.changeTodoListFilter(props.id, "active");

  const onCompletedClickHandler = () =>
    props.changeTodoListFilter(props.id, "completed");

  let allTodoListTasks = [...tasks];
  let tasksForTodoList = allTodoListTasks;

  if (props.filter === "active") {
    if (allTodoListTasks)
      tasksForTodoList = allTodoListTasks.filter(
        (task) => task.isDone === false
      );
  }
  if (props.filter === "completed") {
    if (allTodoListTasks)
      tasksForTodoList = allTodoListTasks.filter(
        (task) => task.isDone === true
      );
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton
          onClick={removeTodoListHandler}
          aria-label="delete"
          size="large"
        >
          <Delete />
        </IconButton>
      </h3>
      <InputAddItem
        addItem={(title) => {
          dispatch(addTaskAC(title, props.id));
        }}
      />
      <div>
        {tasksForTodoList &&
          tasksForTodoList.map((task) => {
            return <Task key={task.id} task={task} todoListId={props.id} />;
          })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "outlined"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "outlined"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "outlined"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
