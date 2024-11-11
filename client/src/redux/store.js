import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import searchReducer from './products/searchSlice';
import categoriesReducer from './products/categoriesSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        search: searchReducer,
        categories: categoriesReducer
    },
});

export default store;