import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

enum Weathertype {
    Sunny,
    Thunderstorm,
}

export function WeatherIcon(type: Weathertype) {
    switch (type) {
        case Weathertype.Sunny:
            return (
                <View>
                    <Image source={require('@assets/icons/sun.png')} style={styles.sun} />
                </View>
            );
            break;
        case Weathertype.Thunderstorm:
            return (
                <View>
                    <Image source={require('@assets/icons/thunderstorm.png')} style={styles.thunderstorm} />
                </View>
            );
            break;
        default:
            return <Text>Missed</Text>;
    }
}

export default function UseWeatherIcons() {
    return WeatherIcon(Weathertype.Thunderstorm);
}

const styles = StyleSheet.create({
    sun: {
        width: 35,
        height: 35,
    },
    thunderstorm: {
        width: 41,
        height: 33,
    },
});
