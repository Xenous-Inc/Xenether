import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import colors from '@styles/colors';
import PagerView from 'react-native-pager-view';
import { CurrentScreen } from '@screens/CurrentScreen';
import * as Location from 'expo-location';
import { Screens, Stacks } from '@navigation/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TAppStackParams } from '@navigation/AppNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { TMainStackParams } from '@navigation/stacks/MainStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/store';

// const apiKey = 'f467ce1b7a6266168a069f38c99d7029';

export const MainScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<TMainStackParams, typeof Screens.Main.MAIN>,
        NativeStackScreenProps<TAppStackParams>
    >
> = props => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { navigation } = props;

    const insets = useSafeAreaInsets();

    const { error, status, cities } = useAppSelector(state => state.cities);

    // const getCurrentLocation = async () => {
    //     try {
    //         await Location.requestForegroundPermissionsAsync();
    //         const response = await Location.getCurrentPositionAsync({});
    //         return { long: response.coords.longitude, lat: response.coords.latitude };
    //     } catch (error) {
    //         return null;
    //     }
    // };

    // const getWeather = async result => {
    //     const weather = await fetch(
    //         `https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.long}&appid=${apiKey}&units=metric&lang=ru`,
    //     );
    //     const data = await weather.json();
    //     return data;
    // };

    return (
        <>
            <TouchableOpacity
                style={[styles.containerButton, { top: insets.top + 32 }]}
                onPress={() => navigation.navigate(Stacks.SETTINGS, { screen: Screens.Settings.MAIN })}
            >
                <Image source={require('@assets/icons/settings_icon.png')} style={styles.iconSettings} />
            </TouchableOpacity>
            <StatusBar backgroundColor='transparent' translucent={true} barStyle='dark-content' />
            <PagerView
                style={{ flex: 1}}
                initialPage={0}
                onPageSelected={event => setCurrentIndex(event.nativeEvent.position)}
            >
                {cities.map((city, index) => (
                    <CurrentScreen
                        index={index}
                        selectedIndex={currentIndex}
                        key={city.nameCity}
                        nameCity={city.nameCity}
                        timeZone={city.timeZone}
                        mainTemp={city.mainTemp}
                    />
                ))}
            </PagerView>
        </>
    );
};

const styles = StyleSheet.create({
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
