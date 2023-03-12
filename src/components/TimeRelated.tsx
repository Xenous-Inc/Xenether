import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherType, WeatherIcon } from '@components/WeatherIcon';
import { getHours } from 'date-fns';

export interface IProps {
    time: string;
    weatherType: WeatherType;
    temperature: number;
}

const currentDate = new Date();

const SetHours = (timeData: string) => {
    const hoursValue = getHours(new Date(timeData));

    if (hoursValue === getHours(currentDate)) {
        return 'Сейчас';
    }
    if (hoursValue < 10) {
        return '0' + hoursValue + ':00';
    }
    return hoursValue + ':00';
};

const TimeRelated: React.FC<IProps> = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.timeInfo}>{SetHours(props.time)}</Text>
            <View style={styles.icon}>
                <WeatherIcon weatherType={props.weatherType} />
            </View>
            <Text style={styles.temperatureInfo}>{props.temperature.toString() + '\u00B0'}</Text>
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
