import { productsActions } from "./products-slice";
import { getProductsByCategory } from "../graphql/queries";
import type { RootState, AppDispatch } from "../store";
import { Product } from "../gql/graphql";

export const getProducts = (id: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const loadProductsById = async () => {
      try {
        const rawData = await getProductsByCategory(id);
        console.log("id", id);
        console.log("data", rawData);
        
        const filteredData: Product[] = rawData.filter((item): item is Product => item !== null);
          dispatch(productsActions.setProductsByCategory(filteredData));
      
      } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
      }
    };
    loadProductsById();
  };
};
