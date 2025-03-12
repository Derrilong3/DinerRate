import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Material from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';

import { removeToken } from '@/slices/authSlice';
import { useAppDispatch } from '@/lib/hooks';

import { useGetUserProfileQuery, userApiSlice } from '../slices/userApiSlice';
import { useRemoveRestaurantReviewMutation } from '../slices/restaurantApiSlice';

import ReviewItem from './ReviewItem';
import DeleteAccountModal from './DeleteAccountModal';
import UpdateProfileModal from './UpdateProfileModal';

const ProfileComponent = () => {
    const dispatch = useAppDispatch();
    const { colorScheme } = useColorScheme();
    const { data: userInfo, isLoading } = useGetUserProfileQuery();
    const [removeReview] = useRemoveRestaurantReviewMutation();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);

    const handleExit = useCallback(() => {
        dispatch(removeToken());
        dispatch(userApiSlice.util.resetApiState());
    }, [dispatch]);

    const handleDelete = useCallback(
        async (reviewId: string) => {
            await removeReview(reviewId).unwrap();
            dispatch(userApiSlice.util.invalidateTags(['User']));
        },
        [removeReview, dispatch]
    );

    if (isLoading) {
        return <ActivityIndicator size='large' color='#0000ff' />;
    }

    if (!userInfo) {
        dispatch(removeToken());
        return <Text>Error loading profile</Text>;
    }

    return (
        <View className='flex-1 p-5 bg-white dark:bg-eerieBlack'>
            {/* Profile Section */}
            <View className='items-center mb-8'>
                {userInfo.image ? (
                    <Image
                        source={{ uri: userInfo.image }}
                        className='w-24 h-24 rounded-full mb-2'
                    />
                ) : (
                    <View className='w-24 h-24 rounded-full bg-gray-300 justify-center items-center'>
                        <Text className='text-4xl text-white'>
                            {userInfo.name}
                        </Text>
                    </View>
                )}
                <Text className='text-2xl font-bold dark:text-gray-100'>
                    {userInfo.name}
                </Text>
                <Text className='text-base text-gray-500 dark:text-gray-300'>
                    {userInfo.email}
                </Text>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
                className='absolute top-5 left-5'
                onPress={() => setDeleteModalVisible(true)}
            >
                <View>
                    <Material
                        size={32}
                        name='delete'
                        color={colorScheme === 'light' ? 'red' : 'red'}
                    />
                </View>
            </TouchableOpacity>

            {/* Exit Button */}
            <TouchableOpacity
                className='absolute top-5 right-5'
                onPress={handleExit}
            >
                <View>
                    <Material
                        size={32}
                        name='exit-run'
                        color={colorScheme === 'light' ? 'black' : 'white'}
                    />
                </View>
            </TouchableOpacity>

            {/* Update Button */}
            <TouchableOpacity
                className='absolute top-[100px] right-5'
                onPress={() => setUpdateModalVisible(true)}
            >
                <View>
                    <Material
                        size={32}
                        name='account-edit'
                        color={colorScheme === 'light' ? 'black' : 'white'}
                    />
                </View>
            </TouchableOpacity>

            {/* Reviews Section */}
            <Text className='text-xl font-bold mb-2 dark:text-gray-100 text-center'>
                Your Reviews
            </Text>
            {userInfo.reviews.length === 0 ? (
                <Text className='text-base text-gray-500 dark:text-gray-300 text-center'>
                    No reviews yet.
                </Text>
            ) : (
                <FlatList
                    data={userInfo.reviews}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ReviewItem item={item} onPress={handleDelete} />
                    )}
                />
            )}

            <DeleteAccountModal
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
            />

            <UpdateProfileModal
                visible={updateModalVisible}
                onClose={() => setUpdateModalVisible(false)}
            />
        </View>
    );
};

export default ProfileComponent;
