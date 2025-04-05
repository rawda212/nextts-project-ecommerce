"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

interface Product {
  id: string | number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filteredProducts: Product[];
  selectedProduct: Product | null;
  selectedCategory: string;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  filteredProducts: [],
  selectedProduct: null,
  selectedCategory: "All",
};

export const fetchedAllProducts = createAsyncThunk<Product[], void>(
  "products/getAll",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get<Product[]>("/products");
      console.log("Fetched Products:", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("error from thunk");
    }
  }
);

export const fetchOneProduct = createAsyncThunk<Product, string | number>(
  "products/getOne",
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("error from thunk");
    }
  }
);

export const addProduct = createAsyncThunk<Product, Partial<Product>>(
  "products/add",
  async (product, thunkApi) => {
    try{
      const productWithId: Product = {
        ...product as Product,
        id: String(product.id) || String(Date.now()),
      };
      console.log("🚀 Adding new product:", productWithId);
      const response = await axiosInstance.post<Product>("/products", productWithId);
      console.log("✅ Product added successfully:", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("error from Add thunk");
    }
  }
);

export const deleteProduct = createAsyncThunk<string | number, string | number>(
  "products/delete",
  async (productId, thunkApi) => {
    try {
      const idString = String(productId);
      console.log("🚀 Sending DELETE request for ID:", idString);
      const response = await axiosInstance.delete(`/products/${idString}`);
      console.log("✅ Deleted successfully:", response.data);
      return productId; 
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      return thunkApi.rejectWithValue("error from delete thunk");
    }
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  "products/update",
  async (product) => {
    const response = await axiosInstance.put<Product>(`/products/${product.id}`, product);
    return response.data;
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === "All") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) =>
            product.category.toLowerCase() === action.payload.toLowerCase()
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchedAllProducts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchedAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchedAllProducts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(fetchOneProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchOneProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        if (state.selectedCategory === "All" || action.payload.category === state.selectedCategory) {
          state.filteredProducts.push(action.payload);
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log("✅ Deleted Product ID:", action.payload);
        state.products = state.products.filter(
          (product) => String(product.id) !== String(action.payload)
        );
        state.filteredProducts = state.filteredProducts.filter(
          (product) => String(product.id) !== String(action.payload)
        );
        console.log("✅ Remaining Products:", state.products);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          String(product.id) === String(action.payload.id) ? action.payload : product
        );
        state.filteredProducts = state.filteredProducts.map((product) =>
          String(product.id) === String(action.payload.id) ? action.payload : product
        );
      });
  },
});

export const { filterByCategory } = ProductsSlice.actions;
export default ProductsSlice.reducer;