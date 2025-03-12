import React, { useCallback, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Rating } from 'react-native-ratings'; // For star rating
import { useColorScheme } from 'nativewind';

import { useAddMenuItemReviewMutation } from '../slices/restaurantApiSlice';
import ModalView from '../core/modal/ModalView';
import Item from '../types/Item';

interface AddReviewModalProps {
    visible: boolean;
    onClose: () => void;
    item?: Item;
}

function AddReviewModal({ visible, onClose, item }: AddReviewModalProps) {
    const [rating, setRating] = useState<number>(5);
    const { colorScheme } = useColorScheme();
    const [addReview] = useAddMenuItemReviewMutation();
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleSubmit = async () => {
        try {
            const payload = {
                ratingValue: rating,
            };
            await addReview({
                itemId: item?.id,
                review: payload,
            }).unwrap();
            Alert.alert('Success', 'Review submitted successfully');
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
            containerClassName='flex gap-4'
        >
            <>
                <Text className='text-lg dark:text-gray-100 font-bold text-center'>
                    Place your rate
                </Text>
                <Rating
                    tintColor={colorScheme === 'light' ? undefined : '#181818'}
                    fractions={1}
                    startingValue={item?.userRating ?? 5}
                    onFinishRating={(value: number) => setRating(value)}
                />
            </>
        </ModalView>
    );
}

export default AddReviewModal;
