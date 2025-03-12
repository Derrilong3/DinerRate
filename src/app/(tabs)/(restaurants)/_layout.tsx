import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function HomeLayout() {
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
            <Stack.Screen name='index' options={{ title: 'Home' }} />
            <Stack.Screen
                name='(restaurant)'
                options={{ title: 'Restaurant' }}
            />
        </Stack>
    );
}
