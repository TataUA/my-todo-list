import { v1 } from "uuid";
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todoListsReduser,
} from "./todolists-reduser";
import { FilterValueType, TodoListType } from "../App";

test("correct todo list should be removed", () => {
  const todoList1 = v1();
  const todoList2 = v1();

  const startState: Array<TodoListType> = [
    { id: todoList1, title: "first todo list", filter: "all" },
    { id: todoList2, title: "second todo list", filter: "all" },
  ];

  const endState = todoListsReduser(startState, RemoveTodoListAC(todoList1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoList2);
});

test("correct todo list should be added", () => {
  const todoList1 = v1();
  const todoList2 = v1();

  const newTodoListTitle = "New todo list";

  const startState: Array<TodoListType> = [
    { id: todoList1, title: "first todo list", filter: "all" },
    { id: todoList2, title: "second todo list", filter: "all" },
  ];

  const endState = todoListsReduser(
    startState,
    AddTodoListAC(newTodoListTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todo list should changed it`s title", () => {
  const todoList1 = v1();
  const todoList2 = v1();

  const newTodoListTitle = "New todo list";

  const startState: Array<TodoListType> = [
    { id: todoList1, title: "first todo list", filter: "all" },
    { id: todoList2, title: "second todo list", filter: "all" },
  ];

  const endState = todoListsReduser(
    startState,
    ChangeTodoListTitleAC(todoList1, newTodoListTitle)
  );

  expect(endState[0].title).toBe(newTodoListTitle);
  expect(endState[1].title).toBe("second todo list");
});

test("correct todo list should changed it`s filter", () => {
  const todoList1 = v1();
  const todoList2 = v1();

  const newFilter: FilterValueType = "active";

  const startState: Array<TodoListType> = [
    { id: todoList1, title: "first todo list", filter: "all" },
    { id: todoList2, title: "second todo list", filter: "all" },
  ];

  const endState = todoListsReduser(
    startState,
    ChangeTodoListFilterAC(todoList2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});