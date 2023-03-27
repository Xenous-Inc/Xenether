import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Signs, ExtraInfoHead, UnitMeasure } from '@utils/constants';
import colors from '@styles/colors';

export enum ExtraInfoType {
    Precipitation,
    Visibility,
    RealFeel,
    Humidity,
}

type TypeToData = {
    [key in ExtraInfoType]: IComponentData;
};

interface IComponentData {
    src: number;
    title: string;
    comment: string;
    additionalInfo?: string;
    unitMeasure: string;
}

export interface IExtraInfoProps {
    type: ExtraInfoType;
    digitalValue: number;
}

const Data: TypeToData = {
    [ExtraInfoType.Precipitation]: {
        src: require('@assets/icons/water_drop_outline_20.png'),
        title: ExtraInfoHead.PRECIPITATION,
        comment: 'Ничего не ожидается в ближайшие 10 дней',
        additionalInfo: 'за 24 часа',
        unitMeasure: UnitMeasure.MILLIMETERS,
    },
    [ExtraInfoType.Visibility]: {
        src: require('@assets/icons/view_outline_28.png'),
        title: ExtraInfoHead.VISIBILITY,
        comment: 'Видимость снижена из-за дыма',
        unitMeasure: UnitMeasure.KILOMETERS,
    },
    [ExtraInfoType.RealFeel]: {
        src: require('@assets/icons/thermometer.png'),
        title: ExtraInfoHead.REAL_FEEL,
        comment: 'Дождь может стать прохладнее',
        unitMeasure: Signs.CELSIUS,
    },
    [ExtraInfoType.Humidity]: {
        src: require('@assets/icons/fog_16.png'),
        title: ExtraInfoHead.HUMIDITY,
        comment: 'Точка росы\nсейчас: 8' + Signs.PERCENT,
        unitMeasure: Signs.PERCENT,
    },
};

export const ExtraInfo: React.FC<IExtraInfoProps> = props => {
    const extraInfoData = Data[props.type];
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image source={extraInfoData.src} style={styles.icon} />
                <Text style={styles.category}>{extraInfoData.title}</Text>
            </View>
            <Text style={styles.mainInfo}>{props.digitalValue + extraInfoData.unitMeasure} </Text>
            <Text style={styles.nearestTime}>{extraInfoData.additionalInfo}</Text>
            <Text style={styles.terms}>{extraInfoData.comment}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.LIGHT_GRAY,
        width: '47%',
        height: 152,
        borderRadius: 16,
        justifyContent: 'space-between',
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
        fontFamily: 'ExtendedSemiBold',
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
        fontFamily: 'ExtendedSemiBold',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 2,
    },
    terms: {
        fontFamily: 'ExtendedRegular',
        color: colors.GRAY,
        textAlign: 'left',
        fontSize: 11,
        marginHorizontal: 10,
        marginBottom: 10,
    },
});
