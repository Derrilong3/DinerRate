import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

import RestaurantItem from '@/features/restaurant/RestaurantItem';
import { useGetRestaurantListQuery } from '@/features/slices/restaurantApiSlice';
import Restaurant from '@/features/types/Restaurant';

export default function HomeScreen() {
    const router = useRouter();
    const {
        data: restaurants,
        isLoading,
        isError,
    } = useGetRestaurantListQuery();

    const handlePress = useCallback(
        (item: Restaurant) =>
            router.push({
                pathname: '/Restaurant',
                params: { restaurantId: item.id },
            }),
        [router]
    );

    if (isLoading) {
        return (
            <View className='flex-1 items-center justify-center bg-white dark:bg-eerieBlack'>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    if (isError) {
        return (
            <View className='flex-1 items-center justify-center bg-white dark:bg-eerieBlack'>
                <Text className='text-lg text-center text-gray-400 dark:text-gray-200'>
                    Something went wrong. Please try again later.
                </Text>
            </View>
        );
    }

    return (
        <View className='flex-1 flex justify-center bg-white dark:bg-eerieBlack'>
            <FlatList
                className='flex-1 p-4'
                contentContainerClassName='flex gap-4'
                data={restaurants}
                keyExtractor={(item) => item.id + item.name}
                renderItem={({ item }) => (
                    <RestaurantItem
                        {...item}
                        onPress={() => handlePress(item)}
                    />
                )}
            />
        </View>
    );
}
