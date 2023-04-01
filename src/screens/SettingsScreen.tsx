import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Switch } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import { Signs, SettingScreenTitles, SettingScreenContentText, SettingScreenTheme } from '@utils/constants';
import colors from '@styles/colors';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';

export interface ISettingScreen {
    isCelisius: boolean;
    isNoticeOn: boolean;
    isSystemTheme: boolean;
}

export const SettingsScreen: React.FC<ISettingScreen> = props => {
    const [typeCelsius, setTypeCelsius] = useState(props.isCelisius);

    const [isEnabled, setIsEnabled] = useState(props.isNoticeOn);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [systemTheme, setSystemTheme] = useState(props.isSystemTheme);
    const isDarkTheme = props.isSystemTheme ? true : false;
    const [blackTheme, setBlackTheme] = useState(isDarkTheme);

    const changeTheme = (isSystem: boolean, isBlack: boolean) => {
        systemTheme !== isSystem && setSystemTheme(isSystem);
        blackTheme !== isBlack && setBlackTheme(isBlack);
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.headScreen}>
                <View style={styles.iconBack}>
                    <TouchableOpacity>
                        <Image source={require('@assets/icons/back-icon.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.head__title}>{SettingScreenTitles.SETTING}</Text>
            </View>

            <Text style={styles.titleOfCategory}>{SettingScreenTitles.WEATHER}</Text>
            <View style={styles.sections}>
                <TouchableOpacity
                    style={styles.degrees}
                    onPress={() => (typeCelsius ? setTypeCelsius(!props.isCelisius) : setTypeCelsius(props.isCelisius))}
                >
                    <Text style={styles.contentText}>{SettingScreenContentText.DEGREES}</Text>
                    <View style={styles.buttonsDegreesContainer}>
                        <Text style={[styles.buttonsDegress, { color: !typeCelsius ? colors.BLACK : colors.GRAY }]}>
                            {Signs.CELSIUS + 'F'}
                        </Text>
                        <Text style={[styles.buttonsDegress, { color: typeCelsius ? colors.BLACK : colors.GRAY }]}>
                            {Signs.CELSIUS + 'C'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cities}>
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
                        switchOn={isEnabled}
                        onPress={() => toggleSwitch()}
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
                                borderColor:
                                    (systemTheme && !blackTheme) || systemTheme ? colors.LIGHT_ORANGE : colors.WHITE,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                changeTheme(true, false);
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
                                { borderColor: !systemTheme && blackTheme ? colors.LIGHT_ORANGE : colors.WHITE },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    changeTheme(false, true);
                                }}
                            >
                                <Image style={styles.iconMoon} source={require('@assets/icons/icon-moon.png')} />
                                <Text style={styles.textTheme}>{SettingScreenTheme.BLACK}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.buttonsTheme,
                                { borderColor: !systemTheme && !blackTheme ? colors.LIGHT_ORANGE : colors.WHITE },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    changeTheme(false, false);
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
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.EXTRA_LIGHT_GRAY,
        width: '100%',
        height: '100%',
    },
    headScreen: {
        width: '100%',
        marginTop: 40,
        marginBottom: 44,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 80,
    },
    head__title: {
        fontFamily: 'ExpandedBold',
        fontSize: 20,
    },
    iconBack: {
        marginLeft: MAIN_HORIZONTAL_OFFSET,
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
        marginBottom: 0.6,
    },
    cities: {
        height: 40,
        backgroundColor: colors.WHITE,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 235,
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
        marginRight: 10,
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
});
