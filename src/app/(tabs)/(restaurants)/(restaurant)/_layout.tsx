import { Stack } from 'expo-router';

export default function RestaurantLayout() {
    return (
        <Stack>
            <Stack.Screen name='Restaurant' options={{ headerShown: false }} />
        </Stack>
    );
}
