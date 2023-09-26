import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import colors from '@styles/colors';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { AutoComplate } from '../components/AutoComplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screens } from '@navigation/constants';
import { TSettingsStackParams } from '@navigation/stacks/SettingsStack';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    ScrollView,
    BackHandler,
} from 'react-native';
import { useAppSelector } from '../store/store';
import { CityComponent } from '@components/CityComponent';
import { ThemeType } from '@storage/constants';

export const CitiesScreen: React.FC<
    NativeStackScreenProps<TSettingsStackParams, typeof Screens.Settings.CITIES>
> = props => {
    const { navigation } = props;
    const sheetRef = useRef<BottomSheet>(null);

    const refInput = useRef<TextInput>(null);

    const [isOpen, setIsOpen] = useState(false);

    const snapPoints = useMemo(() => ['81%'], []);

    const handleSnapPress = useCallback((index: number) => {
        sheetRef.current?.snapToIndex(index);
        setIsOpen(true);
    }, []);

    const { data: cities } = useAppSelector(state => state.cities);

    const { theme } = useAppSelector(state => state.settings);

    useEffect(() => {
        const backAction = () => {
            if (isOpen) {
                sheetRef.current.close();
                return true;
            }
            if (!isOpen) {
                navigation.goBack();
                return true;
            }
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [sheetRef, isOpen]);

    // status, error
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={[
                    styles.wrapper,
                    {
                        backgroundColor:
                            theme.nameTheme === ThemeType.Dark || theme.systemMode === 'dark'
                                ? theme.mode.backgroud
                                : colors.EXTRA_LIGHT_GRAY,
                    },
                ]}
            >
                <View
                    style={{
                        backgroundColor:
                            theme.nameTheme === ThemeType.Dark || theme.systemMode === 'dark'
                                ? theme.mode.backgroud
                                : colors.EXTRA_LIGHT_GRAY,
                    }}
                >
                    <TouchableOpacity
                        disabled={isOpen}
                        style={[styles.wrapperIcon, { opacity: isOpen ? 0.3 : 1 }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={
                                theme.nameTheme === ThemeType.Light ||
                                (theme.nameTheme === ThemeType.System && theme.systemMode === 'light')
                                    ? require('@assets/icons/back-icon.png')
                                    : require('@assets/icons/white-back-icon.png')
                            }
                            style={styles.iconBack}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.head__title, { opacity: isOpen ? 0.3 : 1 }, { color: theme.mode.color }]}>
                        Города
                    </Text>
                    <View style={styles.bodyScreen}>
                        <TouchableOpacity
                            disabled={isOpen}
                            style={[
                                styles.buttonCities,
                                {
                                    opacity: isOpen ? 0.3 : 1,
                                    backgroundColor:
                                        theme.nameTheme === ThemeType.Dark ||
                                        (theme.nameTheme === ThemeType.System && theme.systemMode === 'dark')
                                            ? colors.SECTION_COLOR
                                            : colors.WHITE,
                                },
                            ]}
                            onPress={() => {
                                handleSnapPress(0);
                                refInput.current.focus();
                            }}
                        >
                            <Image
                                source={
                                    theme.nameTheme === ThemeType.Light ||
                                    (theme.nameTheme === ThemeType.System && theme.systemMode === 'light')
                                        ? require('@assets/icons/search-icon.png')
                                        : require('@assets/icons/white-search-icon.png')
                                }
                                style={styles.search_icon}
                            />
                            <Text style={styles.search_title}>Поиск города</Text>
                        </TouchableOpacity>
                        <ScrollView style={{ marginTop: 10 }}>
                            {cities.map(city => (
                                <CityComponent key={city.nameCity} name={city} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <BottomSheet
                    backgroundStyle={{
                        backgroundColor:
                            theme.nameTheme === ThemeType.Dark ||
                            (theme.nameTheme === ThemeType.System && theme.systemMode === 'dark')
                                ? colors.SECTION_COLOR
                                : colors.WHITE,
                    }}
                    ref={sheetRef}
                    handleIndicatorStyle={{ opacity: 0 }}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    onClose={() => {
                        setIsOpen(false);
                        Keyboard.dismiss();
                    }}
                    index={-1}
                >
                    <BottomSheetView>
                        <Text style={[styles.bottomSheet_title, { color: theme.mode.color }]}>Поиск города</Text>
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
    },
    wrapperIcon: {
        marginTop: 59,
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 15,
        flexDirection: 'row',
    },
    iconBack: {
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    head__title: {
        fontFamily: 'ExpandedBold',
        fontSize: 20,
        marginTop: 55,
        marginLeft: 147,
    },
    buttonCities: {
        width: '90%',
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    bodyScreen: {
        height: '100%',
        marginTop: 35,
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
