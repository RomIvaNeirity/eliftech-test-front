import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  shopId: number | null;
}

const initialState: CartState = {
  items: [],
  shopId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (state.items.length === 0) {
        state.shopId = action.payload.shopId;
      }

      if (state.shopId !== action.payload.shopId) {
        alert("You can only add products from one shop at a time!");
        return;
      }

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; delta: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.delta;
        // Видаляємо, якщо кількість 0
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
      if (state.items.length === 0) state.shopId = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.shopId = null;
    },
  },
});

export const { addToCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
