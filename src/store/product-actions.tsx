import { productsActions } from "./products-slice";
import { getProductsByCategory } from "../graphql/queries";
import type { AppDispatch } from "../store";
import { Product } from "../gql/graphql";

export const getProducts = (id: string) => {
  return (dispatch: AppDispatch) => {
    const loadProductsById = async () => {
      try {
        const rawData = await getProductsByCategory(id);

        const filteredData: Product[] = rawData.filter(
          (item): item is Product => item !== null
        );
        dispatch(productsActions.setProductsByCategory(filteredData));
      } catch (error: any) {
        dispatch(productsActions.itemsFetchingError(error.message));
      }
    };
    loadProductsById();
  };
};
