import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Price, Product, Maybe } from "../gql/graphql";

interface CartItem extends Product {
  quantity: number;
  selectedAttributes?: selectedAttribute[];
  prices: Price[];
}

export interface selectedAttribute  {
  id: string;
  name: Maybe<string> | undefined;
  selectedAttrItemId: Maybe<string> | undefined;
}

interface CartSliceState {
  items: CartItem[];
  totalQuantity: number;
}

const defaultCartState: CartSliceState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: defaultCartState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      state.totalQuantity++;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      // Using Redux Toolkit it is allowed to write state updates in a mutable way as Toolkit uses Immer under the hood,
      // it will automatically produce a new, updated state object, preserving the immutability of the state
      if (!existingCartItem) {
        state.items = state.items.concat(newItem);
      } else {
        state.items[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
      }
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      state.totalQuantity--;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );

      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        state.items[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
