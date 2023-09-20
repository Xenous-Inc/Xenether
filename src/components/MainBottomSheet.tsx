import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { WeatherComponent } from '@components/WeatherComponent';
import { ICityName } from '@storage/types';

export interface IMainBottomSheetProps {
    nameCity: ICityName;
    index: number;
    selectedIndex: number;
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
            style={{ zIndex: 1 }}
            ref={sheetRef}
            snapPoints={snapPoints}
            index={0}
            enableHandlePanningGesture={true}
            handleIndicatorStyle={styles.handleIndicator}
           
        >
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                <WeatherComponent name={nameCity} />
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    handleIndicator: {
        opacity: 10,
    },
});
