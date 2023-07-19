import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import colors from '@styles/colors';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AutoComplate } from '../components/AutoComplate';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
} from 'react-native';

export const CitiesScreen: React.FC = () => {
    const sheetRef = useRef<BottomSheet>(null);

    const refInput = useRef<TextInput>(null);

    const [isOpen, setIsOpen] = useState(false);

    const snapPoints = useMemo(() => ['80%'], []);

    const handleSnapPress = useCallback(index => {
        sheetRef.current?.snapToIndex(index);
        setIsOpen(true);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.wrapper}>
                <View style={{ backgroundColor: isOpen ? colors.EXTRA_LIGHT_GRAY : colors.LIGHT_GRAY }}>
                    <TouchableOpacity style={styles.headScreen}>
                        <Image source={require('@assets/icons/back-icon.png')} style={styles.iconBack} />
                        <Text style={styles.head__title}>Города</Text>
                    </TouchableOpacity>
                    <View style={styles.bodyScreen}>
                        <TouchableOpacity
                            style={[styles.buttonCities, { opacity: isOpen ? 0.3 : 1 }]}
                            onPress={() => {
                                handleSnapPress(0);
                                refInput.current.focus();
                            }}
                        >
                            <Image source={require('@assets/icons/search-icon.png')} style={styles.search_icon} />
                            <Text style={styles.search_title}>Поиск города</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    onClose={() => {
                        setIsOpen(false);
                        Keyboard.dismiss();
                    }}
                    index={-1}
                >
                    <BottomSheetView>
                        <Text style={styles.bottomSheet_title}>Поиск города</Text>
                        <AutoComplate refInput={refInput} />
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.LIGHT_GRAY,
    },
    headScreen: {
        marginTop: 40,
        marginBottom: 44,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        columnGap: MAIN_HORIZONTAL_OFFSET,
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    iconBack: {
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    head__title: {
        fontFamily: 'ExpandedBold',
        fontSize: 20,
        marginLeft: 40,
    },
    buttonCities: {
        width: '90%',
        height: 40,
        backgroundColor: colors.WHITE,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    bodyScreen: {
        height: '100%',
        marginTop: 100,
        alignItems: 'center',
    },
    search_title: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 16,
        color: colors.GRAY,
    },
    search_icon: {
        alignSelf: 'center',
        opacity: 0.5,
        height: 18,
        marginHorizontal: 10,
    },
    bottomSheet_title: {
        fontFamily: 'ExtendedBold',
        fontSize: 24,
        marginTop: 10,
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
});
