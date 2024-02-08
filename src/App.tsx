import React, { useState } from "react";
import { v1 } from "uuid";
import { TodoList, TaskType } from "./components/TodoList/TodoList";
import "./App.css";

export type FilterValueType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "book", isDone: true },
    { id: v1(), title: "book2", isDone: true },
    { id: v1(), title: "book3", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValueType>("all");

  function addTask(title: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  }

  function removeTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  let filteredTasks = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => task.isDone === false);
  }
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone === true);
  }

  return (
    <div className="App">
      <TodoList
        title="Title"
        tasks={filteredTasks}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
