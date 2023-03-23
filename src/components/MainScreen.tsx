import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Signs } from '@utils/constants';
import { utcToZonedTime, format } from 'date-fns-tz';
import colors from '@styles/colors';
import { BOTTOM_SHEET_HORIZONTAL_OFFSET } from '@styles/constants';
import { ru } from 'date-fns/locale';

const image = {
    src: require('@assets/icons/background-image.png'),
};
export interface IMainScreen {
    location: string;
    timeZone: string;
    temperature: number;
}

const getlocalTime = (timeZone: string) => {
    const currentDate = new Date();
    return format(utcToZonedTime(currentDate, timeZone), 'HH:mm', { locale: ru });
};

export const MainScreen: React.FC<IMainScreen> = props => {
    return (
        <ImageBackground source={image.src} style={styles.backgroundImage}>
            <View style={styles.wrapperOfLocalInfo}>
                <Text style={styles.locationContent}>{props.location}</Text>
                <Text style={styles.timeContent}>{getlocalTime(props.timeZone)}</Text>
            </View>
            <Text style={styles.temperatureContent}>{props.temperature + Signs.CELSIUS}</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        left: 30,
        height: '100%',
        width: '120%',
    },
    wrapperOfLocalInfo: {
        marginTop: 60,
        marginLeft: BOTTOM_SHEET_HORIZONTAL_OFFSET + 4,
    },
    locationContent: {
        color: colors.WHITE,
        fontFamily: 'ExpandedBold',
        fontSize: 22,
    },
    timeContent: {
        color: colors.WHITE,
        fontFamily: 'ExpandedSemiBold',
        fontSize: 14,
    },
    temperatureContent: {
        fontFamily: 'ExpandedBold',
        fontSize: 80,
        color: colors.WHITE,
        marginTop: 28,
        marginLeft: BOTTOM_SHEET_HORIZONTAL_OFFSET + 4,
    },
});
