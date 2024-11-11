import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [], // List of products
        loading: false,
        error: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload; // Update products
        },
        setProductsLoading: (state, action) => {
            state.loading = action.payload; // Update loading state
        },
        setProductsError: (state, action) => {
            state.error = action.payload; // Set error state
        },
    },
});

export const { setProducts, setProductsLoading, setProductsError } = productsSlice.actions;
export default productsSlice.reducer;