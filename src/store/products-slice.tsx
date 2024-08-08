import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        getProductsByCategory(state, action: PayloadAction<string>) {
            
        }
    }
});