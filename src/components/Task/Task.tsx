import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import {
  changeTaskStatustAC,
  changeTaskTitletAC,
  removeTaskAC,
} from "../../state/tasks-reduser";
import { TaskType } from "../../App";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};

export const Task = (props: TaskPropsType) => {
  const dispatch = useDispatch();

  const removeTaskHandler = () =>
    dispatch(removeTaskAC(props.task.id, props.todoListId));

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(
      changeTaskStatustAC(props.task.id, newIsDoneValue, props.todoListId)
    );
  };

  const changeTaskTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitletAC(props.task.id, newValue, props.todoListId));
  };

  return (
    <li className={props.task.isDone ? "is_done" : ""}>
      <Checkbox
        onChange={changeTaskStatusHandler}
        checked={props.task.isDone}
      />
      <EditableSpan
        title={props.task.title}
        onChange={changeTaskTitleHandler}
      />
      <IconButton onClick={removeTaskHandler} aria-label="delete" size="small">
        <Delete fontSize="inherit" />
      </IconButton>
    </li>
  );
};
