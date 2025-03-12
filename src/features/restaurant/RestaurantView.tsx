import { useCallback, memo } from 'react';
import {
    DefaultSectionT,
    SectionListData,
    StyleSheet,
    View,
} from 'react-native';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import Colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';

import TabBar from '@/features/restaurant/TabBar';
import RestaurantHeader from '@/features/restaurant/RestaurantHeader';
import MenuList from '@/features/menu/MenuList';

import useScrollableTab from '../hooks/useScrollableTab';
import Restaurant from '../types/Restaurant';
import Item from '../types/Item';
import ReviewList from '../reviews/ReviewList';
import Review from '../types/Review';
const Tab = createMaterialTopTabNavigator();

const TAB_BAR_HEIGHT = 48;

interface RestaurantViewProps {
    restaurant: Restaurant;
    sections: SectionListData<Item, DefaultSectionT>[];
    reviews: Review[];
}

function RestaurantView({
    restaurant,
    sections,
    reviews,
}: RestaurantViewProps) {
    const menuScrollValue = useSharedValue(0);
    const suggestionsScrollValue = useSharedValue(0);

    const { colorScheme } = useColorScheme();
    const {
        headerHeight,
        rendered,
        contentContainerStyle,
        sharedProps,
        tabBarStyle,
        headerContainerStyle,
        handleTabIndexChange,
        handleHeaderLayout,
    } = useScrollableTab({
        tabBarHeight: TAB_BAR_HEIGHT,
        headerHeightCollapsed: 0,
        scrollValues: [menuScrollValue, suggestionsScrollValue],
    });

    const menuScrollHandler = useAnimatedScrollHandler(
        (event) => (menuScrollValue.value = event.contentOffset.y)
    );

    const reviewScrollHandler = useAnimatedScrollHandler(
        (event) => (suggestionsScrollValue.value = event.contentOffset.y)
    );

    const renderMenu = useCallback(
        () => (
            <MenuList
                sections={sections}
                onScroll={menuScrollHandler}
                tabBarStyle={[
                    tabBarStyle,
                    { top: (headerHeight || 0) + TAB_BAR_HEIGHT },
                ]}
                {...{
                    ...sharedProps,
                    contentContainerStyle: {
                        ...(StyleSheet.flatten(contentContainerStyle) || {}),
                        paddingTop: rendered
                            ? headerHeight + TAB_BAR_HEIGHT * 2
                            : TAB_BAR_HEIGHT,
                    },
                }}
            />
        ),
        [
            sections,
            menuScrollHandler,
            tabBarStyle,
            headerHeight,
            sharedProps,
            contentContainerStyle,
            rendered,
        ]
    );

    const renderReviews = useCallback(
        () => (
            <ReviewList
                data={reviews}
                onScroll={reviewScrollHandler}
                {...sharedProps}
            />
        ),
        [reviews, reviewScrollHandler, sharedProps]
    );

    const renderTabBar = useCallback<
        (props: MaterialTopTabBarProps) => React.ReactElement
    >(
        (props) => (
            <Animated.View style={tabBarStyle}>
                <TabBar onIndexChange={handleTabIndexChange} {...props} />
            </Animated.View>
        ),
        [tabBarStyle, handleTabIndexChange]
    );

    return (
        <View className='flex-1 overflow-hidden'>
            <Animated.View
                onLayout={handleHeaderLayout}
                style={headerContainerStyle}
            >
                <RestaurantHeader {...restaurant} />
            </Animated.View>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        color:
                            colorScheme === 'light'
                                ? Colors.black
                                : Colors.white,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#181818',
                        borderBottomWidth: 1,
                        borderBottomColor: 'white',
                    },
                    tabBarStyle: {
                        borderBottomWidth: 1,
                        borderBottomColor:
                            colorScheme === 'light' ? '#e9e9e9' : '#2b2b2b',
                        backgroundColor:
                            colorScheme === 'light' ? Colors.white : '#181818',
                    },
                }}
                tabBar={renderTabBar}
            >
                <Tab.Screen name='Menu'>{renderMenu}</Tab.Screen>
                <Tab.Screen name='Reviews'>{renderReviews}</Tab.Screen>
            </Tab.Navigator>
        </View>
    );
}

export default memo(RestaurantView);
