import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { RootState } from '@/store';

export type Theme = 'light' | 'dark';

interface PreferencesState {
    theme: Theme;
}

const getDefaultTheme = (): Theme => Appearance.getColorScheme() ?? 'light';

const initialState: PreferencesState = {
    theme: getDefaultTheme(),
};

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = preferencesSlice.actions;

const persistConfig = {
    key: 'preferences',
    version: 1,
    storage: AsyncStorage,
};

export const selectTheme = (state: RootState) => state.preferences.theme;

export default persistReducer(persistConfig, preferencesSlice.reducer);
