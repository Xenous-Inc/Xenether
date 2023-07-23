import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, Pressable } from 'react-native';
import { utcToZonedTime, format } from 'date-fns-tz';
import { isSameMinute } from 'date-fns';
import colors from '@styles/colors';
import { Signs } from '@utils/constants';
import { ICity } from '@storage/types';
import { IconValue } from '@utils/constants';
import { useAppDispatch } from '../store/store';
import { removeCity } from '../store/slices/citySlice';

const createCurrentDate = timeZoneValue => {
    const londonTime = utcToZonedTime(new Date(), 'Europe/London');
    const currentDate = londonTime.setSeconds(londonTime.getSeconds() + timeZoneValue - 3600);
    return currentDate;
};
const iconSelection = (arg: string) => {
    switch (arg) {
        case IconValue.DAY.CLEAR_SKY:
            return require('../assets/icons/clearDay.png');
        case IconValue.DAY.FEW_CLOUDS:
            return require('../assets/icons/cloudyDay.png');
        case IconValue.DAY.SCATTERED_CLOUDS:
            return require('../assets/icons/hazeDay.png');
        case IconValue.DAY.BROKEN_CLOUDS:
            return require('../assets/icons/clearingCloudsDay.png');
        case IconValue.DAY.SHOWER_RAIN:
            return require('../assets/icons/showerRainDay.png');
        case IconValue.DAY.RAIN:
            return require('../assets/icons/rainDay.png');
        case IconValue.DAY.THUNDERSTORM:
            return require('../assets/icons/thunderstormDay.png');
        case IconValue.DAY.SNOW:
            return require('../assets/icons/snowDay.png');
        case IconValue.DAY.MIST:
            return require('../assets/icons/windyDay.png');
        case IconValue.NIGHT.CLEAR_SKY:
            return require('../assets/icons/clearNight.png');
        case IconValue.NIGHT.FEW_CLOUDS:
            return require('../assets/icons/cloudyNight.png');
        case IconValue.NIGHT.SCATTERED_CLOUDS:
            return require('../assets/icons/hazeNight.png');
        case IconValue.NIGHT.BROKEN_CLOUDS:
            return require('../assets/icons/clearingCloudsNight.png');
        case IconValue.NIGHT.SHOWER_RAIN:
            return require('../assets/icons/showerRainNight.png');
        case IconValue.NIGHT.RAIN:
            return require('../assets/icons/rainNight.png');
        case IconValue.NIGHT.THUNDERSTORM:
            return require('../assets/icons/thunderstormNight.png');
        case IconValue.NIGHT.SNOW:
            return require('../assets/icons/snowNight.png');
        case IconValue.NIGHT.MIST:
            return require('../assets/icons/windyNight.png');
        default:
            break;
    }
};

export const CityComponent: React.FC<ICity> = props => {
    const dispatch = useAppDispatch();
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
        <ImageBackground source={iconSelection(props.icon)} style={styles.wrapper} imageStyle={styles.backgroundImage}>
            <Pressable style={styles.buttonClose} onPress={() => dispatch(removeCity(props.nameCity))}>
                <Image style={styles.iconClose} source={require('@assets/icons/close-sheet.png')} />
            </Pressable>
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
        marginTop: 15,
        width: 350,
        height: 103,
    },
    backgroundImage: {
        borderRadius: 16,
        width: '100%',
        height: 106,
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
    buttonClose: {
        position: 'absolute',
        backgroundColor: colors.EXTRA_LIGHT_GRAY,
        borderRadius: 10,
        width: 17,
        height: 17,
        marginLeft: 327,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconClose: {
        width: 8,
        height: 8,
    },
});
