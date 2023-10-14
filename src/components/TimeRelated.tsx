import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherIcon } from '@components/WeatherIcon';
import { format, isSameHour } from 'date-fns';
import { Signs } from '@utils/constants';
import { useTheme } from '../model/themeContext';

export interface ITimeProps {
    weatherCode: number;
    time: string;
    mainTemp: number;
}

const SetHours = (timeData: string) => {
    const currentDate = new Date();
    const inputDate = new Date(timeData);
    return isSameHour(inputDate, currentDate) ? 'Сейчас' : format(inputDate, 'HH:mm');
};

const TimeRelated: React.FC<ITimeProps> = props => {
    const { colors } = useTheme();
    return (
        <View style={styles.wrapper}>
            <Text style={[styles.timeInfo, { color: colors.textcolor }]}>{SetHours(props.time)}</Text>
            <WeatherIcon weatherCode={props.weatherCode} style={styles.icon} />
            <Text style={[styles.temperatureInfo, { color: colors.textcolor }]}>{props.mainTemp + Signs.CELSIUS}</Text>
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
