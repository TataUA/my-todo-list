import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
import { v1 } from "uuid";
import { AppRootState } from "./state/store";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todolists-reduser";
import { TodoList } from "./components/TodoList/TodoList";
import { InputAddItem } from "./components/InputAddItem/InputAddItem";
import "./App.css";

export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksObjType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>(
    (state) => state.todoLists
  );

  const addTodoList = (title: string) => {
    dispatch(addTodoListAC(title));
  };

  const removeTodoList = (idTodoList: string) => {
    dispatch(removeTodoListAC(idTodoList));
  };

  const changeTodoListTitle = (idTodoList: string, newTitle: string) => {
    dispatch(changeTodoListTitleAC(idTodoList, newTitle));
  };

  const changeTodoListFilter = (idTodoList: string, value: FilterValueType) => {
    dispatch(changeTodoListFilterAC(idTodoList, value));
  };

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
            Todo
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
            return (
              <Grid item key={v1()}>
                <Paper style={{ padding: "8px" }}>
                  <TodoList
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTodoListFilter={changeTodoListFilter}
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
