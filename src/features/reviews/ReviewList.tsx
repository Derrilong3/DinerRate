import { forwardRef, memo, useCallback } from 'react';
import {
    View,
    ViewStyle,
    StyleProp,
    FlatList,
    ListRenderItem,
    FlatListProps,
} from 'react-native';
import Animated from 'react-native-reanimated';

import Review from '../types/Review';

import ReviewItem from './ReviewItem';

type Props = Omit<FlatListProps<Review>, 'renderItem'> & {
    tabBarStyle?: ViewStyle | StyleProp<ViewStyle>;
};

export const AnimatedFlatList = Animated.createAnimatedComponent(
    FlatList
) as typeof FlatList;

const ReviewList = forwardRef<FlatList, Props>(function ReviewList(props, ref) {
    const keyExtractor = useCallback(
        (item: Review, _index: number) => item.id,
        []
    );
    const renderItem = useCallback<ListRenderItem<Review>>(
        ({ item }) => <ReviewItem {...item} />,
        []
    );

    return (
        <View className='flex-1 bg-white dark:bg-eerieBlack'>
            <AnimatedFlatList
                ref={ref}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                viewabilityConfig={{
                    minimumViewTime: 10,
                    itemVisiblePercentThreshold: 10,
                }}
                {...props}
            ></AnimatedFlatList>
        </View>
    );
});

export default memo(ReviewList);
