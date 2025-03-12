import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    LayoutChangeEvent,
    LayoutRectangle,
    SectionListData,
    ViewStyle,
    StyleProp,
} from 'react-native';
import Animated from 'react-native-reanimated';

const WindowWidth = Dimensions.get('window').width;

interface IProps {
    sections: SectionListData<any>[];
    renderTab: (section: SectionListData<any>) => React.ReactNode;
    tabBarStyle?: ViewStyle | StyleProp<ViewStyle>;
    currentIndex: number;
    onPress: (index: number) => void;
}

interface ITabMeasurements {
    left: number;
    right: number;
    width: number;
    height: number;
}

interface ITabsLayoutRectangle {
    [index: number]: ITabMeasurements;
}

function TabBar({
    sections,
    renderTab,
    tabBarStyle,
    currentIndex,
    onPress,
}: IProps) {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const [tabContainerMeasurements, setTabContainerMeasurements] =
        React.useState<LayoutRectangle | null>(null);
    const [tabsMeasurements, setTabsMeasurements] =
        React.useState<ITabsLayoutRectangle>({});

    const getScrollAmount = React.useCallback(() => {
        const position = currentIndex;
        const pageOffset = 0;

        const containerWidth = WindowWidth;
        const tabWidth = tabsMeasurements[position]?.width || 0;
        const nextTabMeasurements = tabsMeasurements[position + 1];
        const nextTabWidth = nextTabMeasurements?.width || 0;
        const tabOffset = tabsMeasurements[position]?.left || 0;
        const absolutePageOffset = pageOffset * tabWidth;
        let newScrollX = tabOffset + absolutePageOffset;

        newScrollX -=
            (containerWidth -
                (1 - pageOffset) * tabWidth -
                pageOffset * nextTabWidth) /
            2;
        newScrollX = newScrollX >= 0 ? newScrollX : 0;

        const rightBoundScroll = Math.max(
            (tabContainerMeasurements?.width || 0) - containerWidth,
            0
        );

        newScrollX =
            newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
        return newScrollX;
    }, [currentIndex, tabsMeasurements, tabContainerMeasurements]);

    React.useEffect(() => {
        if (scrollViewRef.current && tabContainerMeasurements) {
            scrollViewRef.current.scrollTo({
                x: getScrollAmount(),
                animated: true,
            });
        }
    }, [currentIndex, getScrollAmount, tabContainerMeasurements]);

    const onTabContainerLayout = (e: LayoutChangeEvent) => {
        setTabContainerMeasurements(e.nativeEvent.layout);
    };

    const onTabLayout = (key: number) => (ev: LayoutChangeEvent) => {
        const { x, width, height } = ev.nativeEvent.layout;
        setTabsMeasurements((prev) => ({
            ...prev,
            [key]: {
                left: x,
                right: x + width,
                width,
                height,
            },
        }));
    };

    const renderTabItem = (section: SectionListData<any>, key: number) => {
        const isActive = currentIndex === key;

        return (
            <TouchableOpacity
                onPress={() => onPress(key)}
                key={key}
                onLayout={onTabLayout(key)}
            >
                {renderTab({ isActive, ...section })}
            </TouchableOpacity>
        );
    };

    return (
        <Animated.View style={[{ width: WindowWidth }, tabBarStyle]}>
            <ScrollView
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerClassName='flex flex-row'
            >
                <View onLayout={onTabContainerLayout} className='flex flex-row'>
                    {sections.map(renderTabItem)}
                </View>
            </ScrollView>
        </Animated.View>
    );
}

export default TabBar;
