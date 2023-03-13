import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '@styles/colors';
import { format, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { WeatherIcon, WeatherType } from '@components/WeatherIcon';
import { signs } from '@utils/constants';

export interface IProps {
    date: string;
    weatherType: WeatherType;
    dayTemp: number;
    nightTemp: number;
}

const getWeekDay = (incomingDate: string) => {
    const currentDate = new Date();
    const incomingDate1 = new Date(incomingDate);
    return isSameDay(currentDate, incomingDate1) ? 'Сегодня' : format(incomingDate1, 'cccc', { locale: ru });
};

export const DateRelated: React.FC<IProps> = props => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.weekNumber}>{getWeekDay(props.date)}</Text>
                <Text style={styles.dateNumber}>{format(new Date(props.date), 'd MMMM', { locale: ru })}</Text>
            </View>
            <View style={styles.icon}>
                <WeatherIcon weatherType={props.weatherType} />
            </View>
            <View style={styles.temperatureContainer}>
                <Text style={styles.afternoon}>{props.dayTemp + signs.CELSIUS}</Text>
                <Text style={styles.night}>{props.nightTemp + signs.CELSIUS}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-between',
    },
    dateNumber: {
        fontFamily: 'ExtendedRegular',
        marginHorizontal: 25,
        fontSize: 12,
        paddingVertical: 4,
    },
    weekNumber: {
        fontFamily: 'ExtendedBold',
        marginHorizontal: 25,
        paddingVertical: 3,
        fontSize: 16,
        transform: [{ scaleY: 1.1 }],
    },
    icon: {
        position: 'absolute',
        display: 'flex',
        left: 0,
        right: 0,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    temperatureContainer: {
        flexDirection: 'row',
        marginHorizontal: 25,
    },
    afternoon: {
        fontFamily: 'ExtendedBold',
        fontSize: 20,
        paddingHorizontal: 6,
    },
    night: {
        color: colors.GRAY,
        fontSize: 16,
        fontFamily: 'ExtendedBold',
        marginVertical: 5,
    },
});
