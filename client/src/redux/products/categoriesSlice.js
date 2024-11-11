// src/redux/categories/categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],  // List of categories
    loading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;  // Set categories in state
    },
    setLoading: (state, action) => {
      state.loading = action.payload;  // Set loading state
    },
    setError: (state, action) => {
      state.error = action.payload;  // Set error state
    },
  },
});

export const { setCategories, setLoading, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
