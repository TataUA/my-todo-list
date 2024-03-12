import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoListsReduser } from "./todolists-reduser";
import { tasksReduser } from "./tasks-reduser";

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todoLists: todoListsReduser,
  tasks: tasksReduser,
});

export const store = configureStore({ reducer: rootReducer });

// @ts-ignore:
window.store = store;
