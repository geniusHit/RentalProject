import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import globalStates from "./globalStates"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    global: globalStates,
  },
});