import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";

const generateStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const wrapper = createWrapper(generateStore, { debug: true });

export type AppStore = ReturnType<typeof generateStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export default wrapper;
