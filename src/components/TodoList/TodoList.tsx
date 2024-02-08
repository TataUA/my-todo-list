import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "../../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType) => void;
};

export const TodoList = (props: PropsType) => {
  const { title, tasks, addTask, removeTask, changeFilter } = props;

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  const onKeyEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newTaskTitle.trim() === "") {
        setNewTaskTitle("");
        return;
      }
      addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() === "") {
      setNewTaskTitle("");
      return;
    }
    addTask(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  const onAllClickHandler = () => changeFilter("all");
  const onActiveClickHandler = () => changeFilter("active");
  const onCompletedClickHandler = () => changeFilter("completed");

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeTitleHandler}
          onKeyUp={onKeyEnterHandler}
        />
        <button onClick={addNewTask}>+</button>
      </div>
      <ul>
        {tasks.map((task) => {
          const removeTaskHandler = () => removeTask(task.id);

          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={removeTaskHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
};
