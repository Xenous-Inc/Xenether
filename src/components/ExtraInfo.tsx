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

type CategoryToData = {
    [key in ExtraInfoType]: IComponentData;
};

interface IComponentData {
    src: number;
    extroInfoTitle: string;
    extroInfoComment: string;
    additionalInfo?: string;
    unitMeasure: string;
}

export interface IExtraInfoProps {
    catergory: ExtraInfoType;
    digitalValue: number;
}

const Icons: CategoryToData = {
    [ExtraInfoType.Precipitation]: {
        src: require('@assets/icons/water_drop_outline_20.png'),
        extroInfoTitle: ExtraInfoHead.PRECIPITATION,
        extroInfoComment: 'Ничего не ожидается в ближайшие 10 дней',
        additionalInfo: 'за 24 часа',
        unitMeasure: UnitMeasure.MILLIMETERS,
    },
    [ExtraInfoType.Visibility]: {
        src: require('@assets/icons/view_outline_28.png'),
        extroInfoTitle: ExtraInfoHead.VISIBILITY,
        extroInfoComment: 'Видимость снижена из-за дыма',
        unitMeasure: UnitMeasure.KILOMETERS,
    },
    [ExtraInfoType.RealFeel]: {
        src: require('@assets/icons/thermometer.png'),
        extroInfoTitle: ExtraInfoHead.REAL_FEEL,
        extroInfoComment: 'Дождь может стать прохладнее',
        unitMeasure: Signs.CELSIUS,
    },
    [ExtraInfoType.Humidity]: {
        src: require('@assets/icons/fog_16.png'),
        extroInfoTitle: ExtraInfoHead.HUMIDITY,
        extroInfoComment: 'Точка росы\nсейчас: 8' + Signs.PERCENT,
        unitMeasure: Signs.PERCENT,
    },
};

export const ExtraInfo: React.FC<IExtraInfoProps> = props => {
    const extraInfoData = Icons[props.catergory];
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image source={extraInfoData.src} style={styles.icon} />
                <Text style={styles.category}>{extraInfoData.extroInfoTitle}</Text>
            </View>
            <Text style={styles.mainInfo}>{props.digitalValue + extraInfoData.unitMeasure} </Text>
            <Text style={styles.nearestTime}>{extraInfoData.additionalInfo}</Text>
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
