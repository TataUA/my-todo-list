import { useState } from "react";
import { v1 } from "uuid";
import { TodoList, TaskType } from "./components/TodoList/TodoList";
import "./App.css";
import { InputAddItem } from "./components/InputAddItem/InputAddItem";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TasksObjType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "First todos", filter: "active" },
    { id: todoListId2, title: "Second todos", filter: "completed" },
  ]);

  const [tasks, setTasks] = useState<TasksObjType>({
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

  function changeTodoListTitle(idTodoList: string, newTitle: string) {
    const currentTodoList = todoLists.find((item) => item.id === idTodoList);
    if (currentTodoList) {
      currentTodoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
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

  function changeTaskTitle(
    idTask: string,
    newTitle: string,
    idTodoList: string
  ) {
    const currentTasks = tasks[idTodoList];
    const task = currentTasks.find((item) => item.id === idTask);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  }

  function addTodoList(title: string) {
    const newTodoList: TodoListType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodoLists([...todoLists, newTodoList]);
    setTasks({ ...tasks, [newTodoList.id]: [] });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '16px'}}>
          <InputAddItem addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
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
              <Grid item>
                <Paper style={{ padding: "8px" }}>
                  <TodoList
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    tasks={tasksForTodoList}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTasksFilter={changeTasksFilter}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={item.filter}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
