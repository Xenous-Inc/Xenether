import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, useColorScheme , Text} from 'react-native';
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
import { useAppDispatch, useAppSelector } from '../store/store';
import { Status } from '@storage/types';
import { createGetCityAction } from '../store/slices/citySlice';
import { createGetWeatherAction } from '../store/slices/weatherSlice';
import SkeletonLoader from 'expo-skeleton-loader';
import { PlaceSkeleton } from '@components/PlaceSkeleton';
import { setSystemTheme } from '../store/slices/settingsSlice';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// const apiKey = 'f467ce1b7a6266168a069f38c99d7029';

export const MainScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<TMainStackParams, typeof Screens.Main.MAIN>,
        NativeStackScreenProps<TAppStackParams>
    >
> = props => {
    const sheetRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['30%', '56%'], []);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const { navigation } = props;

    const insets = useSafeAreaInsets();

    const { error, status, data: cities } = useAppSelector(state => state.cities);

    const dispatch = useAppDispatch();

    const colorScheme = useColorScheme();

    useEffect(()=> {
        sheetRef.current?.present();
    },[])
    useEffect(()=>{

        dispatch(setSystemTheme(colorScheme));
        
    },[colorScheme])
   

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
           
           
         
            <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                onPageSelected={event => setCurrentIndex(event.nativeEvent.position)}
            >
                { cities? cities.map((city, index) => (
                    <CurrentScreen key={city.nameCity} name={city} index={index} selectedIndex={currentIndex} />
                )) :  <PlaceSkeleton/>}
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