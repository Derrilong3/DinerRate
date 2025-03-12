import { View, Image, Text } from 'react-native';
import { memo } from 'react';
import { Rating } from 'react-native-ratings';
import { useColorScheme } from 'nativewind';

import Review from '../types/Review';

function ReviewItem(review: Review) {
    const { colorScheme } = useColorScheme();
    return (
        <View className='flex-1 px-6 py-6 gap-4'>
            <View className='flex flex-row items-center gap-4'>
                <Image
                    source={{
                        uri: review.user.image,
                    }}
                    className='w-12 h-12 rounded-full'
                />
                <View className='flex-1'>
                    <Text className='text-black dark:text-gray-100 text-ee text-lg'>
                        {review.user.name}
                    </Text>
                </View>
            </View>
            <View className='flex gap-2'>
                <View className='flex-row items-center gap-2'>
                    <Rating
                        startingValue={review.rating}
                        fractions={1}
                        jumpValue={0.5}
                        imageSize={12}
                        type='custom'
                        tintColor={
                            colorScheme === 'light' ? 'white' : '#181818'
                        }
                        readonly
                    />
                    <Text className='text-black dark:text-gray-100 text-sm'>
                        {new Date(review.updatedAt).toLocaleDateString()}
                    </Text>
                </View>
                <Text className='text-black text-base dark:text-gray-100'>
                    {review.comment}
                </Text>
            </View>
        </View>
    );
}

export default memo(ReviewItem);
