import React, { ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { cn } from '@/lib/merge';

interface ModalViewProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    containerClassName?: string;
    children: ReactNode;
}

function ModalView({
    visible,
    onClose,
    onSubmit,
    containerClassName,
    children,
}: ModalViewProps) {
    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
                animationType='fade'
                onRequestClose={onClose}
            >
                <ScrollView
                    scrollEnabled={false}
                    className='bg-black/50'
                    contentContainerClassName='flex-1 justify-center items-center'
                >
                    <View
                        className={cn(
                            'w-4/5 bg-white dark:bg-eerieBlack rounded-lg p-5 shadow-lg',
                            containerClassName
                        )}
                    >
                        {children}

                        <View className='flex-row justify-between'>
                            <TouchableOpacity
                                className='flex-1 bg-green-500 p-2 rounded-md mr-2 items-center'
                                onPress={onSubmit}
                            >
                                <Text className='text-white text-base font-bold'>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className='flex-1 bg-red-500 p-2 rounded-md ml-2 items-center'
                                onPress={onClose}
                            >
                                <Text className='text-white text-base font-bold'>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}

export default ModalView;
