import { useState } from "react";
import { v1 } from "uuid";
import { TodoList, TaskType } from "./components/TodoList/TodoList";
import "./App.css";

export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "First todos", filter: "active" },
    { id: todoListId2, title: "Second todos", filter: "completed" },
  ]);

  const [tasks, setTasks] = useState({
    [todoListId1]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "book2", isDone: true },
      { id: v1(), title: "book3", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "butter", isDone: false },
      { id: v1(), title: "fruit", isDone: false },
    ],
  });

  function removeTodoList(idTodoList: string) {
    const filteredTodoLists = todoLists.filter(
      (item) => item.id !== idTodoList
    );
    setTodoLists(filteredTodoLists);
    delete tasks[idTodoList];
    setTasks({ ...tasks });
  }

  function addTask(title: string, idTodoList: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const currentTasks = tasks[idTodoList];
    const newCurrentTasks = [newTask, ...currentTasks];
    tasks[idTodoList] = newCurrentTasks;
    setTasks({ ...tasks });
  }

  function removeTask(idTask: string, idTodoList: string) {
    const currentTasks = tasks[idTodoList];
    const filteredTasks = currentTasks.filter((item) => item.id !== idTask);
    tasks[idTodoList] = filteredTasks;
    setTasks({ ...tasks });
  }

  function changeTasksFilter(value: FilterValueType, idTodoList: string) {
    const currentTodoList = todoLists.find((item) => item.id === idTodoList);
    if (currentTodoList) {
      currentTodoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function changeTaskStatus(
    idTask: string,
    isDone: boolean,
    idTodoList: string
  ) {
    const currentTasks = tasks[idTodoList];
    const task = currentTasks.find((item) => item.id === idTask);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  return (
    <div className="App">
      {todoLists.map((item) => {
        let tasksForTodoList = tasks[item.id];
        if (item.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === false
          );
        }
        if (item.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === true
          );
        }

        return (
          <TodoList
            key={item.id}
            id={item.id}
            title={item.title}
            removeTodoList = {removeTodoList}
            tasks={tasksForTodoList}
            addTask={addTask}
            removeTask={removeTask}
            changeTasksFilter={changeTasksFilter}
            changeTaskStatus={changeTaskStatus}
            filter={item.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
