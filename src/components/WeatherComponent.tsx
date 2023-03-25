import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Warning, WarningType } from '@components/Warning';
import TimeRelated from '@components/TimeRelated';
import { ITimeProps } from '@components/TimeRelated';
import { DateRelated, IDateProps } from '@components/DateRelated';
import colors from '@styles/colors';
import { ExtraInfo, IExtraInfoProps } from './ExtraInfo';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';


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
        <View style={styles.scrollContainer}>
            <View style={styles.warningContainer}>
                <Warning warningType={props.warningType} />
            </View>
            <BottomSheetScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.timeRelatedContainer}>{getTimeRelatedComponents(props.timeRelatedArray)}</View>
            </BottomSheetScrollView>
            <View style={styles.dateRelatedContainer}>{getDateRelatedComponents(props.dateRelatedArray)}</View>
            <View style={styles.extraInfoContainer}>{getExtraInfoComponents(props.extraInfoArray)}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 10,
        width: '100%',
    },
    warningContainer: {
        justifyContent: 'center',
        marginBottom: 35,
        marginTop: 15,
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
    },
    timeRelatedContainer: {
        marginHorizontal: MAIN_HORIZONTAL_OFFSET,
        marginBottom: 10,
        flexDirection: 'row',
        columnGap: 7,
    },
    dateRelatedContainer: {
        marginTop: 25,
        paddingHorizontal: MAIN_HORIZONTAL_OFFSET,
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
