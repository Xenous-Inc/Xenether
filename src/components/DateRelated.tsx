import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '@styles/colors';
import { format, getDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { WeatherIcon, WeatherType } from '@components/WeatherIcon';

export interface IProps {
    date: string;
    weatherType: WeatherType;
    dayTemp: number;
    nightTemp: number;
}

const getWeekDay = (incomingDate: string) => {
    const currentDate = new Date();
    const weekNumberFromApi = getDay(new Date(incomingDate)).toString();
    const currentWeekNumber = getDay(currentDate).toString();
    return weekNumberFromApi === currentWeekNumber
        ? 'Сегодня'
        : format(new Date(weekNumberFromApi), 'cccc', { locale: ru });
};

export const DateRelated: React.FC<IProps> = props => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.weekNumber}>{getWeekDay(props.date)}</Text>
                <Text style={styles.dateNumber}>{format(new Date(props.date), 'dd MMMM', { locale: ru })}</Text>
            </View>
            <View style={styles.icon}>
                <WeatherIcon weatherType={props.weatherType} />
            </View>
            <View style={styles.temperatureContainer}>
                <Text style={styles.afternoon}>{props.dayTemp + '\u00B0'}</Text>
                <Text style={styles.night}>{props.nightTemp + '\u00B0'}</Text>
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
