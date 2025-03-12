import { View, Text, Image, Pressable } from 'react-native';
import Colors from 'tailwindcss/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { cn } from '@/lib/merge';
import checkUrl from '@/lib/checkUrl';

import Restaurant from '../types/Restaurant';

interface RestaurantItemProps extends Restaurant {
    onPress?: () => void;
    className?: string;
}

function RestaurantItem({
    name,
    description,
    image,
    ratings,
    onPress,
    className,
}: RestaurantItemProps) {
    return (
        <Pressable
            onPress={onPress}
            className={cn(
                'flex-row flex-1 items-center bg-white p-4 rounded-lg shadow-md dark:shadow-gray-300 dark:shadow-sm',
                className
            )}
        >
            <Image
                source={{ uri: checkUrl(image) }}
                className='absolute inset-0 rounded-md'
                resizeMode='cover'
            />

            <View className='absolute inset-0 bg-black/50 rounded-lg' />

            <View className='flex-1'>
                <Text className='text-lg text-white font-semibold'>{name}</Text>
                <Text className='text-gray-300  text-sm'>{description}</Text>
                {ratings?.length > 0 ? (
                    <Text className='text-white text-sm'>
                        <MaterialCommunityIcons
                            size={16}
                            name='star'
                            color={Colors.yellow[300]}
                        />{' '}
                        {ratings[0].value} ({ratings[0].totalCount} reviews)
                    </Text>
                ) : (
                    <Text className='text-gray-300 text-sm'>
                        No ratings yet
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

export default RestaurantItem;
