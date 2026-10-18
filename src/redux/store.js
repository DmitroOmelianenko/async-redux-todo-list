
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";

const loadState = () => {
  try {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos === null) {
      return [
        { id: 1, text: "Вивчити Redux" },
        { id: 2, text: "Зробити ДЗ" }
      ];
    }

    return JSON.parse(savedTodos);
  } catch (err) {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    todos: todosReducer
  },
  preloadedState: {
    todos: loadState()
  }
});

store.subscribe(() => {
  const currentState = store.getState();

  localStorage.setItem("todos", JSON.stringify(currentState.todos));
});
