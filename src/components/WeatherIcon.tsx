import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export enum WeatherType {
    Sunny,
    Thunderstorm,
}

interface IImageData {
    src: number;
    w: number;
    h: number;
}

type WeatherToImage = {
    [key in WeatherType]: IImageData;
};

const Images: WeatherToImage = {
    [WeatherType.Sunny]: {
        src: require('@assets/icons/sun.png'),
        w: 35,
        h: 35,
    },
    [WeatherType.Thunderstorm]: {
        src: require('@assets/icons/thunderstorm.png'),
        w: 42,
        h: 33,
    },
};

export const WeatherIcon: React.FC<{ weatherType: WeatherType }> = props => {
    const image = Images[props.weatherType];
    return (
        <View style={styles.wrapper}>
            <Image source={image.src} style={{ width: image.w, height: image.h }} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
});