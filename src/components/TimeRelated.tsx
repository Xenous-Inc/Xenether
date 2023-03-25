import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherType, WeatherIcon } from '@components/WeatherIcon';
import { format, isSameHour } from 'date-fns';
import { Signs } from '@utils/constants';

export interface ITimeProps {
    time: string;
    weatherType: WeatherType;
    temperature: number;
}

const SetHours = (timeData: string) => {
    const currentDate = new Date();
    const inputDate = new Date(timeData);
    return isSameHour(inputDate, currentDate) ? 'Сейчас' : format(inputDate, 'HH:mm');
};

const TimeRelated: React.FC<ITimeProps> = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.timeInfo}>{SetHours(props.time)}</Text>
            <WeatherIcon weatherType={props.weatherType} style={styles.icon} />
            <Text style={styles.temperatureInfo}>{props.temperature.toString() + Signs.CELSIUS}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    timeInfo: {
        fontSize: 12,
        fontFamily: 'ExtendedSemiBold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    temperatureInfo: {
        fontSize: 12,
        fontFamily: 'ExtendedSemiBold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: 55,
        height: 81,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginVertical: 1,
    },
});

export default TimeRelated;
