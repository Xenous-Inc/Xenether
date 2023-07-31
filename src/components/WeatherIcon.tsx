import React from 'react';
import { View, Image, StyleSheet, ViewProps } from 'react-native';

const iconSelection = (arg: number) => {
    switch (arg) {
        case 1000:
            return require('../assets/icons/Sun.png');
        case 1100:
            return require('../assets/icons/MostlySun.png');
        case 1101:
            return require('../assets/icons/PartlyCloudy.png');
        case 1102:
            return require('../assets/icons/MostlyCloudy.png');
        case 1001:
            return require('../assets/icons/Cloudy.png');
        case 2000:
            return require('../assets/icons/Fog.png');
        case 2100:
            return require('../assets/icons/Fog.png');
        case 4000:
            return require('../assets/icons/Drizzle.png');
        case 4001:
            return require('../assets/icons/Rain.png');
        case 4200:
            return require('../assets/icons/Drizzle.png');
        case 4201:
            return require('../assets/icons/HeavyRain.png');
        case 5000:
            return require('../assets/icons/MostlySun.png'); //?
        case 5001:
            return require('../assets/icons/MostlySun.png'); //?
        case 5100:
            return require('../assets/icons/MostlySun.png'); //?
        case 5101:
            return require('../assets/icons/MostlySun.png'); //?
        case 6000:
            return require('../assets/icons/Drizzle.png');
        case 6001:
            return require('../assets/icons/Rain.png');
        case 6200:
            return require('../assets/icons/MostlySun.png');
        case 6201:
            return require('../assets/icons/Rain.png');
        case 7000:
            return require('../assets/icons/MostlySun.png'); //?
        case 7101:
            return require('../assets/icons/MostlySun.png'); //?
        case 7102:
            return require('../assets/icons/MostlySun.png'); //?
        case 8000:
            return require('../assets/icons/HeavyThunderstorm.png');

        default:
            break;
    }
};

export const WeatherIcon: React.FC<{ weatherCode: number } & ViewProps> = props => {
    const { weatherCode, style, ...viewProps } = props;
    return (
        <View style={[styles.wrapper, style]} {...viewProps}>
            <Image source={iconSelection(weatherCode)} style={styles.img} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
});
