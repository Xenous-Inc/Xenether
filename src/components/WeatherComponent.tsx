import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Warning } from '@components/Warning';
import TimeRelated from '@components/TimeRelated';
import { DateRelated } from '@components/DateRelated';
import Colors from '@styles/colors';
import { ExtraInfo } from './ExtraInfo';
import { MAIN_HORIZONTAL_OFFSET } from '@styles/constants';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ICityName, IDailyEl, IExtraData, IExtraEl, IHourlyEl, Status } from '@storage/types';
import { useAppSelector } from '../store/store';
import { PlaceSkeleton } from './PlaceSkeleton';
import { useTheme } from '../model/themeContext';

export interface IWeatherComponent {
    name: ICityName;
}

const getTimeRelatedComponents = (timeRelatedArray: IHourlyEl[] | undefined) => {
    if (timeRelatedArray) {
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
    }
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

const getExtraInfoComponents = (extraInfoArray: (IExtraData | undefined)[]) => {
    return extraInfoArray.map((element, index) => {
        if (element) {
            return <ExtraInfo title={element.title} digitalValue={element.digitalValue} key={index} />;
        }
    });
};

export const WeatherComponent: React.FC<IWeatherComponent> = props => {
    const {
        status,
        error,
        data: weather,
    } = useAppSelector(store => store.weather[props.name.nameCity] ?? { status: Status.Idle });

    const theme = useTheme();

    const extra = useMemo(() => {
        if (weather) {
            const currentExtra: IExtraEl = weather.dataWeather.extra[0];
            console.log(currentExtra);

            const extraData = Object.values(currentExtra) as Array<IExtraData>;
            console.log(`Array is - ${extraData}`);
            return extraData;
        }
    }, [weather]);

    if (status === Status.Idle || status === Status.Pending) {
        return <PlaceSkeleton />;
    }


    if (status === Status.Error || !weather || !extra) {
        return <View style={styles.wrapper} />;
    }

    return (
        <View style={[styles.scrollContainer]}>
            <View style={styles.warningContainer}>
                <Warning
                    warningType={
                        weather.cityWeather.description[0].toUpperCase() + weather.cityWeather.description.slice(1)
                    }
                />
            </View>

            <BottomSheetScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.timeRelatedContainer}>{getTimeRelatedComponents(weather.dataWeather.hourly)}</View>
            </BottomSheetScrollView>
            <View style={styles.dateRelatedContainer}>{getDateRelatedComponents(weather.dataWeather.daily)}</View>
            <View style={[styles.extraInfoContainer, { backgroundColor: theme.colors?.accentColor }]}>
                {getExtraInfoComponents(extra)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
    },
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
        backgroundColor: Colors.WHITE,
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
