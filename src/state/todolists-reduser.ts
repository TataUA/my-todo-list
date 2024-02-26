import { v1 } from "uuid";
import { FilterValueType, TodoListType } from "../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  todoListId: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todoListId: string;
};

export type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  todoListId: string;
  title: string;
};

export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todoListId: string;
  filter: FilterValueType;
};

type ActionsType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

export const todoListsReduser = (
  state: Array<TodoListType>,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((item) => item.id !== action.todoListId);
    }
    case "ADD-TODOLIST": {
      return [
        {
          id: action.todoListId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const currentTodoList = state.find(
        (item) => item.id === action.todoListId
      );
      if (currentTodoList) {
        currentTodoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const currentTodoList = state.find(
        (item) => item.id === action.todoListId
      );
      if (currentTodoList) {
        currentTodoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("Type didn`t found");
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", todoListId };
};

export const addTodoListAC = (title: string): AddTodoListActionType => {
  return { type: "ADD-TODOLIST", title, todoListId: v1() };
};

export const changeTodoListTitleAC = (
  todoListId: string,
  title: string
): ChangeTodoListTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    todoListId,
    title,
  };
};

export const changeTodoListFilterAC = (
  todoListId: string,
  filter: FilterValueType
): ChangeTodoListFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todoListId,
    filter,
  };
};
