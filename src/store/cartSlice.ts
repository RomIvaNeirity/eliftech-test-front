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
      const incomingShopId = Number(action.payload.shopId);

      if (state.items.length === 0) {
        state.shopId = incomingShopId;
      }

      if (state.shopId !== null && Number(state.shopId) !== incomingShopId) {
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

    reorder: (
      state,
      action: PayloadAction<{ items: CartItem[]; shopId: number }>,
    ) => {
      const { items, shopId } = action.payload;
      const incomingShopId = Number(shopId);

      if (state.items.length === 0) {
        state.shopId = incomingShopId;
      }

      if (state.shopId !== null && Number(state.shopId) !== incomingShopId) {
        alert(
          "This order contains products from a different shop than your current cart.",
        );
        return;
      }

      items.forEach((newItem) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push({ ...newItem });
        }
      });
    },
  },
});

export const { addToCart, changeQuantity, clearCart, reorder } =
  cartSlice.actions;
export default cartSlice.reducer;
