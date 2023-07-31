import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Signs, ExtraInfoHead, UnitMeasure } from '@utils/constants';
import colors from '@styles/colors';
import { IExtraData } from '@storage/types';

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
    additionalInfo?: string;
    unitMeasure: string;
}

const Data: TypeToData = {
    [ExtraInfoType.Precipitation]: {
        src: require('@assets/icons/water_drop_outline_20.png'),
        title: ExtraInfoHead.PRECIPITATION,
        additionalInfo: 'за 24 часа',
        unitMeasure: UnitMeasure.MILLIMETERS,
    },
    [ExtraInfoType.Visibility]: {
        src: require('@assets/icons/view_outline_28.png'),
        title: ExtraInfoHead.VISIBILITY,
        unitMeasure: UnitMeasure.KILOMETERS,
    },
    [ExtraInfoType.RealFeel]: {
        src: require('@assets/icons/thermometer.png'),
        title: ExtraInfoHead.REAL_FEEL,
        unitMeasure: Signs.CELSIUS,
    },
    [ExtraInfoType.Humidity]: {
        src: require('@assets/icons/fog_16.png'),
        title: ExtraInfoHead.HUMIDITY,
        unitMeasure: Signs.PERCENT,
    },
};

export const ExtraInfo: React.FC<IExtraData> = props => {
    const extraInfoData = Data[props.title];
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image source={extraInfoData.src} style={styles.icon} />
                <Text style={styles.category}>{extraInfoData.title}</Text>
            </View>
            <Text style={styles.mainInfo}>{props.digitalValue + extraInfoData.unitMeasure} </Text>
            <Text style={styles.nearestTime}>{extraInfoData.additionalInfo}</Text>
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
});
