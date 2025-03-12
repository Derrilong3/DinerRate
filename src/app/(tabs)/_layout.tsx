import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useAppSelector } from '@/lib/hooks';
import { selectTheme } from '@/slices/preferencesSlice';
import { selectToken } from '@/slices/authSlice';
import useAxios from '@/hooks/useAxios';

export default function TabLayout() {
    const theme = useAppSelector(selectTheme);
    const token = useAppSelector(selectToken);

    useAxios(token);

    return (
        <Tabs
            screenOptions={{
                animation: 'shift',
                headerStyle: {
                    backgroundColor: theme === 'light' ? 'white' : '#181818',
                },
                headerTintColor: theme === 'light' ? 'black' : 'white',
                tabBarStyle: {
                    backgroundColor: theme === 'light' ? 'white' : '#181818',
                },
                tabBarActiveTintColor: theme === 'light' ? 'black' : 'white',
            }}
        >
            <Tabs.Screen
                name='(restaurants)'
                options={{
                    title: 'Home',
                    tabBarLabelStyle: { minHeight: '100%' },
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name='home' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='(profile)'
                options={{
                    title: 'Profile',
                    tabBarLabelStyle: { minHeight: '100%' },
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name='user' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarLabelStyle: { minHeight: '100%' },
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name='gear' color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
