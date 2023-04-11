import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { utcToZonedTime, format } from 'date-fns-tz';
import { isSameMinute } from 'date-fns';
import { ru } from 'date-fns/locale';
import colors from '@styles/colors';
import { Signs } from '@utils/constants';

export interface ICityComponent {
    location: string;
    timeZone: string;
}

const initialCityData = {
    weatherType: 'Облачно',
    temperature: 12,
    maxTemperature: 12,
    minTemperature: -3,
    image: require('@assets/icons/backgroundRain.png'),
};

export const CityComponent: React.FC<ICityComponent> = props => {
    const [cityData, setCityData] = useState(initialCityData);
    const [currentTime, setCurrentDate] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isSameMinute(currentTime, new Date())) {
                setCurrentDate(new Date());
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    });
    return (
        <ImageBackground source={cityData.image} style={styles.wrapper} imageStyle={styles.backgroundImage}>
            <View style={styles.mainContent}>
                <View>
                    <Text style={styles.city_title}>{props.location}</Text>
                    <Text style={styles.time}>
                        {format(utcToZonedTime(currentTime, props.timeZone), 'HH:mm', { locale: ru })}
                    </Text>
                </View>
                <Text style={styles.temperature}>{cityData.temperature + Signs.CELSIUS}</Text>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.weatherType}>{cityData.weatherType}</Text>
                <View style={styles.minMaxContainer}>
                    <Text style={styles.minMaxTemperature}>{'Макс: ' + cityData.maxTemperature + Signs.CELSIUS}</Text>
                    <Text style={styles.minMaxTemperature}>{'Мин: ' + cityData.minTemperature + Signs.CELSIUS}</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 103,
    },
    backgroundImage: {
        borderRadius: 16,
        width: '100%',
        height: '100%',
    },
    mainContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    bottomContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    city_title: {
        fontFamily: 'ExpandedBold',
        fontSize: 16,
        color: colors.WHITE,
        marginBottom: 3,
    },
    time: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 12,
        color: colors.WHITE,
    },
    temperature: {
        fontFamily: 'ExpandedBold',
        fontSize: 42,
        color: colors.WHITE,
    },
    weatherType: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 12,
        color: colors.WHITE,
    },
    minMaxContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    minMaxTemperature: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 12,
        color: colors.WHITE,
    },
});
