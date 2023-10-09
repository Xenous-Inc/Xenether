import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '@styles/colors';
import PagerView from 'react-native-pager-view';
import { CurrentScreen } from '@screens/CurrentScreen';
import * as Location from 'expo-location';
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

const apiKey = 'f467ce1b7a6266168a069f38c99d7029';

export const MainScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<TMainStackParams, typeof Screens.Main.MAIN>,
        NativeStackScreenProps<TAppStackParams>
    >
> = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { data: cities, status } = useAppSelector(state => state.cities);
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
        const data = await getWeather(coords);
        dispatch(createGetWeatherAction(data.name));
        dispatch(createGetCityAction(data.name));
    };

    if (status === Status.Idle) {
        getDataByLocation();
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
    containerButton: {
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_WHITE,
        width: 52,
        height: 52,
        borderRadius: 15,
        position: 'absolute',
        zIndex: 1,
        right: 20,
    },
    iconSettings: {
        marginTop: 14,
        width: 22,
        height: 22,
    },
});
