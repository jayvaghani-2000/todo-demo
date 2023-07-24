import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";


export type todo = {
  task: string;
  id: string;
  completed: boolean;
}
type todoList = {
  list: todo[]
}

const initialState: todoList = {
  list:
    localStorage.getItem("todo") 
      ? JSON.parse(localStorage.getItem("todo")!)
      : [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todo>) => {
      state.list.push(action.payload);
    },
    markTodoAsCompleted: (state, action: PayloadAction<string>) => {
      const todoIndex = state.list.findIndex((i) => i.id === action.payload);
      state.list[todoIndex].completed = true;
    },
    markTodoAsIncomplete: (state, action: PayloadAction<string>) => {
      const todoIndex = state.list.findIndex((i) => i.id === action.payload);
      state.list[todoIndex].completed = false;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoIndex = state.list.findIndex((i) => i.id === action.payload);
      state.list.splice(todoIndex, 1);
    },
  },
});

export const { addTodo, markTodoAsCompleted, markTodoAsIncomplete, deleteTodo } =
  todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;

