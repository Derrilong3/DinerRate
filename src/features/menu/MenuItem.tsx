import React, { memo } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Colors from 'tailwindcss/colors';
import { AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import checkUrl from '@/lib/checkUrl';

import Item from '../types/Item';
import { Currency } from '../types/Currency';

interface MenuItemProps {
    item: Item;
    disabled: boolean;
    OnPress: (item: Item) => void;
}

function MenuItem({ item, disabled, OnPress }: MenuItemProps) {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={() => {
                OnPress(item);
            }}
            className='relative mx-4'
        >
            {/* Background Image */}
            <Image
                source={{ uri: checkUrl(item.image) }}
                className='absolute inset-0 w-full h-full rounded-lg shadow-lg dark:shadow-gray-300 dark:shadow-sm'
                resizeMode='cover'
            />

            {/* Black Overlay */}
            <View className='absolute inset-0 bg-black/50 rounded-lg' />

            {item.userRating && (
                <View className='absolute top-0 left-0 justify-center transform -translate-x-6 -translate-y-6'>
                    <MaterialCommunityIcons
                        size={60}
                        name='star'
                        color={Colors.yellow[300]}
                    ></MaterialCommunityIcons>
                    <View className='absolute w-full'>
                        <Text className='text-center font-medium text-lg text-black'>
                            {item.userRating}
                        </Text>
                    </View>
                </View>
            )}

            {/* Content on top */}
            <View className='flex flex-col items-center gap-4 relative py-5 px-4 rounded-lg'>
                <View className='flex-1'>
                    <View className='flex flex-row'>
                        <Text className='flex-1 text-lg text-white'>
                            {item.name}
                        </Text>
                        <Text className='text-base text-white'>
                            {Currency[
                                item.currency as unknown as keyof typeof Currency
                            ] || ''}
                            {item.price}
                        </Text>
                    </View>
                    <Text className='text-base mt-2 text-gray-300 dark:text-gray-200'>
                        {item.description}
                    </Text>
                </View>
            </View>
            <View>
                <AirbnbRating
                    isDisabled
                    defaultRating={item.avgRating || 0}
                    size={20}
                    showRating={false}
                />
            </View>
        </TouchableOpacity>
    );
}

export default memo(MenuItem);
