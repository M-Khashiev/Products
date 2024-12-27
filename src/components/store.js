import { configureStore } from "@reduxjs/toolkit";
import requestReducer, { initializeData } from "./slice";

const store = configureStore({
  reducer: {
    request: requestReducer,
  },
});

export default store;

// Инициализация данных при запуске приложения
store.dispatch(initializeData());
