import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/lib/axiosBaseQuery';

import { UserProfile } from '../types/UserProfile';

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL ?? '',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserProfile: builder.query<UserProfile, void>({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: '/user/profile',
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUserProfile: builder.mutation<void, void>({
            query: () => ({
                url: '/user/profile',
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useDeleteUserProfileMutation,
} = userApiSlice;
