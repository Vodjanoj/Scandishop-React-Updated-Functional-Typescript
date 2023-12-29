import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultCurrencyState = {
  setCurrSymbol: "",
};

const currencySlice = createSlice({
  name: "Currency",
  initialState: defaultCurrencyState,
  reducers: {
    setCurrency(state, action: PayloadAction<string>) {
      state.setCurrSymbol = action.payload;
    },
    currencySwitch(state, action: PayloadAction<string>) {
      state.setCurrSymbol = action.payload;
    },
  },
});

export const currencyActions = currencySlice.actions;
export default currencySlice;
