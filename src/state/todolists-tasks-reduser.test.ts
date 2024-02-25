import { TasksObjType, TodoListType } from "../App";
import { tasksReduser } from "./tasks-reduser";
import { addTodoListAC, todoListsReduser } from "./todolists-reduser";

test("IDs should be equal", () => {
  const startTodoListsState: Array<TodoListType> = [];
  const startTasksState: TasksObjType = {};

  const action = addTodoListAC("");

  const endTodoListsState = todoListsReduser(startTodoListsState, action);
  const endTasksState = tasksReduser(startTasksState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.todoListId);
  expect(idFromTodoLists).toBe(action.todoListId);
});
