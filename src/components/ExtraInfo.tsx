import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { signs, extraInfoType, unitMeasure } from '@utils/constants';
import colors from '@styles/colors';

export enum ExtraInfoType {
    Precipitation,
    Visibility,
    realFeel,
    Humidity,
}

type CategoryToIcon = {
    [key in ExtraInfoType]: IIconData;
};

interface IIconData {
    src: number;
    extroInfoTitle: string;
    extroInfoComment: string;
}

export interface IProps {
    catergory: ExtraInfoType;
    digitalValue: number;
    comment?: string;
}

const Icons: CategoryToIcon = {
    [ExtraInfoType.Precipitation]: {
        src: require('@assets/icons/water_drop_outline_20.png'),
        extroInfoTitle: extraInfoType.PRECIPITATION,
        extroInfoComment: 'Ничего не ожидается в ближайшие 10 дней',
    },
    [ExtraInfoType.Visibility]: {
        src: require('@assets/icons/view_outline_28.png'),
        extroInfoTitle: extraInfoType.VISIBILITY,
        extroInfoComment: 'Видимость снижена из-за дыма',
    },
    [ExtraInfoType.realFeel]: {
        src: require('@assets/icons/thermometer.png'),
        extroInfoTitle: extraInfoType.REAL_FEEL,
        extroInfoComment: 'Дождь может стать прохладнее',
    },
    [ExtraInfoType.Humidity]: {
        src: require('@assets/icons/fog_16.png'),
        extroInfoTitle: extraInfoType.HUMIDITY,
        extroInfoComment: 'Точка росы\nсейчас: 8' + signs.PERCENT,
    },
};

const SetUnitMeasure = (titleCategory: ExtraInfoType) => {
    switch (titleCategory) {
        case ExtraInfoType.Precipitation:
            return unitMeasure.MILLIMETERS;
        case ExtraInfoType.Visibility:
            return unitMeasure.KILOMETERS;
        case ExtraInfoType.realFeel:
            return signs.CELSIUS;
        case ExtraInfoType.Humidity:
            return signs.PERCENT;
        default:
            return;
    }
};

export const ExtraInfo: React.FC<IProps> = props => {
    const extraInfoData = Icons[props.catergory];
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image source={extraInfoData.src} style={styles.icon} />
                <Text style={styles.category}>{extraInfoData.extroInfoTitle}</Text>
            </View>
            <Text style={styles.mainInfo}>{props.digitalValue + SetUnitMeasure(props.catergory)} </Text>
            <Text style={styles.nearestTime}>{props.comment}</Text>
            <Text style={styles.terms}>{extraInfoData.extroInfoComment}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.LIGHT_GRAY,
        width: '37.5%',
        height: 152,
        borderRadius: 16,
        position: 'relative',
    },
    head: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: 13,
        marginLeft: 12,
        opacity: 0.5,
    },
    category: {
        opacity: 0.5,
        fontFamily: 'ExtendedSemiblod',
        fontSize: 11,
        marginLeft: 5,
        marginTop: 15,
    },
    mainInfo: {
        fontFamily: 'ExtendedBold',
        fontSize: 32,
        marginLeft: 17,
        marginTop: 13,
        transform: [{ scaleX: 1.1 }],
    },
    nearestTime: {
        fontFamily: 'ExtendedSemiblod',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 2,
    },
    terms: {
        fontFamily: 'ExtendedRegular',
        color: colors.GRAY,
        textAlign: 'left',
        fontSize: 11,
        marginLeft: 5,
        padding: 5,
        marginTop: 105,
        position: 'absolute',
    },
});
