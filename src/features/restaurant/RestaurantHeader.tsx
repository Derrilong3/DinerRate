import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Colors from 'tailwindcss/colors';
import _ from 'lodash';

import { selectToken } from '@/slices/authSlice';
import { useAppSelector } from '@/lib/hooks';
import checkUrl from '@/lib/checkUrl';

import Restaurant from '../types/Restaurant';

import AddReviewModal from './AddReviewModal';

function RestaurantHeader(restaurant: Restaurant) {
    const [modalVisible, setModalVisible] = useState(false);
    const token = useAppSelector(selectToken);

    return (
        <View className='p-4 bg-white dark:bg-eerieBlack'>
            <Image
                source={{ uri: checkUrl(restaurant.image) }}
                className='w-full h-48 rounded-lg mb-4 shadow-md dark:shadow-gray-300 dark:shadow-sm'
                resizeMode='cover'
            />
            <View className='flex-row flex-wrap items-end'>
                <Text className='text-2xl dark:text-gray-100 font-bold mr-2'>
                    {restaurant.name}
                </Text>
                <Text className='text-lg dark:text-gray-200'>
                    {`(${restaurant.address})`}
                </Text>
            </View>

            <Text className='text-gray-500 dark:text-gray-400 text-lg'>
                {restaurant.description}
            </Text>
            <View className='flex flex-row'>
                <View className='flex w-1/2 flex-col items-start gap-2 mt-2'>
                    {restaurant.ratings?.length > 0 ? (
                        restaurant.ratings.map((r, index) => (
                            <View
                                key={index}
                                className='flex-row items-center '
                            >
                                <MaterialCommunityIcons
                                    size={20}
                                    name='star'
                                    color={Colors.yellow[300]}
                                />
                                <Text className='font-semibold dark:text-gray-100'>{` ${r.value.toFixed(1)} (${r.totalCount}) - ${_.capitalize(r.name)}`}</Text>
                            </View>
                        ))
                    ) : (
                        <Text className='text-gray-300 dark:text-gray-100 text-sm'>
                            No ratings yet
                        </Text>
                    )}
                </View>
                {token && (
                    <TouchableOpacity
                        className='flex w-1/2 items-center justify-center'
                        onPress={() => setModalVisible(true)}
                    >
                        <MaterialCommunityIcons
                            size={80}
                            name='seal'
                            color={Colors.yellow[300]}
                        />
                        <Text className='font-semibold dark:text-gray-100'>
                            Rate
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {token && (
                <AddReviewModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    restaurantId={restaurant.id}
                    ratings={restaurant.ratings}
                />
            )}
        </View>
    );
}

export default memo(RestaurantHeader);
