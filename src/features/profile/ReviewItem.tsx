import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Review from '../types/Review';

function ReviewItem({
    item,
    onPress,
}: {
    item: Review;
    onPress: (reviewId: string) => void;
}) {
    return (
        <View className='bg-white dark:bg-gray-100 flex justify-between items-center flex-row p-4 rounded-lg mb-2 shadow'>
            <View>
                <Text className='text-base font-bold'>
                    Rating: {item.rating ? item.rating : 'Not rated'}
                </Text>
                <Text className='text-sm text-gray-800 my-1'>
                    {item.comment}
                </Text>
                <Text className='text-sm text-gray-500'>
                    Updated: {new Date(item.updatedAt).toLocaleDateString()}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    onPress(item.id);
                }}
            >
                <MaterialCommunityIcons
                    size={60}
                    name='trash-can'
                    color='black'
                ></MaterialCommunityIcons>
            </TouchableOpacity>
        </View>
    );
}

export default memo(ReviewItem);
