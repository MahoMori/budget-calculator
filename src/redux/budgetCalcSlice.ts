import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../App";

type BudgetCalcState = {
  budget: string;
  items: Item[];
};

const initialState: BudgetCalcState = {
  budget: "0.00",
  items: [],
};

export const budgetCalcSlice = createSlice({
  name: "budgetCalc",
  initialState,
  reducers: {
    changeBudget: (state, action: PayloadAction<string>) => {
      state.budget = action.payload;
      console.log(state.budget);
    },

    addItem: (state, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
      console.log(state.items);
    },

    editItem: (state, action: PayloadAction<Item>) => {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...action.payload } : item
      );
      state.items = newItems;
      console.log(state.items);
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      state.items = newItems;
      console.log(state.items);
    },

    resetItems: (state) => {
      state.items = [];
    },
  },
});

export const { changeBudget, addItem, editItem, deleteItem, resetItems } =
  budgetCalcSlice.actions;

export default budgetCalcSlice.reducer;
