import { useCallback, useMemo, useState } from 'react';
import {
    StyleSheet,
    StyleProp,
    useWindowDimensions,
    ViewProps,
    ViewStyle,
    VirtualizedListProps,
} from 'react-native';
import {
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';

import HeaderConfig from '@/features/types/HeaderConfig';

function useScrollableTab({
    tabBarHeight,
    headerHeightCollapsed,
    scrollValues,
}: {
    tabBarHeight: number;
    headerHeightCollapsed: number;
    scrollValues: SharedValue<number>[];
}) {
    const { height: screenHeight } = useWindowDimensions();

    const [tabIndex, setTabIndex] = useState(0);

    const [headerHeight, setHeaderHeight] = useState(0);

    const headerConfig = useMemo<HeaderConfig>(
        () => ({
            heightCollapsed: headerHeightCollapsed,
            heightExpanded: headerHeight,
        }),
        [headerHeightCollapsed, headerHeight]
    );

    const { heightCollapsed, heightExpanded } = headerConfig;

    const headerDiff = heightExpanded - heightCollapsed;

    const rendered = headerHeight > 0;

    const handleHeaderLayout = useCallback<NonNullable<ViewProps['onLayout']>>(
        (event) => setHeaderHeight(event.nativeEvent.layout.height),
        []
    );

    const handleTabIndexChange = useCallback(
        (index: number) => setTabIndex(index),
        []
    );

    const сurrentScrollValue = useDerivedValue(
        () => scrollValues[tabIndex].value,
        [tabIndex, scrollValues]
    );

    const translateY = useDerivedValue(() => {
        return withTiming(-Math.min(сurrentScrollValue.value, headerDiff), {
            duration: 100,
        });
    });

    const tabBarAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
        () => ({
            paddingTop: rendered ? headerHeight + tabBarHeight : 0,
            minHeight: screenHeight + headerDiff,
        }),
        [rendered, headerHeight, screenHeight, headerDiff, tabBarHeight]
    );

    const sharedProps = useMemo<Partial<VirtualizedListProps<any>>>(
        () => ({
            contentContainerStyle,
            scrollEventThrottle: 16,
            scrollIndicatorInsets: { top: heightExpanded },
        }),
        [contentContainerStyle, heightExpanded]
    );

    const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
        () => [
            rendered ? styles.tabBarContainer : undefined,
            { top: rendered ? headerHeight : undefined },
            tabBarAnimatedStyle,
        ],
        [rendered, headerHeight, tabBarAnimatedStyle]
    );

    const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
        () => [
            rendered ? styles.headerContainer : undefined,
            headerAnimatedStyle,
        ],

        [rendered, headerAnimatedStyle]
    );

    const scrollTo = useCallback(
        (offsetY: number) => {
            // Update the current scroll value
            scrollValues[tabIndex].value = offsetY;
        },
        [scrollValues, tabIndex]
    );

    return {
        tabIndex,
        headerHeight,
        rendered,
        contentContainerStyle,
        sharedProps,
        tabBarStyle,
        headerContainerStyle,
        handleTabIndexChange,
        handleHeaderLayout,
        scrollTo,
    };
}

export default useScrollableTab;

const styles = StyleSheet.create({
    tabBarContainer: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: 1,
    },
    headerContainer: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: 1,
    },
});
