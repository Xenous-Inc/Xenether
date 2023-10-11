import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import Colors from '@styles/colors';
import PagerView from 'react-native-pager-view';
import { CurrentScreen } from '@screens/CurrentScreen';
import * as Location from 'expo-location';
import { PermissionStatus } from 'expo-location';
import { Screens, Stacks } from '@navigation/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TAppStackParams } from '@navigation/AppNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { TMainStackParams } from '@navigation/stacks/MainStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../store/store';
import { PlaceSkeleton } from '@components/PlaceSkeleton';
import { Status } from '@storage/types';
import { createGetWeatherAction } from '../store/slices/weatherSlice';
import { createGetCityAction } from '../store/slices/citySlice';
import { useTheme } from '../model/themeContext';
import { Theme } from '@storage/constants';

const apiKey = 'f467ce1b7a6266168a069f38c99d7029';

export const MainScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<TMainStackParams, typeof Screens.Main.MAIN>,
        NativeStackScreenProps<TAppStackParams>
    >
> = props => {
    const theme = useTheme();
    const { navigation } = props;
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const { data: cities, status: city_status } = useAppSelector(state => state.cities);
    type TCoords = {
        long: number;
        lat: number;
    };
    const dispatch = useAppDispatch();

    const getCurrentLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const response = await Location.getCurrentPositionAsync({});
            const coords: TCoords = { long: response.coords.longitude, lat: response.coords.latitude };
            return coords;
        } catch (error) {
            return null;
        }
    };

    const getWeather = async (result: TCoords | null) => {
        const coords = await result;
        if (coords) {
            const weather = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${apiKey}&units=metric&lang=ru`,
            );
            const data = await weather.json();
            console.log(data);
            return data;
        }
    };

    const getDataByLocation = async () => {
        const coords: TCoords | null = await getCurrentLocation();
        if (coords) {
            const data = await getWeather(coords);
            dispatch(createGetWeatherAction(data.name));
            dispatch(createGetCityAction(data.name));
        }
        return undefined;
    };

    if (city_status === Status.Idle && status?.status === PermissionStatus.GRANTED) {
        getDataByLocation();
    }
    if (status?.status !== PermissionStatus.GRANTED || cities?.length === 0) {
        return (
            <View style={[styles.empty_cities_wrapper, { backgroundColor: theme.colors.accentColor }]}>
                <Image
                    source={
                        theme.themeMode === Theme.DARK
                            ? require('@assets/icons/white-sun.png')
                            : require('@assets/icons/icon-sun.png')
                    }
                    style={styles.empty_cities_icon}
                />
                <Text style={[styles.empty_cities_message, { color: theme.colors.textcolor }]}>
                    Пока что тут нет городов
                </Text>
                <Text style={[styles.empty_cities_comment, { color: theme.colors.textcolor }]}>
                    Вы можете добавить город в{' '}
                    <Text
                        style={styles.empty_cities_button}
                        onPress={() => navigation.navigate(Stacks.SETTINGS, { screen: Screens.Settings.MAIN })}
                    >
                        настройках
                    </Text>
                </Text>
            </View>
        );
    }
    return (
        <>
            <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                onPageSelected={event => setCurrentIndex(event.nativeEvent.position)}
            >
                {cities ? (
                    cities.map((city, index) => (
                        <CurrentScreen key={city.nameCity} name={city} index={index} selectedIndex={currentIndex} />
                    ))
                ) : (
                    <PlaceSkeleton />
                )}
            </PagerView>
        </>
    );
};

const styles = StyleSheet.create({
    empty_cities_wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty_cities_message: {
        fontFamily: 'ExpandedBold',
        fontSize: 14,
        marginBottom: 10,
    },
    empty_cities_comment: {
        fontFamily: 'ExpandedSemiBold',
        fontSize: 12,
    },
    empty_cities_button: {
        color: Colors.LIGHT_ORANGE,
        fontFamily: 'ExpandedBold',
        fontSize: 12,
    },
    empty_cities_icon: {
        marginBottom: 20,
        height: 40,
        width: 36,
    },
});
