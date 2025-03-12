import React from 'react';
import { Text, Alert } from 'react-native';

import { useAppDispatch } from '@/lib/hooks';
import { removeToken } from '@/slices/authSlice';

import { restaurantApiSlice } from '../slices/restaurantApiSlice';
import { useDeleteUserProfileMutation } from '../slices/userApiSlice';
import ModalView from '../core/modal/ModalView';

interface DeleteAccountModalProps {
    visible: boolean;
    onClose: () => void;
}

function DeleteAccountModal({ visible, onClose }: DeleteAccountModalProps) {
    const dispatch = useAppDispatch();
    const [deleteAccount] = useDeleteUserProfileMutation();

    const handleSubmit = async () => {
        try {
            await deleteAccount().unwrap();
            dispatch(removeToken());
            dispatch(
                restaurantApiSlice.util.invalidateTags(['Restaurant', 'Menu'])
            );
            Alert.alert('Success', 'Account is successfully deleted');
        } catch (error: any) {
            Alert.alert(
                'Error',
                error.response?.data?.error || 'Failed to delete account'
            );
            console.error('Error deleting account:', error);
        }
    };

    return (
        <ModalView visible={visible} onSubmit={handleSubmit} onClose={onClose}>
            <>
                <Text className='text-lg dark:text-gray-100 font-bold mb-2 text-center'>
                    Are you sure you want to delete your account?
                </Text>
            </>
        </ModalView>
    );
}

export default DeleteAccountModal;
