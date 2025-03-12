import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function ProfileLayout() {
    const { colorScheme } = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        colorScheme === 'light' ? 'white' : '#181818',
                },
                headerTintColor: colorScheme === 'light' ? 'black' : 'white',
            }}
        >
            <Stack.Screen name='profile' options={{ title: 'Profile' }} />
        </Stack>
    );
}
