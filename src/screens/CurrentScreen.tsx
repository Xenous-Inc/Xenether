import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    GestureResponderEvent,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Signs } from '@utils/constants';
import { utcToZonedTime, format } from 'date-fns-tz';
import Colors from '@styles/colors';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { MainBottomSheet } from '@components/MainBottomSheet';
import { ICityName, Status } from '@storage/types';
import { isSameMinute } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../store/store';
import { createGetWeatherAction } from '../store/slices/weatherSlice';
import { PlaceSkeleton } from '@components/PlaceSkeleton';
import SkeletonLoader from 'expo-skeleton-loader';
import { useTheme } from '../model/themeContext';
import { Theme } from '@storage/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const PlaceCurruntScreenSkeleton: React.FC = () => {
    const theme = useTheme();
    const skeletonStyles = {
        wrapper: {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
        },
        localInfoContent: {
            marginLeft: MAIN_HORIZONTAL_OFFSET,
        },
        cityNameSkeleton: {
            borderRadius: 14,
            marginTop: 80,
            height: Dimensions.get('window').height * 0.03,
            width: Dimensions.get('window').width * 0.45,
        },
        timeSkeleton: {
            borderRadius: 14,
            marginTop: 10,
            height: Dimensions.get('window').height * 0.03,
            width: Dimensions.get('window').width * 0.25,
        },
        tempSkeleton: {
            borderRadius: 22,
            marginLeft: MAIN_HORIZONTAL_OFFSET + 50,
            marginTop: 30,
            height: Dimensions.get('window').height * 0.12,
            width: Dimensions.get('window').width * 0.28,
        },
    };

    return (
        <SkeletonLoader
            style={{ backgroundColor: theme.themeMode === Theme.DARK ? Colors.BLACK : Colors.WHITE }}
            boneColor={Colors.LIGHT_WHITE}
            highlightColor={Colors.LIGHT_GRAY}
            duration={1200}
        >
            <SkeletonLoader.Container style={skeletonStyles.wrapper}>
                <SkeletonLoader.Container style={skeletonStyles.localInfoContent}>
                    <SkeletonLoader.Item style={skeletonStyles.cityNameSkeleton} />
                    <SkeletonLoader.Item style={skeletonStyles.timeSkeleton} />
                </SkeletonLoader.Container>
                <SkeletonLoader.Item style={skeletonStyles.tempSkeleton} />
            </SkeletonLoader.Container>
        </SkeletonLoader>
    );
};

export const CurrentScreen: React.FC<ICurrentScreenProps> = props => {
    // const [weatherData, setWeatherData] = useState(initialArgument);
    const insets = useSafeAreaInsets();
    const { onPress } = props;
    const {
        status,
        error,
        data: weather,
    } = useAppSelector(store => store.weather[props.name.nameCity] ?? { status: Status.Idle });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === Status.Idle || !weather) {
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
    }, [currentTime]);

    if (status === Status.Idle || status === Status.Pending) {
        return (
            <View style={styles.wrapper}>
                <PlaceCurruntScreenSkeleton />

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
            <TouchableOpacity style={[styles.containerButton, { top: insets.top + 32 }]} onPress={onPress}>
                <Image source={require('@assets/icons/settings_icon.png')} style={styles.iconSettings} />
            </TouchableOpacity>
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
        color: Colors.WHITE,
        fontFamily: 'ExpandedBold',
        fontSize: 22,
    },
    timeContent: {
        marginTop: 10,
        color: Colors.WHITE,
        fontFamily: 'ExpandedSemiBold',
        fontSize: 14,
    },
    temperatureContent: {
        fontFamily: 'ExpandedBold',
        fontSize: 80,
        color: Colors.WHITE,
        marginTop: 18,
        marginLeft: MAIN_HORIZONTAL_OFFSET,
    },
    containerButton: {
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_WHITE,
        width: 52,
        height: 52,
        borderRadius: 15,
        position: 'absolute',
        zIndex: 0,
        right: 20,
    },
    iconSettings: {
        marginTop: 14,
        width: 22,
        height: 22,
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
