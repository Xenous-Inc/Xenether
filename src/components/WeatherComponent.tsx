import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Warning, WarningType } from '@components/Warning';
import TimeRelated from '@components/TimeRelated';
import { ITimeProps } from '@components/TimeRelated';
import { DateRelated, IDataProps } from '@components/DateRelated';
import colors from '@styles/colors';
import { ExtraInfo, IExtraInfoProps } from './ExtraInfo';

export interface IWeatherComponent {
    warningType: WarningType;
    arrayOfParameterTimeRelated: Array<ITimeProps>;
    arrayOfParameterDateRelated: Array<IDataProps>;
    arrayOfParameterExtraInfo: Array<IExtraInfoProps>;
}

const SetTimeRelatedComponents = (arrayOfParameterTimeRelated: Array<ITimeProps>) => {
    const ArrayTimeRelatedComponents = arrayOfParameterTimeRelated.map(element => {
        return (
            <TimeRelated
                time={element.time}
                weatherType={element.weatherType}
                temperature={element.temperature}
                key={element.time}
            />
        );
    });
    return ArrayTimeRelatedComponents;
};

const SetDateRelatedComponents = (arrayOfParameterDateRelated: Array<IDataProps>) => {
    const ArrayDateRelatedComponents = arrayOfParameterDateRelated.map(element => {
        return (
            <DateRelated
                date={element.date}
                weatherType={element.weatherType}
                dayTemp={element.dayTemp}
                nightTemp={element.nightTemp}
                key={element.date}
            />
        );
    });
    return ArrayDateRelatedComponents;
};

const SetExtraInfoComponents = (arrayOfParameterExtraInfo: Array<IExtraInfoProps>) => {
    const ArrayOfExtraInfoComponents = arrayOfParameterExtraInfo.map(element => {
        return <ExtraInfo catergory={element.catergory} digitalValue={element.digitalValue} key={element.catergory} />;
    });
    return ArrayOfExtraInfoComponents;
};

export const WeatherComponent: React.FC<IWeatherComponent> = props => {
    return (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.warningContainer}>
                <Warning warningType={props.warningType} />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.timeRelatedContainer}>
                    {SetTimeRelatedComponents(props.arrayOfParameterTimeRelated)}
                </View>
            </ScrollView>
            <View style={styles.dateRelatedContainer}>
                {SetDateRelatedComponents(props.arrayOfParameterDateRelated)}
            </View>
            <View style={styles.extraInfoContainer}>{SetExtraInfoComponents(props.arrayOfParameterExtraInfo)}</View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 20,
        width: '100%',
    },
    warningContainer: {
        justifyContent: 'center',
        marginBottom: 35,
        marginTop: 15,
        width: '100%',
        marginHorizontal: 42,
    },
    timeRelatedContainer: {
        marginHorizontal: 5,
        marginBottom: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    dateRelatedContainer: {
        backgroundColor: colors.WHITE,
        paddingTop: 25,
    },
    extraInfoContainer: {
        backgroundColor: colors.WHITE,
        paddingTop: 15,
        paddingBottom: 35,
        justifyContent: 'space-between',
        marginHorizontal: '7%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        rowGap: 20,
    },
});
