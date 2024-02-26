import { useReducer } from "react";
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
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReduser,
} from "./state/todolists-reduser";
import {
  addTasktAC,
  changeTaskStatustAC,
  changeTaskTitletAC,
  removeTaskAC,
  tasksReduser,
} from "./state/tasks-reduser";

export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksObjType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, dispatchToTodoListsreducer] = useReducer(todoListsReduser, [
    { id: todoListId1, title: "First todos", filter: "active" },
    { id: todoListId2, title: "Second todos", filter: "completed" },
  ]);

  const [tasks, dispatchToTasksReducer] = useReducer(tasksReduser, {
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

  function addTodoList(title: string) {
    dispatchToTodoListsreducer(addTodoListAC(title));
    dispatchToTasksReducer(addTodoListAC(title));
  }

  function removeTodoList(idTodoList: string) {
    dispatchToTodoListsreducer(removeTodoListAC(idTodoList));
    dispatchToTasksReducer(removeTodoListAC(idTodoList));
  }

  function changeTodoListTitle(idTodoList: string, newTitle: string) {
    dispatchToTodoListsreducer(changeTodoListTitleAC(idTodoList, newTitle));
  }

  function changeTodoListFilter(idTodoList: string, value: FilterValueType) {
    dispatchToTodoListsreducer(changeTodoListFilterAC(idTodoList, value));
  }

  function addTask(title: string, idTodoList: string) {
    dispatchToTasksReducer(addTasktAC(title, idTodoList));
  }

  function removeTask(idTask: string, idTodoList: string) {
    dispatchToTasksReducer(removeTaskAC(idTask, idTodoList));
  }

  function changeTaskStatus(
    idTask: string,
    isDone: boolean,
    idTodoList: string
  ) {
    dispatchToTasksReducer(changeTaskStatustAC(idTask, isDone, idTodoList));
  }

  function changeTaskTitle(
    idTask: string,
    newTitle: string,
    idTodoList: string
  ) {
    dispatchToTasksReducer(changeTaskTitletAC(idTask, newTitle, idTodoList));
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
        <Grid container style={{ padding: "16px" }}>
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
                    changeTodoListFilter={changeTodoListFilter}
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
