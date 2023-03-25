import React from 'react';
import { View, Image, StyleSheet, ViewProps } from 'react-native';

export enum WeatherType {
    Sunny,
    Thunderstorm,
}

interface IImageData {
    src: number;
}

type WeatherToImage = {
    [key in WeatherType]: IImageData;
};

const Images: WeatherToImage = {
    [WeatherType.Sunny]: {
        src: require('@assets/icons/sun.png'),
    },
    [WeatherType.Thunderstorm]: {
        src: require('@assets/icons/thunderstorm.png'),
    },
};

export const WeatherIcon: React.FC<{ weatherType: WeatherType } & ViewProps> = props => {
    const { weatherType, style, ...viewProps } = props;
    const image = Images[weatherType];
    return (
        <View style={[styles.wrapper, style]} {...viewProps}>
            <Image source={image.src} style={styles.img} />
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
    img: {
        resizeMode: 'contain',
    },
});
