import { v1 } from "uuid";
import { FilterValueType, TodoListType } from "../App";

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todoListId: string;
};

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
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

type ActionsTypes =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

const initialState: Array<TodoListType> = [];

export const todoListsReduser = (
  state: Array<TodoListType> = initialState,
  action: ActionsTypes
): Array<TodoListType> => {
  switch (action.type) {
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
    case "REMOVE-TODOLIST": {
      return state.filter((item) => item.id !== action.todoListId);
    }
    case "CHANGE-TODOLIST-TITLE": {
      let copyState = [...state];
      copyState = copyState.map((item) =>
        item.id === action.todoListId ? { ...item, title: action.title } : item
      );
      return copyState;
    }
    case "CHANGE-TODOLIST-FILTER": {
      let copyState = [...state];
      copyState = copyState.map((item) =>
        item.id === action.todoListId
          ? { ...item, filter: action.filter }
          : item
      );
      return copyState;
    }
    default:
      return state;
  }
};

export const addTodoListAC = (title: string): AddTodoListActionType => {
  return { type: "ADD-TODOLIST", title, todoListId: v1() };
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", todoListId };
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
