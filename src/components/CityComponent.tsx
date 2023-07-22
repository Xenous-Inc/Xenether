import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { utcToZonedTime, format } from 'date-fns-tz';
import { isSameMinute } from 'date-fns';
import colors from '@styles/colors';
import { Signs } from '@utils/constants';
import { ICity } from '@storage/types';

const createCurrentDate = timeZoneValue => {
    const londonTime = utcToZonedTime(new Date(), 'Europe/London');
    const currentDate = londonTime.setSeconds(londonTime.getSeconds() + timeZoneValue - 3600);
    return currentDate;
};

export const CityComponent: React.FC<ICity> = props => {
    const [currentTime, setCurrentDate] = useState(createCurrentDate(props.timeZone));
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isSameMinute(currentTime, createCurrentDate(props.timeZone))) {
                setCurrentDate(createCurrentDate(props.timeZone));
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    });
    return (
        <ImageBackground
            source={require('@assets/icons/backgroundRain.png')} // for example
            style={styles.wrapper}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.mainContent}>
                <View>
                    <Text style={styles.city_title}>{props.nameCity}</Text>
                    <Text style={styles.time}>{format(currentTime, 'HH:mm')}</Text>
                </View>
                <Text style={styles.temperature}>{props.mainTemp + Signs.CELSIUS}</Text>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.weatherType}>
                    {props.description.charAt(0).toUpperCase() + props.description.slice(1)}
                </Text>
                <View style={styles.minMaxContainer}>
                    <Text style={styles.minMaxTemperature}>{'Макс: ' + props.maxTemp + Signs.CELSIUS}</Text>
                    <Text style={styles.minMaxTemperature}>{'Мин: ' + props.minTemp + Signs.CELSIUS}</Text>
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
