import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Warning } from '@components/Warning';
import TimeRelated from '@components/TimeRelated';
import { DateRelated } from '@components/DateRelated';
import colors from '@styles/colors';
import { ExtraInfo } from './ExtraInfo';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ICityName, IDailyEl, IExtraData, IHourlyEl, Status } from '@storage/types';
import { useAppSelector } from '../store/store';

export interface IWeatherComponent {
    name: ICityName;
}

const getTimeRelatedComponents = (timeRelatedArray: IHourlyEl[]) => {
    return timeRelatedArray.slice(0, 24).map((element, index) => {
        return (
            <TimeRelated
                time={element.time}
                weatherCode={element.weatherCode}
                mainTemp={element.mainTemp}
                key={index}
            />
        );
    });
};

const getDateRelatedComponents = (dateRelatedArray: IDailyEl[]) => {
    return dateRelatedArray.map((element, index) => {
        return (
            <DateRelated
                date={element.date}
                weatherCode={element.weatherCode}
                dayTemp={element.dayTemp}
                nightTemp={element.nightTemp}
                key={index}
            />
        );
    });
};

const getExtraInfoComponents = (extraInfoArray: IExtraData[]) => {
    return extraInfoArray.slice(0, 4).map((element, index) => {
        return <ExtraInfo title={element.title} digitalValue={element.digitalValue} key={index} />;
    });
};

export const WeatherComponent: React.FC<IWeatherComponent> = props => {
    const weather = useAppSelector(store => store.weather[props.name.nameCity]);

    const extra = useMemo(() => {
        return weather.data.dataWeather?.extra.map(el => {
            const extraData: IExtraData = {};

            extraData.title = el.precipitation.title;
            extraData.digitalValue = el.precipitation.digitalValue;
            // доделать логику вывода extra elements

            return extraData;
        });
    }, [weather]);

    return (

        <View style={styles.scrollContainer}>
            <View style={styles.warningContainer}>
                <Warning warningType={weather.data.cityWeather.description.toUpperCase()} />
            </View>
            {weather.status === Status.Success && extra && (
                <>
                    <BottomSheetScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.timeRelatedContainer}>
                            {getTimeRelatedComponents(weather.data.dataWeather.hourly)}
                        </View>
                    </BottomSheetScrollView>
                    <View style={styles.dateRelatedContainer}>
                        {getDateRelatedComponents(weather.data.dataWeather.daily)}
                    </View>
                    <View style={styles.extraInfoContainer}>{getExtraInfoComponents(extra)}</View>
                </>
            )}
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
        marginTop: 10,
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
