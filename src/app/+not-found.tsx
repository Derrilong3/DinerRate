import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { colorScheme } from 'nativewind';

import { selectTheme } from '@/slices/preferencesSlice';
import { useAppSelector } from '@/lib/hooks';

export default function NotFoundScreen() {
    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        colorScheme.set(theme);
    }, [theme]);

    return (
        <SafeAreaView className='flex-1 bg-white dark:bg-eerieBlack'>
            <View className='flex-1 justify-center items-center p-4'>
                <Text className='text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
                    404
                </Text>
                <Text className='text-lg text-gray-600 dark:text-gray-200 mb-6 text-center'>
                    Page not found
                </Text>
                <Link href='/' asChild>
                    <TouchableOpacity className='bg-eerieBlack dark:bg-white rounded p-2'>
                        <Text className='text-lg font-semibold text-gray-100 dark:text-eerieBlack'>
                            Back to main
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
}
