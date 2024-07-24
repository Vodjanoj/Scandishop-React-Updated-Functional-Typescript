import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../gql/graphql";

interface ProductsSliceState {
    items: Product[];
}

const defaultCartState: ProductsSliceState = {
    items: []
}