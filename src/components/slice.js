import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Экшн для загрузки товаров
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/M-Khashiev/products.json/refs/heads/main/products.json"
  );
  const products = await response.json();
  return { products };
});

const initialState = {
  products: [], // Начальное состояние без загрузки из localStorage
  status: "",
  isLoading: false,
  isFetched: false,
  favorites: [], // Избранные товары без загрузки из localStorage
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
    },
    addAndRemoveFavorite: (state, action) => {
      const existingFavoriteIndex = state.favorites.findIndex((item) => item.id === action.payload.id);
      if (existingFavoriteIndex === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(existingFavoriteIndex, 1);
      }
    },
    createProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isLoading = false;
        state.isFetched = true;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "rejected";
        state.isLoading = false;
      });
  },
});

export const { deleteProduct, addAndRemoveFavorite, createProduct } = requestSlice.actions;

export default requestSlice.reducer;

export const initializeData = () => async (dispatch) => {
  await dispatch(fetchProducts());
};
