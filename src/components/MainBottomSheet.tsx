import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { WeatherComponent } from '@components/WeatherComponent';

export interface IMainBottomSheetProps {
    nameCity: string;
    index: number;
    selectedIndex: number;
    weatherWarningType: string;
}

export const MainBottomSheet: React.FC<IMainBottomSheetProps> = props => {
    const { index, selectedIndex, nameCity } = props;

    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['30%', '96%'], []);

    useEffect(() => {
        if (index !== selectedIndex) {
            sheetRef.current?.snapToIndex(0);
        }
    }, [selectedIndex, index]);

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            index={0}
            enableHandlePanningGesture={false}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                <WeatherComponent warningType={props.weatherWarningType} nameCity={nameCity} />
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    handleIndicator: {
        opacity: 0,
    },
});
