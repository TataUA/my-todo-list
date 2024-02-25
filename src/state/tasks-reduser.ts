import { v1 } from "uuid";
import { TasksObjType } from "../App";
import {
  AddTodoListActionType,
  RemoveTodoListActionType,
} from "./todolists-reduser";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todoListId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todoListId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todoListId: string;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todoListId: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType;

export const tasksReduser = (
  state: TasksObjType,
  action: ActionsType
): TasksObjType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const copyState = { ...state };
      const tasks = copyState[action.todoListId];
      copyState[action.todoListId] = tasks.filter(
        (item) => item.id !== action.taskId
      );
      return copyState;
    }
    case "ADD-TASK": {
      const copyState = { ...state };
      const tasks = copyState[action.todoListId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      copyState[action.todoListId] = [newTask, ...tasks];
      return copyState;
    }
    case "CHANGE-TASK-STATUS": {
      const copyState = { ...state };
      const tasks = copyState[action.todoListId];
      const currentTask = tasks.find((item) => item.id === action.taskId);
      if (currentTask) {
        currentTask.isDone = action.isDone;
      }
      return copyState;
    }
    case "CHANGE-TASK-TITLE": {
      const copyState = { ...state };
      const tasks = copyState[action.todoListId];
      const currentTask = tasks.find((item) => item.id === action.taskId);
      if (currentTask) {
        currentTask.title = action.title;
      }
      return copyState;
    }
    case "ADD-TODOLIST": {
      const copyState = { ...state };
      copyState[action.todoListId] = [];
      return copyState;
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.todoListId];
      return copyState;
    }

    default:
      throw new Error("Type didn`t found");
  }
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId, todoListId };
};

export const addTasktAC = (
  title: string,
  todoListId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todoListId };
};

export const changeTaskStatustAC = (
  taskId: string,
  isDone: boolean,
  todoListId: string
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskId,
    isDone,
    todoListId,
  };
};

export const changeTaskTitletAC = (
  taskId: string,
  title: string,
  todoListId: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todoListId,
  };
};
