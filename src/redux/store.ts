import { configureStore } from "@reduxjs/toolkit";
import budgetCalcReducer from "./budgetCalcSlice";

export const store = configureStore({
  reducer: {
    budgetCalc: budgetCalcReducer,
  },
});

export type TStore = ReturnType<typeof store.getState>;
