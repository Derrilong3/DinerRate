import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { router } from 'expo-router';

import {
    configureAxiosAuthHeader,
    removeToken,
    Token,
} from '@/slices/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import { userApiSlice } from '@/features/slices/userApiSlice';

function useAxios(token: Token) {
    const dispatch = useAppDispatch();

    configureAxiosAuthHeader(token);

    axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const logOut = () => {
        dispatch(removeToken());
        dispatch(userApiSlice.util.resetApiState());
        router.navigate('/profile');
    };

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (!error.response) {
                logOut();
            }

            if (!token || Number(error.response.status) !== 401) {
                return Promise.reject(error);
            }

            logOut();
        }
    );
}
export default useAxios;
