import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherType, WeatherIcon } from '@components/WeatherIcon';
import { getHours, format } from 'date-fns';
import { signs } from '@utils/constants';

export interface IProps {
    time: string;
    weatherType: WeatherType;
    temperature: number;
}

const SetHours = (timeData: string) => {
    const currentHour = getHours(new Date());
    const inputHours = getHours(new Date(timeData));
    return inputHours === currentHour ? 'Сейчас' : format(new Date(timeData), 'HH:mm');
};

const TimeRelated: React.FC<IProps> = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.timeInfo}>{SetHours(props.time)}</Text>
            <View style={styles.icon}>
                <WeatherIcon weatherType={props.weatherType} style={styles.icon} />
            </View>
            <Text style={styles.temperatureInfo}>{props.temperature.toString() + signs.CELSIUS}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    timeInfo: {
        fontSize: 12,
        fontFamily: 'ExtendedSemiblod',
        alignItems: 'center',
        justifyContent: 'center',
    },
    temperatureInfo: {
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
    icon: {
        marginVertical: 1,
    },
});

export default TimeRelated;
