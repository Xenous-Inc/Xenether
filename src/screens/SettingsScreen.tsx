import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { Signs, SettingScreenTitles, SettingScreenContentText, SettingScreenTheme } from '@utils/constants';
import colors from '@styles/colors';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { TAppStackParams } from '@navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TSettingsStackParams } from '@navigation/stacks/SettingsStack';
import { Screens, Stacks } from '@navigation/constants';
import { CompositeScreenProps } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { SwitcherStatus, UnitsType, ThemeType } from '@storage/constants';
import { switchToggle } from '../store/slices/settingsSlice';
import SwitchToggle from 'react-native-switch-toggle';
import { changeTheme } from '../store/slices/settingsSlice';
import { changeDeg } from '../store/slices/settingsSlice';

export const SettingsScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<TSettingsStackParams, typeof Screens.Settings.MAIN>,
        NativeStackScreenProps<TAppStackParams>
    >
> = props => {
    const SystemTheme = useColorScheme();

    const dispatch = useAppDispatch();

    const { deg, notice , theme } = useAppSelector(state => state.settings);
   

    const { navigation } = props;

    return (
        <View style={styles.wrapper}>
            <View style={styles.headScreen}>
                <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
                    <Image source={require('@assets/icons/back-icon.png')} />
                </TouchableOpacity>
                <Text style={styles.head__title}>{SettingScreenTitles.SETTING}</Text>
            </View>

            <View style={styles.bodyScreen}>
                <Text style={styles.titleOfCategory}>{SettingScreenTitles.WEATHER}</Text>
                <View style={styles.sections}>
                    <TouchableOpacity
                        style={styles.degrees}
                        onPress={() => {
                            dispatch(changeDeg());
                        }}
                    >
                        <Text style={styles.contentText}>{SettingScreenContentText.DEGREES}</Text>
                        <View style={styles.buttonsDegreesContainer}>
                            <Text
                                style={[
                                    styles.buttonsDegress,
                                    { color: deg === UnitsType.Fahrenheits ? colors.BLACK : colors.GRAY },
                                ]}
                            >
                                {Signs.CELSIUS + 'F'}
                            </Text>
                            <Text
                                style={[
                                    styles.buttonsDegress,
                                    { color: deg === UnitsType.Celsius ? colors.BLACK : colors.GRAY },
                                ]}
                            >
                                {Signs.CELSIUS + 'C'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        style={styles.cities}
                        onPress={() => navigation.navigate(Stacks.SETTINGS, { screen: Screens.Settings.CITIES })}
                    >
                        <Text style={styles.contentText}>{SettingScreenContentText.CITIES}</Text>
                        <View style={styles.buttonsCities}>
                            <Image source={require('@assets/icons/icon-button.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.titleOfCategory}>{SettingScreenTitles.APP}</Text>
                <View style={styles.sections}>
                    <View style={styles.notifications}>
                        <Text style={styles.contentText}>{SettingScreenContentText.NOTICE}</Text>
                        <SwitchToggle
                            switchOn={notice === SwitcherStatus.On}
                            onPress={() => {
                                dispatch(switchToggle());
                            }}
                            containerStyle={{
                                width: 39,
                                height: 18,
                                borderRadius: 50,
                                padding: 5,
                                marginRight: 15,
                            }}
                            circleStyle={{
                                width: 12,
                                height: 12,
                                borderRadius: 20,
                            }}
                            backgroundColorOn={colors.LIGHT_ORANGE}
                            backgroundColorOff={colors.LIGHT_GRAY}
                            circleColorOff={colors.WHITE}
                            duration={50}
                        />
                    </View>
                </View>
                <Text style={styles.titleOfCategory}>{SettingScreenTitles.DECOR}</Text>
                <View style={styles.sections}>
                    <View style={styles.buttonsDecoration}>
                        <View
                            style={[
                                styles.buttonsSystem,
                                {
                                    borderColor: theme === ThemeType.System ? colors.LIGHT_ORANGE : colors.WHITE,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(changeTheme(ThemeType.System));
                                }}
                            >
                                <Text style={styles.systemHead}>{SettingScreenTheme.SYSTEM}</Text>
                                <Text style={styles.systemComment}>{SettingScreenTheme.SYSTEM_COMMENT}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsThemeContainer}>
                            <View
                                style={[
                                    styles.buttonsTheme,
                                    { borderColor: theme === ThemeType.Dark ? colors.LIGHT_ORANGE : colors.WHITE },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(changeTheme(ThemeType.Dark));
                                    }}
                                >
                                    <Image style={styles.iconMoon} source={require('@assets/icons/icon-moon.png')} />
                                    <Text style={styles.textTheme}>{SettingScreenTheme.BLACK}</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={[
                                    styles.buttonsTheme,
                                    {
                                        borderColor: theme === ThemeType.Light ? colors.LIGHT_ORANGE : colors.WHITE,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(changeTheme(ThemeType.Light));
                                    }}
                                >
                                    <Image style={styles.iconSun} source={require('@assets/icons/icon-sun.png')} />
                                    <Text style={styles.textTheme}>{SettingScreenTheme.LIGHT}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.EXTRA_LIGHT_GRAY,
        width: '100%',
        height: '100%',
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
    },
    bodyScreen: {
        marginTop: 100,
    },
    head__title: {
        fontFamily: 'ExpandedBold',
        fontSize: 20,
        marginLeft: -8,
    },
    iconBack: {
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        marginLeft: 20,
        fontFamily: 'ExtendedSemiBold',
        fontSize: 15,
    },
    degrees: {
        height: 40,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cities: {
        height: 40,
        backgroundColor: colors.WHITE,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    notifications: {
        height: 50,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 12,
    },
    buttonsDecoration: {
        alignItems: 'center',
        height: 122,
        flexDirection: 'row',
        columnGap: 10,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.WHITE,
    },
    buttonsDegreesContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 12,
        marginRight: 16,
    },
    buttonsDegress: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 15,
    },
    buttonsCities: {
        marginRight: 16,
        opacity: 0.5,
    },
    titleOfCategory: {
        marginBottom: 20,
        fontFamily: 'ExpandedBold',
        color: colors.GRAY,
        fontSize: 14,
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    sections: {
        marginBottom: 24,
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    buttonsSystem: {
        width: '44%',
        height: 95,
        borderRadius: 15,
        backgroundColor: colors.EXTRA_LIGHT_GRAY,
        borderWidth: 2,
        marginLeft: 15,
    },
    systemHead: {
        fontFamily: 'ExpandedBold',
        fontSize: 13,
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 15,
    },
    systemComment: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 11,
        marginLeft: 15,
        color: colors.GRAY,
    },
    buttonsTheme: {
        width: '32%',
        height: 98,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: colors.EXTRA_LIGHT_GRAY,
        borderWidth: 2,
    },
    buttonsThemeContainer: {
        flexDirection: 'row',
        columnGap: 10,
        marginRight: 10,
    },
    iconMoon: {
        marginBottom: 40,
        alignSelf: 'center',
        marginTop: 13,
        opacity: 0.5,
        height: 19,
    },
    iconSun: {
        height: 22,
        marginBottom: 40,
        alignSelf: 'center',
        marginTop: 10,
        opacity: 0.5,
    },
    textTheme: {
        fontFamily: 'ExtendedSemiBold',
        fontSize: 11,
        color: colors.GRAY,
    },
    divider: {
        height: 1,
    },
});
