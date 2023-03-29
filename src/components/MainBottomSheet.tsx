import React, { useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import colors from '@styles/colors';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { WeatherComponent } from '@components/WeatherComponent';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { MainBottomSheetTitles } from '@utils/constants';
import { IWeatherComponent } from '@components/WeatherComponent';

export const MainBottomSheet: React.FC<IWeatherComponent> = props => {
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['30%', '96%'], []);

    const [sectionIsWeather, setSectionIsWeather] = useState(true);

    const changeSection = (isWeather: boolean) => {
        sectionIsWeather !== isWeather && setSectionIsWeather(isWeather);
    };
    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            index={0}
            enableHandlePanningGesture={false}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => changeSection(true)}>
                    <Text style={[styles.weather, { color: sectionIsWeather ? colors.BLACK : colors.GRAY }]}>
                        {MainBottomSheetTitles.WEATHER}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeSection(false)}>
                    <Text style={[styles.clothes, { color: !sectionIsWeather ? colors.BLACK : colors.GRAY }]}>
                        {MainBottomSheetTitles.CLOTHES}
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                {sectionIsWeather ? (
                    <WeatherComponent
                        warningType={props.warningType}
                        timeRelatedArray={props.timeRelatedArray}
                        dateRelatedArray={props.dateRelatedArray}
                        extraInfoArray={props.extraInfoArray}
                    />
                ) : (
                    <></>
                )}
            </BottomSheetScrollView>
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
