"use client";

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/Redux/slices/productsSlice";
import cartReducer from "@/Redux/slices/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
