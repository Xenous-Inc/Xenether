import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherType, WeatherIcon } from '@components/WeatherIcon';
import { eachHourOfInterval, set, getHours, getDate } from 'date-fns';

const NowDate = new Date();

const ArrayOfHours = eachHourOfInterval({
    start: NowDate,
    end: set(NowDate, { date: getDate(NowDate) + 1 }),
});

const Hours = new Array(ArrayOfHours.length);

for (let i = 0; i < ArrayOfHours.length; i++) {
    if (i === 0) {
        Hours[i] = 'Сейчас';
    } else if (getHours(ArrayOfHours[i]) < 10) {
        Hours[i] = '0' + getHours(ArrayOfHours[i]).toString() + ':00';
    } else {
        Hours[i] = getHours(ArrayOfHours[i]).toString() + ':00';
    }
}

export const TimeRelated: React.FC<{ indexOfComponent: number; weatherType: WeatherType; temp: number }> = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.uptext}>{Hours[props.indexOfComponent]}</Text>
            <WeatherIcon weatherType={props.weatherType} />
            <Text style={styles.downtext}>{props.temp.toString() + '\u00B0'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    uptext: {
        fontSize: 12,
        fontFamily: 'ExtendedSemiblod',
        alignItems: 'center',
        justifyContent: 'center',
    },
    downtext: {
        fontSize: 12,
        fontFamily: 'ExtendedSemiblod',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: 55,
        height: 81,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
