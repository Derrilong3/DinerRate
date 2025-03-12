import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Rating } from 'react-native-ratings'; // For star rating
import _ from 'lodash';
import { useColorScheme } from 'nativewind';

import { useAppDispatch } from '@/lib/hooks';

import RatingType from '../types/Rating';
import { useAddRestaurantReviewMutation } from '../slices/restaurantApiSlice';
import { userApiSlice } from '../slices/userApiSlice';
import ModalView from '../core/modal/ModalView';

interface AddReviewModalProps {
    visible: boolean;
    onClose: () => void;
    restaurantId: string;
    ratings: RatingType[];
}

function AddReviewModal({
    visible,
    onClose,
    ratings,
    restaurantId,
}: AddReviewModalProps) {
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState<number[]>([5, 5, 5, 5]);
    const [comment, setComment] = useState('');
    const { colorScheme } = useColorScheme();
    const [addReview] = useAddRestaurantReviewMutation();

    const handleClose = useCallback(() => {
        setComment('');
        onClose();
    }, [onClose]);

    const handleSubmit = async () => {
        if (rating.filter((x) => x === 0).length > 0) {
            Alert.alert('Error', 'Please provide a rating');
            return;
        }

        if (comment.length > 500) {
            Alert.alert('Error', 'Too long');
            return;
        }

        try {
            const payload = {
                rating: ratings.map((r, index) => ({
                    name: r.name,
                    value: rating[index],
                })),
                comment,
            };

            await addReview({ restaurantId, review: payload }).unwrap();
            dispatch(userApiSlice.util.invalidateTags(['User']));
            Alert.alert('Success', 'Review submitted successfully');
            setComment('');
            handleClose(); // Close the modal
        } catch (error: any) {
            Alert.alert(
                'Error',
                error.response?.data?.error || 'Failed to submit review'
            );
            console.error('Error submitting review:', error);
        }
    };

    return (
        <ModalView
            visible={visible}
            onSubmit={handleSubmit}
            onClose={handleClose}
        >
            <>
                <Text className='text-lg dark:text-gray-100 font-bold mb-2 text-center'>
                    Add Your Review
                </Text>
                <View className='flex gap-2'>
                    {ratings &&
                        ratings.map((r, index) => (
                            <View key={index}>
                                <Text className='text-base dark:text-gray-100 text-center font-bold mt-2 mb-1'>
                                    {_.capitalize(r.name)}
                                </Text>
                                <Rating
                                    tintColor={
                                        colorScheme === 'light'
                                            ? undefined
                                            : '#181818'
                                    }
                                    fractions={1}
                                    startingValue={5}
                                    onFinishRating={(value: number) => {
                                        setRating((prevRatings) => {
                                            const updatedRatings = [
                                                ...prevRatings,
                                            ];
                                            updatedRatings[index] = value;
                                            return updatedRatings;
                                        });
                                    }}
                                />
                            </View>
                        ))}
                </View>
                <Text className='text-base dark:text-gray-100 font-bold mt-4 mb-1'>
                    Comment
                </Text>
                <TextInput
                    className='border border-gray-300 dark:text-gray-100 rounded-md p-2 text-base mb-4'
                    placeholder='Write your comment here...'
                    placeholderTextColor={'gray'}
                    value={comment}
                    onChangeText={setComment}
                    multiline
                    numberOfLines={4}
                />
            </>
        </ModalView>
    );
}

export default AddReviewModal;
