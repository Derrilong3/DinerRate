import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useAppDispatch } from '@/lib/hooks';
import { setToken } from '@/slices/authSlice';
import { cn } from '@/lib/merge';

const AuthComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();

    const isValidPassword = (password: string): boolean => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleAuth = async () => {
        const url = isLogin ? `/auth/login` : '/auth/register';
        const payload = isLogin
            ? { email, password }
            : { email, password, name };

        if (!isLogin && !isValidPassword(password)) {
            Alert.alert(
                'Invalid Password',
                'The password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.'
            );
            return;
        }

        try {
            const response = await axios.post(url, payload);
            const { token } = response.data;
            dispatch(setToken(token));
            Alert.alert('Success', `Authentication successful!`);

            // Store token in local storage or context (e.g., AsyncStorage for React Native)
        } catch (error: any) {
            Alert.alert(
                'Error',
                error.response?.data?.error || 'Authentication failed'
            );
            console.error('Auth error:', error);
        }
    };

    return (
        <View className='flex-1 justify-center p-5 gap-4 bg-white dark:bg-eerieBlack'>
            <View className='flex-row mb-5'>
                <TouchableOpacity
                    className={cn(
                        `flex-1 p-2 items-center border-b-2 'border-gray-300'`,
                        isLogin
                            ? 'border-black dark:border-white'
                            : 'border-gray-300 dark:border-[#8e8e8e]'
                    )}
                    onPress={() => setIsLogin(true)}
                >
                    <Text className='text-base dark:text-gray-100'>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={cn(
                        `flex-1 p-2 items-center border-b-2 'border-gray-300'`,
                        !isLogin
                            ? 'border-black dark:border-white'
                            : 'border-gray-300 dark:border-[#8e8e8e]'
                    )}
                    onPress={() => setIsLogin(false)}
                >
                    <Text className='text-base dark:text-gray-100'>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>

            {!isLogin && (
                <TextInput
                    className='min-h-10 h-fit border border-gray-400 px-4 rounded dark:text-gray-100'
                    placeholderTextColor={'gray'}
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                />
            )}
            <TextInput
                className='min-h-10 h-fit border border-gray-400 px-4 rounded dark:text-gray-100'
                placeholderTextColor={'gray'}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                className='min-h-10 h-fit border border-gray-400 px-4 rounded dark:text-gray-100'
                placeholderTextColor={'gray'}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                className='flex justify-center items-center bg-eerieBlack dark:bg-white rounded py-2'
                onPress={handleAuth}
            >
                <Text className='text-sm font-semibold text-gray-100 dark:text-eerieBlack'>
                    {isLogin ? 'Login' : 'Register'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthComponent;
