import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/lib/axiosBaseQuery';

import Item from '../types/Item';
import Restaurant from '../types/Restaurant';
import MenuItemType from '../types/MenuItemType';
import Review from '../types/Review';

export const restaurantApiSlice = createApi({
    reducerPath: 'restaurantApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL ?? '',
    }),
    tagTypes: ['Restaurant', 'Menu'],
    endpoints: (builder) => ({
        getRestaurantList: builder.query<Restaurant[], void>({
            query: () => ({
                url: '/restaurant/list',
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? result.map(({ id }) => ({ type: 'Restaurant', id }))
                    : [{ type: 'Restaurant', id: 'LIST' }],
        }),
        getMenu: builder.query<Item[], string>({
            query: (restaurantId) => ({
                url: `/restaurant/menu-items/${restaurantId}`,
                method: 'GET',
            }),
            providesTags: ['Menu'],
        }),
        getReviews: builder.query<Review[], string>({
            query: (restaurantId) => ({
                url: `/restaurant/reviews/${restaurantId}`,
                method: 'GET',
            }),
            providesTags: (result, error, restaurantId) => [
                { type: 'Restaurant', id: restaurantId },
            ],
        }),
        getMenuTypes: builder.query<MenuItemType[], void>({
            query: () => ({
                url: `/types/item-types`,
                method: 'GET',
            }),
        }),
        addRestaurantReview: builder.mutation({
            query: ({ restaurantId, review }) => ({
                url: `/restaurant/addRestaurantReview/${restaurantId}`,
                method: 'POST',
                data: review,
            }),
            invalidatesTags: (result, error, { restaurantId }) => [
                { type: 'Restaurant', id: restaurantId },
            ],
        }),
        removeRestaurantReview: builder.mutation({
            query: (reviewId) => ({
                url: `/restaurant/removeRestaurantReview/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Restaurant'],
        }),
        addMenuItemReview: builder.mutation({
            query: ({ itemId, review }) => ({
                url: `/restaurant/menu-items/addMenuItemReview/${itemId}`,
                method: 'POST',
                data: review,
            }),
            invalidatesTags: ['Menu'],
        }),
    }),
});
export const {
    useGetRestaurantListQuery,
    useGetMenuQuery,
    useGetReviewsQuery,
    useGetMenuTypesQuery,
    useAddRestaurantReviewMutation,
    useRemoveRestaurantReviewMutation,
    useAddMenuItemReviewMutation,
} = restaurantApiSlice;
