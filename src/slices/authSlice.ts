import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import type { RootState } from '@/store';

export type Token = string | null;

interface AuthState {
    token: Token;
}

export function configureAxiosAuthHeader(token: Token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const initialState: AuthState = {
    token: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<Token>) => {
            const token = action.payload;
            state.token = token;
            configureAxiosAuthHeader(token);
        },
        removeToken: (state) => {
            state.token = null;
            configureAxiosAuthHeader(null);
        },
    },
});

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

export const selectToken = (state: RootState) => state.auth.token;

export const { setToken, removeToken } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
