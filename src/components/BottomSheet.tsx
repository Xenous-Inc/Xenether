import React, { useMemo, useRef, useCallback, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import colors from '@styles/colors';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { WeatherComponent } from '@components/WeatherComponent';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { MainBottomSheet } from '@utils/constants';
import { IWeatherComponent } from '@components/WeatherComponent';

export const Sheet: React.FC<IWeatherComponent> = props => {
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['29%', '96%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [isSectionWeather, setIsSectionWeather] = useState(true);

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            index={0}
            enableHandlePanningGesture={false}
            handleIndicatorStyle={styles.handleIndicator}
            onChange={handleSheetChanges}
        >
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setIsSectionWeather(true)}>
                    <Text style={[styles.weather, { color: isSectionWeather ? colors.BLACK : colors.GRAY }]}>
                        {MainBottomSheet.WEATHER}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSectionWeather(false)}>
                    <Text style={[styles.clothes, { color: !isSectionWeather ? colors.BLACK : colors.GRAY }]}>
                        {MainBottomSheet.CLOTHES}
                    </Text>
                </TouchableOpacity>
            </View>
            {isSectionWeather ? (
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    <WeatherComponent
                        warningType={props.warningType}
                        timeRelatedArray={props.timeRelatedArray}
                        dateRelatedArray={props.dateRelatedArray}
                        extraInfoArray={props.extraInfoArray}
                    />
                </BottomSheetScrollView>
            ) : (
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    <></>
                </BottomSheetScrollView>
            )}
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
        columnGap: 10,
        height: 31,
    },
    handleIndicator: {
        opacity: 0,
    },
    weather: {
        fontFamily: 'ExpandedBold',
        fontSize: 23,
        transform: [{ scaleX: 0.95 }],
    },
    clothes: {
        fontFamily: 'ExpandedBold',
        fontSize: 23,
        transform: [{ scaleX: 0.95 }],
    },
});
