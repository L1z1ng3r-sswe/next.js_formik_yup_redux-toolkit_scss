import { configureStore } from "@reduxjs/toolkit";
import { crudAPI } from "./crudAPI";

export const store = configureStore({
  reducer: {
    [crudAPI.reducerPath]: crudAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crudAPI.middleware),
});
