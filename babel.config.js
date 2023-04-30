module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@assets': './src/assets',
                        '@components': './src/components',
                        '@styles': './src/styles',
                        '@navigation': './src/navigation',
                        '@screens': './src/screens',
                        '@utils': './src/utils',
                        '@storage': './src/storage',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
