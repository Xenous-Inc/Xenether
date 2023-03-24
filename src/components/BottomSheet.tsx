import React, { useMemo, useRef, useCallback, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import colors from '@styles/colors';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WeatherComponent } from '@components/WeatherComponent';
import { ExtraInfoType } from '@components/ExtraInfo';
import { WarningType } from '@components/Warning';
import { WeatherType } from '@components/WeatherIcon';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { BottomSheetButtons } from '@utils/constants';

export const Sheet = () => {
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['29%', '96%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [sectionWeather, setSectionWeather] = useState(true);
    const [sectionСlothes, setSectionСlothes] = useState(false);

    const switchWeather = () => {
        if (sectionWeather) {
            setSectionWeather(false);
        } else {
            setSectionWeather(true);
            setSectionСlothes(false);
        }
        if (sectionWeather === true) {
            setSectionWeather(true);
        }
    };

    const switchСlothes = () => {
        if (sectionСlothes) {
            setSectionСlothes(false);
        } else {
            setSectionСlothes(true);
            setSectionWeather(false);
        }
        if (sectionСlothes === true) {
            setSectionСlothes(true);
        }
    };

    if (sectionWeather) {
        return (
            <View style={styles.container}>
                <GestureHandlerRootView style={styles.gestureHandlerContainer}>
                    <BottomSheet
                        ref={sheetRef}
                        snapPoints={snapPoints}
                        index={0}
                        enableHandlePanningGesture={false}
                        handleIndicatorStyle={styles.handleIndicator}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={switchWeather}>
                                    <Text
                                        style={[styles.weather, { color: sectionWeather ? colors.BLACK : colors.GRAY }]}
                                    >
                                        {BottomSheetButtons.WEATHER}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={switchСlothes}>
                                    <Text
                                        style={[styles.clothes, { color: sectionСlothes ? colors.BLACK : colors.GRAY }]}
                                    >
                                        {BottomSheetButtons.CLOTHES}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <WeatherComponent
                                warningType={WarningType.Thunderstorm}
                                // todo: change to props
                                timeRelatedArray={[
                                    {
                                        time: '2023-03-19 20:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 21:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 22:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 23:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 24:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 25:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 26:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 27:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 28:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 29:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 30:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                    {
                                        time: '2022-09-27 31:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        temperature: 12,
                                    },
                                ]}
                                dateRelatedArray={[
                                    {
                                        date: '2023-03-19 18:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        dayTemp: 1,
                                        nightTemp: 21,
                                    },
                                    {
                                        date: '2023-03-20 18:00:00.000',
                                        weatherType: WeatherType.Thunderstorm,
                                        dayTemp: 21,
                                        nightTemp: 15,
                                    },
                                    {
                                        date: '2023-03-21 18:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        dayTemp: 21,
                                        nightTemp: 15,
                                    },
                                    {
                                        date: '2023-03-22 18:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        dayTemp: 21,
                                        nightTemp: 15,
                                    },
                                    {
                                        date: '2023-03-23 18:00:00.000',
                                        weatherType: WeatherType.Thunderstorm,
                                        dayTemp: 21,
                                        nightTemp: 15,
                                    },
                                    {
                                        date: '2023-03-24 18:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        dayTemp: 21,
                                        nightTemp: 15,
                                    },
                                    {
                                        date: '2023-03-25 18:00:00.000',
                                        weatherType: WeatherType.Sunny,
                                        dayTemp: 21,
                                        nightTemp: 15,
                                    },
                                ]}
                                extraInfoArray={[
                                    { type: ExtraInfoType.Precipitation, digitalValue: 12 },
                                    { type: ExtraInfoType.RealFeel, digitalValue: 12 },
                                    { type: ExtraInfoType.Visibility, digitalValue: 12 },
                                    { type: ExtraInfoType.Humidity, digitalValue: 12 },
                                ]}
                            />
                        </BottomSheetScrollView>
                    </BottomSheet>
                </GestureHandlerRootView>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={styles.gestureHandlerContainer}>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    index={0}
                    enableHandlePanningGesture={false}
                    handleIndicatorStyle={styles.handleIndicator}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={switchWeather}>
                                <Text style={[styles.weather, { color: sectionWeather ? colors.BLACK : colors.GRAY }]}>
                                    {BottomSheetButtons.WEATHER}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={switchСlothes}>
                                <Text style={[styles.clothes, { color: sectionСlothes ? colors.BLACK : colors.GRAY }]}>
                                    {BottomSheetButtons.CLOTHES}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
            </GestureHandlerRootView>
        </View>
    );
};

const styles = StyleSheet.create({
    gestureHandlerContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.LIGHT_ORANGE,
    },
    buttonContainer: {
        flexDirection: 'row',
        columnGap: -75,
    },
    handleIndicator: {
        backgroundColor: colors.WHITE,
    },
    weather: {
        fontFamily: 'ExpandedBold',
        fontSize: 23,
        transform: [{ scaleX: 0.95 }],
    },
    button: {
        marginLeft: 27,
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    clothes: {
        fontFamily: 'ExpandedBold',
        fontSize: 23,
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
        transform: [{ scaleX: 0.95 }],
    },
});
