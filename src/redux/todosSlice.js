
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },

    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },

    editTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);

      if (todo) {
        todo.text = action.payload.text;
      }
    }
  }
});

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
