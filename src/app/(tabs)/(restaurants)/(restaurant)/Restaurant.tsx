import { memo, useMemo } from 'react';
import {
    ActivityIndicator,
    DefaultSectionT,
    SectionListData,
    Text,
    View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import _ from 'lodash';

import Item from '@/features/types/Item';
import {
    useGetMenuQuery,
    useGetMenuTypesQuery,
    useGetRestaurantListQuery,
    useGetReviewsQuery,
} from '@/features/slices/restaurantApiSlice';
import RestaurantView from '@/features/restaurant/RestaurantView';
import MenuItemType from '@/features/types/MenuItemType';

function Restaurant() {
    const local = useLocalSearchParams();

    const { restaurant, isLoading, error } = useGetRestaurantListQuery(
        undefined,
        {
            selectFromResult: ({ data, isLoading, error }) => ({
                restaurant: data?.find((r) => r.id === local.restaurantId),
                isLoading,
                error,
            }),
        }
    );

    const { data: types } = useGetMenuTypesQuery();
    const { data: menu } = useGetMenuQuery(local.restaurantId as string);

    const sections = useMemo(() => {
        if (!menu) return [];
        return types
            ?.map((type: MenuItemType) => ({
                title: _.capitalize(type.name),
                data: menu.filter((item: Item) => item.itemType === type.name),
            }))
            .filter(
                (section: SectionListData<Item, DefaultSectionT>) =>
                    section?.data.length > 0
            );
    }, [types, menu]);

    const { data: reviews } = useGetReviewsQuery(local.restaurantId as string);

    if (isLoading || !restaurant || !menu) {
        return (
            <View className='flex-1 items-center justify-center bg-white dark:bg-eerieBlack'>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    if (error) {
        return <Text>Error loading restaurant or restaurant not found</Text>;
    }

    return (
        <RestaurantView
            restaurant={restaurant}
            sections={sections || []}
            reviews={reviews || []}
        />
    );
}

export default memo(Restaurant);
