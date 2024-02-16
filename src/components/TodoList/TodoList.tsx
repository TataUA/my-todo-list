import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "../../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  removeTodoList: (idTodoList: string) => void;
  tasks: Array<TaskType>;
  addTask: (title: string, idTodoList: string) => void;
  removeTask: (idTask: string, idTodoList: string) => void;
  changeTasksFilter: (value: FilterValueType, idTodoList: string) => void;
  changeTaskStatus: (
    idTask: string,
    isDone: boolean,
    idTodoList: string
  ) => void;
  filter: FilterValueType;
};

export const TodoList = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  const removeTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() === "") {
      setNewTaskTitle("");
      setError("field 'title' is required");
      return;
    }
    props.addTask(newTaskTitle.trim(), props.id);
    setNewTaskTitle("");
  };

  const onKeyEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") addNewTask();
  };

  const onAllClickHandler = () => props.changeTasksFilter("all", props.id);
  const onActiveClickHandler = () =>
    props.changeTasksFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeTasksFilter("completed", props.id);

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodoListHandler}>x</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeTitleHandler}
          onKeyUp={onKeyEnterHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className="error_message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const removeTaskHandler = () => props.removeTask(task.id, props.id);
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);

          return (
            <li key={task.id}>
              <input
                type="checkbox"
                onChange={changeTaskStatusHandler}
                checked={task.isDone}
              />
              <span className={task.isDone ? "is_done" : ""}>{task.title}</span>
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
