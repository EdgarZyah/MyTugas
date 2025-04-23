import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todoSlices";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
