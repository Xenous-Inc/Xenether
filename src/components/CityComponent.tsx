import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, Pressable } from 'react-native';
import { utcToZonedTime, format } from 'date-fns-tz';
import { isSameMinute } from 'date-fns';
import Colors from '@styles/colors';
import { Signs } from '@utils/constants';
import { ICityName, Status } from '@storage/types';
import { IconValue } from '@utils/constants';
import { useAppDispatch, useAppSelector } from '../store/store';
import { removeCity } from '../store/slices/citySlice';
import { createGetWeatherAction } from '../store/slices/weatherSlice';
import SkeletonLoader from 'expo-skeleton-loader';

const createCurrentDate = (timeZoneValue: number) => {
    const londonTime = utcToZonedTime(new Date(), 'Europe/London');
    const currentDate = londonTime.setSeconds(londonTime.getSeconds() + timeZoneValue - 3600);
    return currentDate;
};
const iconSelection = (arg?: string) => {
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
            return require('../assets/icons/clearNight.png'); // FIXME:default
    }
};

interface ICityComponentProps {
    name: ICityName;
}

export const CityComponent: React.FC<ICityComponentProps> = props => {
    const {
        status,
        data: weather,
        error,
    } = useAppSelector(store => store.weather[props.name.nameCity] ?? { status: Status.Idle });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === Status.Idle || !weather) {
            dispatch(createGetWeatherAction(props.name.nameCity));
        }
    }, [status]);

    const [currentTime, setCurrentDate] = useState<number | undefined>(
        weather ? createCurrentDate(weather.cityWeather.timeZone) : undefined,
    ); //timeZone
    useEffect(() => {
        if (weather) {
            setCurrentDate(createCurrentDate(weather.cityWeather.timeZone));
        }
    }, [weather]);
    useEffect(() => {
        if (currentTime && weather) {
            const intervalId = setInterval(() => {
                if (!isSameMinute(currentTime, createCurrentDate(weather.cityWeather.timeZone))) {
                    setCurrentDate(createCurrentDate(weather.cityWeather.timeZone));
                }
            }, 1000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [currentTime]);
    if (weather && currentTime) {
        return (
            <ImageBackground
                source={iconSelection(props.name.icon)}
                style={styles.wrapper}
                imageStyle={styles.backgroundImage}
            >
                <Pressable style={styles.buttonClose} onPress={() => dispatch(removeCity(props.name.nameCity))}>
                    <Image style={styles.iconClose} source={require('@assets/icons/close-sheet.png')} />
                </Pressable>
                <View style={styles.mainContent}>
                    <View>
                        <Text style={styles.city_title}>{props.name.nameCity}</Text>
                        <Text style={styles.time}>{format(currentTime, 'HH:mm')}</Text>
                    </View>
                    <Text style={styles.temperature}>{weather.cityWeather.mainTemp + Signs.CELSIUS}</Text>
                </View>
                <View style={styles.bottomContent}>
                    <Text style={styles.weatherType}>
                        {weather.cityWeather.description.charAt(0).toUpperCase() +
                            weather.cityWeather.description.slice(1)}
                    </Text>
                    <View style={styles.minMaxContainer}>
                        <Text style={styles.minMaxTemperature}>
                            {'Макс: ' + weather.cityWeather.maxTemp + Signs.CELSIUS}
                        </Text>
                        <Text style={styles.minMaxTemperature}>
                            {'Мин: ' + weather.cityWeather.minTemp + Signs.CELSIUS}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
    return (
        <SkeletonLoader duration={1500} boneColor={Colors.GRAY} highlightColor={Colors.WHITE}>
            <SkeletonLoader.Item style={skeletonStyles.content} />
        </SkeletonLoader>
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
        color: Colors.WHITE,
        marginBottom: 3,
    },
    time: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 12,
        color: Colors.WHITE,
    },
    temperature: {
        fontFamily: 'ExpandedBold',
        fontSize: 42,
        color: Colors.WHITE,
    },
    weatherType: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 12,
        color: Colors.WHITE,
    },
    minMaxContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    minMaxTemperature: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 12,
        color: Colors.WHITE,
    },
    buttonClose: {
        position: 'absolute',
        backgroundColor: Colors.EXTRA_LIGHT_GRAY,
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
const skeletonStyles = {
    cityName: {
        width: 90,
        height: 20,
        borderRadius: 12,
    },
    time: {
        marginTop: 4,
        width: 90,
        height: 20,
        borderRadius: 12,
    },
    mainTemp: {
        marginRight: 10,
        width: 55,
        height: 50,
        borderRadius: 12,
    },
    description: {
        width: 90,
        height: 20,
        marginBottom: 10,
        borderRadius: 12,
    },
    minMaxTemp: {
        width: 105,
        height: 20,
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 12,
    },
    content: {
        marginTop: 15,
        width: 350,
        height: 103,
        borderRadius: 16,
    },
};
