// src/redux/products/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',  // Search query for filtering
    categoryId: null,  // Selected category ID
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;  // Set search query
    },
    setCategoryFilter: (state, action) => {
      state.categoryId = action.payload;  // Set selected category filter
    },
  },
});

export const { setSearchQuery, setCategoryFilter } = searchSlice.actions;
export default searchSlice.reducer;
