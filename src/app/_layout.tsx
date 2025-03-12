import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../../global.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import store, { persistor } from '@/store';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GestureHandlerRootView>
                    <StatusBar style='auto' />
                    <Stack>
                        <Stack.Screen
                            name='(tabs)'
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='+not-found'
                            options={{
                                title: '404',
                            }}
                        />
                    </Stack>
                </GestureHandlerRootView>
            </PersistGate>
        </Provider>
    );
}
