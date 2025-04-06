
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const loadState = (): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch  {
    return undefined;
  }
};

const saveState = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState: CartState = loadState() || {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
      saveState(state);
    },

    removeFromCart: (state, action: PayloadAction<{ id: string | number }>) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems.splice(itemIndex, 1);
      }
      saveState(state);
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string | number }>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
        saveState(state);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: string | number }>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        } else {
          state.cartItems = state.cartItems.filter((i) => i.id !== action.payload.id);
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        }
        saveState(state);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveState(state);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
