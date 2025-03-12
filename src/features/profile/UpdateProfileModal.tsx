import React, { useState } from 'react';
import { Text, Alert, TextInput } from 'react-native';

import { useAppDispatch } from '@/lib/hooks';

import { restaurantApiSlice } from '../slices/restaurantApiSlice';
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} from '../slices/userApiSlice';
import ModalView from '../core/modal/ModalView';

interface UpdateProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

function UpdateProfileModal({ visible, onClose }: UpdateProfileModalProps) {
    const dispatch = useAppDispatch();
    const { data: userInfo, isLoading } = useGetUserProfileQuery();
    const [updateAccount] = useUpdateUserProfileMutation();

    const [name, setName] = useState<string>(userInfo?.name || '');
    const [email, setEmail] = useState<string>(userInfo?.email || '');
    const [password, setPassword] = useState<string>('');

    const isValidPassword = (password: string): boolean => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async () => {
        try {
            if (password && !isValidPassword(password)) {
                Alert.alert(
                    'Invalid Password',
                    'The password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.'
                );
                return;
            }

            const payload = {
                email,
                name,
                password,
            };

            await updateAccount(payload).unwrap();
            dispatch(restaurantApiSlice.util.invalidateTags(['Restaurant']));
            Alert.alert('Success', 'Account is successfully updated');
            onClose();
        } catch (error: any) {
            Alert.alert(
                'Error',
                error.response?.data?.error || 'Failed to update account'
            );
            console.error('Error updating account:', error);
        }
    };

    return (
        <ModalView visible={visible} onSubmit={handleSubmit} onClose={onClose}>
            <>
                <Text className='text-lg dark:text-gray-100 font-bold mb-2 text-center'>
                    Update profile data
                </Text>

                <Text className='text-base dark:text-gray-100 font-bold mt-4 mb-1'>
                    Name
                </Text>
                <TextInput
                    className='border border-gray-300 dark:text-gray-100 rounded-md p-2 text-base mb-4'
                    placeholder='Write your name here...'
                    placeholderTextColor={'gray'}
                    value={name}
                    onChangeText={setName}
                />
                <Text className='text-base dark:text-gray-100 font-bold mt-4 mb-1'>
                    Email
                </Text>
                <TextInput
                    className='border border-gray-300 dark:text-gray-100 rounded-md p-2 text-base mb-4'
                    placeholder='Write your email here...'
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text className='text-base dark:text-gray-100 font-bold mt-4 mb-1'>
                    New Password
                </Text>
                <TextInput
                    className='border border-gray-300 dark:text-gray-100 rounded-md p-2 text-base mb-4'
                    placeholder='Write new password here...'
                    secureTextEntry
                    placeholderTextColor={'gray'}
                    value={password}
                    onChangeText={setPassword}
                />
            </>
        </ModalView>
    );
}

export default UpdateProfileModal;
