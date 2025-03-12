import { View } from 'react-native';

import { useAppSelector } from '@/lib/hooks';
import { selectToken } from '@/slices/authSlice';
import AuthComponent from '@/features/profile/AuthComponent';
import ProfileComponent from '@/features/profile/ProfileComponent';

const ProfileScreen = () => {
    const token = useAppSelector(selectToken);

    return (
        <View className='flex-1 p-4 bg-white dark:bg-eerieBlack'>
            {token ? <ProfileComponent></ProfileComponent> : <AuthComponent />}
        </View>
    );
};

export default ProfileScreen;
