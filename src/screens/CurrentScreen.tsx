import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Signs } from '@utils/constants';
import { utcToZonedTime, format } from 'date-fns-tz';
import colors from '@styles/colors';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { MainBottomSheet } from '@components/MainBottomSheet';
import { ICityName, Status } from '@storage/types';
import { isSameMinute } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../store/store';
import { createGetWeatherAction } from '../store/slices/weatherSlice';
import { PlaceSkeleton } from '@components/PlaceSkeleton';

const image = {
    src: require('@assets/icons/background-image.png'),
};

// const initialArgument: IWeatherComponent = {
//     warningType: WarningType.Thunderstorm,
//     timeRelatedArray: [
//         { time: '2023-03-19 20:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 21:00:00.000', weatherType: WeatherType.Thunderstorm, temperature: 12 },
//         { time: '2022-09-27 22:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 23:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 24:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 25:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 26:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 27:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 28:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 29:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 30:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//         { time: '2022-09-27 31:00:00.000', weatherType: WeatherType.Sunny, temperature: 12 },
//     ],
//     dateRelatedArray: [
//         { date: '2023-03-19 18:00:00.000', weatherType: WeatherType.Sunny, dayTemp: 21, nightTemp: 15 },
//         {
//             date: '2023-03-20 18:00:00.000',
//             weatherType: WeatherType.Thunderstorm,
//             dayTemp: 21,
//             nightTemp: 15,
//         },
//         { date: '2023-03-21 18:00:00.000', weatherType: WeatherType.Sunny, dayTemp: 21, nightTemp: 15 },
//         { date: '2023-03-22 18:00:00.000', weatherType: WeatherType.Sunny, dayTemp: 21, nightTemp: 15 },
//         {
//             date: '2023-03-23 18:00:00.000',
//             weatherType: WeatherType.Thunderstorm,
//             dayTemp: 21,
//             nightTemp: 15,
//         },
//         { date: '2023-03-24 18:00:00.000', weatherType: WeatherType.Sunny, dayTemp: 21, nightTemp: 15 },
//         { date: '2023-03-25 18:00:00.000', weatherType: WeatherType.Sunny, dayTemp: 21, nightTemp: 15 },
//     ],
//     extraInfoArray: [
//         { type: ExtraInfoType.Precipitation, digitalValue: 12 },
//         { type: ExtraInfoType.RealFeel, digitalValue: 12 },
//         { type: ExtraInfoType.Visibility, digitalValue: 12 },
//         { type: ExtraInfoType.Humidity, digitalValue: 12 },
//     ],
// };

const createCurrentDate = (timeZoneValue: number) => {
    const londonTime = utcToZonedTime(new Date(), 'Europe/London');
    const currentDate = londonTime.setSeconds(londonTime.getSeconds() + timeZoneValue - 3600);
    return currentDate;
};
interface ICurrentScreenProps {
    name: ICityName;
    index: number;
    selectedIndex: number;
}
export const CurrentScreen: React.FC<ICurrentScreenProps> = props => {
    // const [weatherData, setWeatherData] = useState(initialArgument);

    const {
        status,
        error,
        data: weather,
    } = useAppSelector(store => store.weather[props.name.nameCity] ?? { status: Status.Idle });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === Status.Idle) {
            dispatch(createGetWeatherAction(props.name.nameCity));
        }
    }, [status]);

    const [currentTime, setCurrentDate] = useState<number | undefined>(
        weather ? createCurrentDate(weather?.cityWeather.timeZone) : undefined,
    );

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
    });

    if (status === Status.Idle || status === Status.Pending) {
        return (
            <View style={styles.wrapper}>
                <PlaceSkeleton />

                <MainBottomSheet index={props.index} selectedIndex={props.selectedIndex} nameCity={props.name} />
            </View>
        );
    }

    if (status === Status.Error || !weather || !currentTime) {
        return (
            <View style={[styles.wrapper, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text>{error?.message}</Text>
            </View>
        );
    }

    return (
        <ImageBackground source={image.src} style={styles.wrapper} imageStyle={styles.backgroundImage}>
            <View style={styles.wrapperHeader}>
                <View style={styles.wrapperOfLocalInfo}>
                    <Text style={styles.locationContent}>{props.name.nameCity}</Text>
                    <Text style={styles.timeContent}>{format(currentTime, 'HH:mm')}</Text>
                </View>
            </View>
            <Text style={styles.temperatureContent}>{weather.cityWeather.mainTemp + Signs.CELSIUS}</Text>
            <MainBottomSheet index={props.index} selectedIndex={props.selectedIndex} nameCity={props.name} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    wrapperHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapper: {
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        height: '105%',
        width: '140%',
    },
    wrapperOfLocalInfo: {
        marginTop: 60,
        marginLeft: MAIN_HORIZONTAL_OFFSET,
    },
    locationContent: {
        color: colors.WHITE,
        fontFamily: 'ExpandedBold',
        fontSize: 22,
    },
    timeContent: {
        marginTop: 10,
        color: colors.WHITE,
        fontFamily: 'ExpandedSemiBold',
        fontSize: 14,
    },
    temperatureContent: {
        fontFamily: 'ExpandedBold',
        fontSize: 80,
        color: colors.WHITE,
        marginTop: 18,
        marginLeft: MAIN_HORIZONTAL_OFFSET,
    },
});

const skeletonStyles = {
    time: {
        marginTop: 5,
        width: 100,
        height: 20,
        borderRadius: 12,
    },
    mainTemp: {
        marginLeft: MAIN_HORIZONTAL_OFFSET,
        marginTop: 20,
        width: 100,
        height: 100,
        borderRadius: 12,
    },
};
