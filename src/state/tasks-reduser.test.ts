import { TasksObjType } from "../App";
import {
  addTasktAC,
  changeTaskStatustAC,
  changeTaskTitletAC,
  removeTaskAC,
  tasksReduser,
} from "./tasks-reduser";
import { addTodoListAC, removeTodoListAC } from "./todolists-reduser";

test("correct task should be removed from correct todolist", () => {
  const startState: TasksObjType = {
    todoListId1: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "book2", isDone: true },
      { id: "3", title: "book3", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "milk", isDone: true },
      { id: "2", title: "butter", isDone: false },
      { id: "3", title: "fruit", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "todoListId1");
  const endState = tasksReduser(startState, action);

  expect(endState["todoListId1"].length).toBe(2);
  expect(endState["todoListId1"][0].id).toBe("1");
  expect(endState["todoListId1"][1].id).toBe("3");
  expect(endState["todoListId2"].length).toBe(3);
});

test("correct task should be added from correct todolist", () => {
  const startState: TasksObjType = {
    todoListId1: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "book2", isDone: true },
      { id: "3", title: "book3", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "milk", isDone: true },
      { id: "2", title: "butter", isDone: false },
      { id: "3", title: "fruit", isDone: false },
    ],
  };

  const action = addTasktAC("book4", "todoListId1");
  const endState = tasksReduser(startState, action);

  expect(endState["todoListId1"].length).toBe(4);
  expect(endState["todoListId1"][0].id).toBeDefined();
  expect(endState["todoListId1"][0].title).toBe("book4");
  expect(endState["todoListId1"][0].isDone).toBe(false);
  expect(endState["todoListId2"].length).toBe(3);
});

test("status in correct tasks hould be changed", () => {
  const startState: TasksObjType = {
    todoListId1: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "book2", isDone: false },
      { id: "3", title: "book3", isDone: true },
    ],
    todoListId2: [
      { id: "1", title: "milk", isDone: true },
      { id: "2", title: "butter", isDone: false },
      { id: "3", title: "fruit", isDone: true },
    ],
  };

  const action = changeTaskStatustAC("2", true, "todoListId1");
  const endState = tasksReduser(startState, action);

  expect(endState["todoListId1"][1].isDone).toBeTruthy();
  expect(endState["todoListId2"][1].isDone).toBeFalsy();
});

test("title in correct task should be changed", () => {
  const startState: TasksObjType = {
    todoListId1: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "book2", isDone: false },
      { id: "3", title: "book3", isDone: true },
    ],
    todoListId2: [
      { id: "1", title: "milk", isDone: true },
      { id: "2", title: "butter", isDone: false },
      { id: "3", title: "fruit", isDone: true },
    ],
  };

  const action = changeTaskTitletAC("2", "book4", "todoListId1");
  const endState = tasksReduser(startState, action);

  expect(endState["todoListId1"][1].title).toBe("book4");
  expect(endState["todoListId2"][1].title).toBe("butter");
});

test("new property with new array should be added when new todo list added", () => {
  const startState: TasksObjType = {
    todoListId1: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "book2", isDone: true },
      { id: "3", title: "book3", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "milk", isDone: true },
      { id: "2", title: "butter", isDone: false },
      { id: "3", title: "fruit", isDone: false },
    ],
  };

  const action = addTodoListAC("");
  const endState = tasksReduser(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(
    (item) => item !== "todoListId1" && item !== "todoListId2"
  );
  if (!newKey) {
    throw new Error("new key didn`t add");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todoListId should be delited", () => {
  const startState: TasksObjType = {
    todoListId1: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "book2", isDone: true },
      { id: "3", title: "book3", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "milk", isDone: true },
      { id: "2", title: "butter", isDone: false },
      { id: "3", title: "fruit", isDone: false },
    ],
  };

  const action = removeTodoListAC("todoListId2");
  const endState = tasksReduser(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todoListId2"]).toBeUndefined();
});
