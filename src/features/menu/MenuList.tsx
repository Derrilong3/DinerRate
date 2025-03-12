/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, memo, useCallback, useState } from 'react';
import {
    ListRenderItem,
    SectionListProps,
    StyleSheet,
    View,
    Text,
    ViewStyle,
    StyleProp,
    SectionList as RNSectionList,
} from 'react-native';
import { useColorScheme } from 'nativewind';

import Item from '@/features/types/Item';
import SectionList from '@/features/core/sectionList/SectionList';
import { cn } from '@/lib/merge';
import { useAppSelector } from '@/lib/hooks';
import { selectToken } from '@/slices/authSlice';

import MenuItem from './MenuItem';
import AddReviewModal from './AddReviewModal';

type Props = Omit<SectionListProps<Item>, 'renderItem'> & {
    tabBarStyle?: ViewStyle | StyleProp<ViewStyle>;
};

const MenuList = forwardRef<RNSectionList<Item>, Props>(
    function MenuList(props, ref) {
        const { colorScheme } = useColorScheme();
        const [modalVisible, setModalVisible] = useState(false);
        const [selectedItem, setSelectedItem] = useState<Item>();
        const token = useAppSelector(selectToken);

        const keyExtractor = useCallback(
            (item: Item, _index: number) => item.id,
            []
        );

        const handleClose = useCallback(() => {
            setSelectedItem(undefined);
            setModalVisible(false);
        }, []);

        const handlePress = useCallback((item: Item) => {
            setSelectedItem(item);
            setModalVisible(true);
        }, []);

        const renderItem = useCallback<ListRenderItem<Item>>(
            ({ item }) => (
                <MenuItem item={item} disabled={!token} OnPress={handlePress} />
            ),
            [token, handlePress]
        );

        const renderSeparator = useCallback<ListRenderItem<Item>>(
            () => <View className='h-4' />,
            []
        );

        return (
            <View className='flex-1 bg-white dark:bg-eerieBlack '>
                <SectionList
                    ref={ref}
                    keyExtractor={keyExtractor}
                    stickySectionHeadersEnabled={false}
                    scrollToLocationOffset={100}
                    ItemSeparatorComponent={renderSeparator}
                    renderTab={({ title, isActive }) => (
                        <View
                            className={cn(
                                'border-b-[#090909] dark:border-b dark:border-b-[#2b2b2b] dark:bg-eerieBlack',
                                {
                                    'border-b dark:border-b-0': isActive,
                                }
                            )}
                        >
                            <Text
                                className={cn(
                                    'p-4 text-[#9e9e9e] text-lg font-medium',
                                    {
                                        'text-[#090909] dark:text-white':
                                            isActive,
                                    }
                                )}
                            >
                                {title}
                            </Text>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <View>
                            <View className='h-2 text-xl bg-[#f4f4f4] dark:bg-[#2b2b2b] border-y border-y-[#f4f4f4] dark:border-y-[#2b2b2b] mt-4' />
                            <Text className='text-center text-xl text-black dark:text-gray-100 font-bold px-4 py-4'>
                                {section.title}
                            </Text>
                        </View>
                    )}
                    renderItem={renderItem}
                    {...props}
                    tabBarStyle={[
                        props.tabBarStyle,
                        styles.tabBar,
                        {
                            borderBottomColor:
                                colorScheme === 'light' ? '#f4f4f4' : '#181818',
                        },
                    ]}
                />

                {token && (
                    <AddReviewModal
                        visible={modalVisible}
                        onClose={handleClose}
                        item={selectedItem}
                    />
                )}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderBottomWidth: 2,
    },
});

export default memo(MenuList);
