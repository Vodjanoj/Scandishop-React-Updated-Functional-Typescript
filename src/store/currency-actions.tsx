import { currencyActions } from "./currency-slice";
import { getCurrencies } from "../graphql/queries";
import type { RootState, AppDispatch } from '../store'

export const initCurrency = () => {
  return (dispatch: AppDispatch, getState:() => RootState) => {
    const state = getState();

    if (state.currency.setCurrSymbol) {
      return;
    }

    const loadAllCurrencies = async () => {
      try {
        const data = await getCurrencies();
        if (data && data[0]) {
          dispatch(currencyActions.setCurrency(data[0].symbol));
        }
      } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
      }
    };
    loadAllCurrencies();
  };
};
