import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './products/productsSlice';
import searchReducer from './products/searchSlice';
import categoriesReducer from './products/categoriesSlice';
import userReducer from './user/userSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        products: productsReducer,
        search: searchReducer,
        categories: categoriesReducer,
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store);

export default store;