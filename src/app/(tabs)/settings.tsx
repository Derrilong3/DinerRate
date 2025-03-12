import { View, Text, Switch } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { colorScheme } from 'nativewind';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectTheme, setTheme } from '@/slices/preferencesSlice';

const SettingsScreen = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const [darkMode, setDarkMode] = useState(theme === 'dark');

    const toggleTheme = useCallback(
        (value: boolean) => {
            setDarkMode(value);
            const theme = value ? 'dark' : 'light';
            dispatch(setTheme(theme));
            colorScheme.set(theme);
        },
        [dispatch]
    );

    useEffect(() => {
        colorScheme.set(theme);
    }, [theme]);

    return (
        <View className='flex-1 p-4 bg-white dark:bg-eerieBlack'>
            {/* Dark Mode Toggle */}
            <View className='flex-row items-center justify-between py-3 border-b border-gray-200'>
                <Text className='text-lg dark:text-gray-100'>Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={toggleTheme}
                    thumbColor={'#181818'}
                />
            </View>
        </View>
    );
};

export default SettingsScreen;
