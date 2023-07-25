import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '@styles/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { CurrentScreen } from '@screens/CurrentScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATIONS } from '@storage/constants';
import { ILocation } from '@storage/types';
import * as Location from 'expo-location';
import { Screens, Stacks } from '@navigation/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TAppStackParams } from '@navigation/AppNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { TMainStackParams } from '@navigation/stacks/MainStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const apiKey = 'f467ce1b7a6266168a069f38c99d7029';

export const MainScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<TMainStackParams, typeof Screens.Main.MAIN>,
        NativeStackScreenProps<TAppStackParams>
    >
> = props => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [locations, setLocations] = useState([]);

    const { navigation } = props;

    const insets = useSafeAreaInsets();

    const getDataFromStorage = async () => {
        const locationsRaw = await AsyncStorage.getItem(LOCATIONS);
        const loc = (JSON.parse(locationsRaw) as Array<ILocation>) || [];
        setLocations(loc);
        return loc;
    };

    useEffect(() => {
        (async () => {
            updateStorage([
                {
                    location: 'Омск',
                    locationId: '231231',
                    timeZone: 'Asia/Omsk',
                    latitude: -33.32,
                    longitude: -122.23,
                },
            ]);

            const storagelocations = await getDataFromStorage();
            const coords = await getCurrentLocation();
            if (coords === null) return;
            const weather = await getWeather(coords);

            if (weather === null) return;
            if (!locations.some(val => val.id === weather.id)) {
                const temp: ILocation = {
                    location: weather.name,
                    locationId: weather.id,
                    timeZone: weather.timezone,
                    latitude: coords.lat,
                    longitude: coords.long,
                };
                setLocations([temp, ...storagelocations]);
                updateStorage([temp, ...storagelocations]);
            }
        })();
    }, []);

    const getCurrentLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const response = await Location.getCurrentPositionAsync({});
            return { long: response.coords.longitude, lat: response.coords.latitude };
        } catch (error) {
            return null;
        }
    };

    const getWeather = async result => {
        const weather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.long}&appid=${apiKey}&units=metric&lang=ru`,
        );
        const data = await weather.json();
        return data;
    };

    const updateStorage = async (array: Array<ILocation>) => {
        await AsyncStorage.setItem(LOCATIONS, JSON.stringify(array));
    };
    return (
        <>
            <TouchableOpacity
                style={[styles.containerButton, { top: insets.top + 32 }]}
                onPress={() => navigation.navigate(Stacks.SETTINGS, { screen: Screens.Settings.MAIN })}
            >
                <Image source={require('@assets/icons/settings_icon.png')} style={styles.iconSettings} />
            </TouchableOpacity>
            <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                onPageSelected={event => setCurrentIndex(event.nativeEvent.position)}
            >
                {locations.map((val, index) => {
                    return (
                        <GestureHandlerRootView style={styles.container} key={index}>
                            <CurrentScreen
                                index={index}
                                selectedIndex={currentIndex}
                                location={val.location}
                                timeZone={'Asia/Omsk'}
                                temperature={15}
                            />
                        </GestureHandlerRootView>
                    );
                })}
            </PagerView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButton: {
        alignItems: 'center',
        backgroundColor: colors.LIGHT_WHITE,
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
