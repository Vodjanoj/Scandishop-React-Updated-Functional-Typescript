import { createSlice, PayloadAction, current} from "@reduxjs/toolkit";
import { Product } from "../gql/graphql";

interface ProductsSliceState {
    items: Product[];
    error: string;
    
}

const defaultProductsState: ProductsSliceState = {
    items: [],
    error: ''
}

const productsSlice = createSlice({
    name: 'Products',
    initialState: defaultProductsState,
    reducers: {
        setProductsByCategory(state, action: PayloadAction<Product[]>) {
            state.items = action.payload;
        },
        itemsFetchingError(state, action: PayloadAction<string>) {
            state.error = action.payload;
          },
    }   
});

export const productsActions = productsSlice.actions;
export default productsSlice;