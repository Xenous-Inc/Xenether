import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Warning, WarningType } from '@components/Warning';
import TimeRelated from '@components/TimeRelated';
import { ITimeProps } from '@components/TimeRelated';
import { DateRelated, IDateProps } from '@components/DateRelated';
import colors from '@styles/colors';
import { ExtraInfo, IExtraInfoProps } from './ExtraInfo';
import { BottomSheetStyle } from '@styles/constants';

export interface IWeatherComponent {
    warningType: WarningType;
    timeRelatedArray: Array<ITimeProps>;
    dateRelatedArray: Array<IDateProps>;
    extraInfoArray: Array<IExtraInfoProps>;
}

const getTimeRelatedComponents = (timeRelatedArray: Array<ITimeProps>) => {
    return timeRelatedArray.map((element, index) => {
        return (
            <TimeRelated
                time={element.time}
                weatherType={element.weatherType}
                temperature={element.temperature}
                key={index}
            />
        );
    });
};

const getDateRelatedComponents = (dateRelatedArray: Array<IDateProps>) => {
    return dateRelatedArray.map((element, index) => {
        return (
            <DateRelated
                date={element.date}
                weatherType={element.weatherType}
                dayTemp={element.dayTemp}
                nightTemp={element.nightTemp}
                key={index}
            />
        );
    });
};

const getExtraInfoComponents = (extraInfoArray: Array<IExtraInfoProps>) => {
    return extraInfoArray.map((element, index) => {
        return <ExtraInfo type={element.type} digitalValue={element.digitalValue} key={index} />;
    });
};

export const WeatherComponent: React.FC<IWeatherComponent> = props => {
    return (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.warningContainer}>
                <Warning warningType={props.warningType} />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.timeRelatedContainer}>{getTimeRelatedComponents(props.timeRelatedArray)}</View>
            </ScrollView>
            <View style={styles.dateRelatedContainer}>{getDateRelatedComponents(props.dateRelatedArray)}</View>
            <View style={styles.extraInfoContainer}>{getExtraInfoComponents(props.extraInfoArray)}</View>
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
        marginHorizontal: BottomSheetStyle.BOTTOM_SHEET_HORIZONTAL_OFFSET,
    },
    timeRelatedContainer: {
        marginHorizontal: BottomSheetStyle.BOTTOM_SHEET_HORIZONTAL_OFFSET,
        marginBottom: 10,
        flexDirection: 'row',
        columnGap: 7,
    },
    dateRelatedContainer: {
        marginTop: 25,
        paddingHorizontal: BottomSheetStyle.BOTTOM_SHEET_HORIZONTAL_OFFSET,
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
