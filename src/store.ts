import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import { restaurantApiSlice } from '@/features/slices/restaurantApiSlice';
import { userApiSlice } from '@/features/slices/userApiSlice';

import auth from './slices/authSlice';
import preferences from './slices/preferencesSlice';

const store = configureStore({
    reducer: {
        auth: auth,
        preferences: preferences,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [restaurantApiSlice.reducerPath]: restaurantApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(restaurantApiSlice.middleware, userApiSlice.middleware),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
