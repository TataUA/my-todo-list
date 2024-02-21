import { ChangeEvent } from "react";
import { FilterValueType } from "../../App";
import { InputAddItem } from "../InputAddItem/InputAddItem";
import { EditableSpan } from "../EditableSpan/EditableSpan";

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
  changeTasksFilter: (value: FilterValueType, idTodoList: string) => void;
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

  const onAllClickHandler = () => props.changeTasksFilter("all", props.id);

  const onActiveClickHandler = () =>
    props.changeTasksFilter("active", props.id);
  
  const onCompletedClickHandler = () =>
    props.changeTasksFilter("completed", props.id);

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
        <button onClick={removeTodoListHandler}>x</button>
      </h3>
      <InputAddItem addItem={addItem} />
      <ul>
        {props.tasks.map((task) => {
          const removeTaskHandler = () => props.removeTask(task.id, props.id);

          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);

          const changeTaskTitleHandler = (value: string) => {
            props.changeTaskTitle(task.id, value, props.id);
          };

          return (
            <li key={task.id} className={task.isDone ? "is_done" : ""}>
              <input
                type="checkbox"
                onChange={changeTaskStatusHandler}
                checked={task.isDone}
              />
              <EditableSpan
                title={task.title}
                onChange={changeTaskTitleHandler}
              />
              <button onClick={removeTaskHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active_filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active_filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active_filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
