import { createSlice, PayloadAction, current} from "@reduxjs/toolkit";
import { Product } from "../gql/graphql";

interface ProductsSliceState {
    items: Product[];
}

const defaultProductsState: ProductsSliceState = {
    items: []
}

const productsSlice = createSlice({
    name: 'Products',
    initialState: defaultProductsState,
    reducers: {
        setProductsByCategory(state, action: PayloadAction<Product[]>) {
            state.items = action.payload;
            console.log(current(state));
        }
    }   
});

export const productsActions = productsSlice.actions;
export default productsSlice;