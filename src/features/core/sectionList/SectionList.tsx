import * as React from 'react';
import {
    View,
    SectionList as RNSectionList,
    SectionListProps,
    ViewStyle,
    SectionListData,
    StyleProp,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { forwardRef } from 'react';

import TabBar from './TabBar';

interface SectionProps extends SectionListProps<any> {
    scrollToLocationOffset?: number;
    tabBarStyle?: ViewStyle | StyleProp<ViewStyle>;
    renderTab: (section: SectionListData<any>) => React.ReactNode;
}

export const AnimatedSectionList = Animated.createAnimatedComponent(
    RNSectionList
) as typeof RNSectionList;

const SectionList = forwardRef<RNSectionList<any>, SectionProps>(
    function SectionList(
        { sections, renderTab, tabBarStyle, scrollToLocationOffset, ...props },
        ref
    ) {
        const [currentIndex, setCurrentIndex] = React.useState(0);
        const [blockUpdateIndex, setBlockUpdateIndex] = React.useState(false);
        const sectionList = React.useRef<RNSectionList<any>>(null);

        React.useImperativeHandle(
            ref,
            () => sectionList.current as RNSectionList<any>,
            []
        );

        const prepareSections = React.useMemo(
            () =>
                sections.map((item, index) => ({
                    ...item,
                    index,
                })),
            [sections]
        );

        const handleTabPress = React.useCallback(
            (index: number) => {
                setCurrentIndex(index);
                setBlockUpdateIndex(true);

                if (sectionList.current?.scrollToLocation) {
                    sectionList.current.scrollToLocation({
                        animated: true,
                        itemIndex: 0,
                        viewOffset: scrollToLocationOffset || 0,
                        sectionIndex: index,
                    });
                }
            },
            [scrollToLocationOffset]
        );

        const handleViewableItemsChanged = React.useCallback(
            ({ viewableItems }: any) => {
                if (!blockUpdateIndex && viewableItems[0]) {
                    const newIndex = viewableItems[0].section.index;
                    if (currentIndex !== newIndex) {
                        setCurrentIndex(newIndex);
                    }
                }
            },
            [blockUpdateIndex, currentIndex]
        );

        const handleMomentumScrollEnd = React.useCallback(() => {
            setBlockUpdateIndex(false);
        }, []);

        return (
            <View className='flex-1'>
                <TabBar
                    sections={prepareSections}
                    renderTab={renderTab}
                    tabBarStyle={tabBarStyle}
                    currentIndex={currentIndex}
                    onPress={handleTabPress}
                />

                <AnimatedSectionList
                    {...props}
                    sections={prepareSections}
                    onViewableItemsChanged={handleViewableItemsChanged}
                    viewabilityConfig={{
                        minimumViewTime: 10,
                        itemVisiblePercentThreshold: 10,
                    }}
                    ref={sectionList}
                    onTouchEnd={handleMomentumScrollEnd}
                />
            </View>
        );
    }
);

export default React.memo(SectionList);
