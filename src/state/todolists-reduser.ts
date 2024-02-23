import { v1 } from "uuid";
import { FilterValueType, TodoListType } from "../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

export type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
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
      return state.filter((item) => item.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: "all",
        },
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const currentTodoList = state.find((item) => item.id === action.id);
      if (currentTodoList) {
        currentTodoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const currentTodoList = state.find((item) => item.id === action.id);
      if (currentTodoList) {
        currentTodoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("Type didn`t found");
  }
};

export const RemoveTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
};

export const AddTodoListAC = (todoListTitle: string): AddTodoListActionType => {
  return { type: "ADD-TODOLIST", title: todoListTitle };
};

export const ChangeTodoListTitleAC = (
  todoListId: string,
  todoListTitle: string
): ChangeTodoListTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todoListId,
    title: todoListTitle,
  };
};

export const ChangeTodoListFilterAC = (
  todoListId: string,
  todoListFilter: FilterValueType
): ChangeTodoListFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todoListId,
    filter: todoListFilter,
  };
};
