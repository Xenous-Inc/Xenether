import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '@styles/colors';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { WeatherIcon, WeatherType } from '@components/WeatherIcon';

interface IProps {
    dayOfTheWeek: string;
    date: string;
    weatherType: WeatherType;
    temperatureAfternoon: number;
    temperatureNight: number;
}

const getWeek = format(new Date(), 'cccc', { locale: ru });

export const DateRelated: React.FC<IProps> = props => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.nameWeek}>{props.dayOfTheWeek === getWeek ? 'Сегодня' : props.dayOfTheWeek}</Text>
                <Text style={styles.numberDate}>{props.date}</Text>
            </View>
            <View style={styles.icon}>
                <WeatherIcon weatherType={props.weatherType} />
            </View>
            <View style={styles.containerTemperature}>
                <Text style={styles.afternoon}>{props.temperatureAfternoon + '\u00B0'}</Text>
                <Text style={styles.night}>{props.temperatureNight + '\u00B0'}</Text>
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
    numberDate: {
        fontFamily: 'ExtendedRegular',
        marginHorizontal: 25,
        fontSize: 12,
        paddingVertical: 4,
    },
    nameWeek: {
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
    containerTemperature: {
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
