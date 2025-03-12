/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const baseConfig = getDefaultConfig(__dirname);

const config = wrapWithReanimatedMetroConfig(
    withNativeWind(baseConfig, {
        input: './global.css',
    })
);

module.exports = config;
