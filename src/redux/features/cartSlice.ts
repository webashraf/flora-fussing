import { TProduct } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  cart: TProduct[];
};

const initialState: TInitialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<TProduct>) => {
      const index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index !== -1) {
        state.cart[index].qty += action.payload.qty;
      } else if (index === -1) {
        state.cart.push({ ...action.payload });
      }
    },
    decreseCartItem: (state, action: PayloadAction<TProduct>) => {
      const index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index !== -1) {
        state.cart[index].qty -= action.payload.qty;
      } else if (index === -1) {
        state.cart.push({ ...action.payload });
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart, decreseCartItem, removeCartItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
