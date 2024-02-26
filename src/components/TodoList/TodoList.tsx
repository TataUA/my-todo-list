import { ChangeEvent } from "react";
import { FilterValueType } from "../../App";
import { InputAddItem } from "../InputAddItem/InputAddItem";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  removeTodoList: (idTodoList: string) => void;
  changeTodoListTitle: (idTodoList: string, newTitle: string) => void;
  tasks: Array<TaskType>;
  addTask: (title: string, idTodoList: string) => void;
  removeTask: (idTask: string, idTodoList: string) => void;
  changeTodoListFilter: (idTodoList: string, value: FilterValueType) => void;
  changeTaskStatus: (
    idTask: string,
    isDone: boolean,
    idTodoList: string
  ) => void;
  changeTaskTitle: (
    idTask: string,
    newTitle: string,
    idTodoList: string
  ) => void;
  filter: FilterValueType;
};

export const TodoList = (props: PropsType) => {
  const addItem = (title: string) => {
    props.addTask(title, props.id);
  };

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
      <InputAddItem addItem={addItem} />
      <ul>
        {props.tasks &&
          props.tasks.map((task) => {
            const removeTaskHandler = () => props.removeTask(task.id, props.id);

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) =>
              props.changeTaskStatus(
                task.id,
                e.currentTarget.checked,
                props.id
              );

            const changeTaskTitleHandler = (value: string) => {
              props.changeTaskTitle(task.id, value, props.id);
            };

            return (
              <li key={task.id} className={task.isDone ? "is_done" : ""}>
                <Checkbox
                  onChange={changeTaskStatusHandler}
                  checked={task.isDone}
                />
                <EditableSpan
                  title={task.title}
                  onChange={changeTaskTitleHandler}
                />
                <IconButton
                  onClick={removeTaskHandler}
                  aria-label="delete"
                  size="small"
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              </li>
            );
          })}
      </ul>
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
