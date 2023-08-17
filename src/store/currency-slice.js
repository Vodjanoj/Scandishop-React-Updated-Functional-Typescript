import { createSlice } from "@reduxjs/toolkit";

const defaultCurrencyState = {
  setCurrSymbol: "",
};

const currencySlice = createSlice({
  name: "Currency",
  initialState: defaultCurrencyState,
  reducers: {
    setCurrency(state, action) {
      state.setCurrSymbol = action.payload;
    },
    currencySwitch(state, action) {
      state.setCurrSymbol = action.payload;
    },
  },
});

export const currencyActions = currencySlice.actions;
export default currencySlice;
