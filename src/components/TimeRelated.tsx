import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherType, WeatherIcon } from '@components/WeatherIcon';
import { getHours } from 'date-fns';

interface IProps {
    time: string;
    weatherType: WeatherType;
    temperature: number;
}

const currentDate = new Date();

function ISO8601ToHours(inputStr: string) {
    const Date = inputStr.split(' ', 2);
    const Hours = Date[1].split(':', 1);

    if (+Hours === getHours(currentDate)) {
        return 'Сейчас';
    }

    return Hours + ':00';
}

const TimeRelated: React.FC<IProps> = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.uptext}>{ISO8601ToHours(props.time)}</Text>
            <WeatherIcon weatherType={props.weatherType} style={{ marginVertical: 1 }} />
            <Text style={styles.downtext}>{props.temperature.toString() + '\u00B0'}</Text>
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

export default TimeRelated;
