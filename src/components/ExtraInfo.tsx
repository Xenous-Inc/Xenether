import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Signs, ExtraInfoHead, UnitMeasure } from '@utils/constants';
import { IExtraData } from '@storage/types';
import { Theme } from '@storage/constants';
import { useTheme } from '../model/themeContext';
import Colors from '@styles/colors';

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
    white_src: number;
    dark_src: number;
    title: string;
    additionalInfo?: string;
    unitMeasure: string;
}

const Data: TypeToData = {
    [ExtraInfoType.Precipitation]: {
        dark_src: require('@assets/icons/water_drop_outline_20.png'),
        white_src: require('@assets/icons/white-precipitation.png'),
        title: ExtraInfoHead.PRECIPITATION,
        additionalInfo: 'за 24 часа',
        unitMeasure: UnitMeasure.MILLIMETERS,
    },
    [ExtraInfoType.Visibility]: {
        dark_src: require('@assets/icons/view_outline_28.png'),
        white_src: require('@assets/icons/white-visibility.png'),
        title: ExtraInfoHead.VISIBILITY,
        unitMeasure: UnitMeasure.KILOMETERS,
    },
    [ExtraInfoType.RealFeel]: {
        dark_src: require('@assets/icons/thermometer.png'),
        white_src: require('@assets/icons/white-real-feel.png'),
        title: ExtraInfoHead.REAL_FEEL,
        unitMeasure: Signs.CELSIUS,
    },
    [ExtraInfoType.Humidity]: {
        dark_src: require('@assets/icons/fog_16.png'),
        white_src: require('@assets/icons/white-humidity.png'),
        title: ExtraInfoHead.HUMIDITY,
        unitMeasure: Signs.PERCENT,
    },
};

export const ExtraInfo: React.FC<IExtraData> = props => {
    const { themeMode, colors } = useTheme();
    if (props.title !== undefined) {
        const extraInfoData = Data[props.title];
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: themeMode === Theme.DARK ? Colors.SECTION_COLOR : Colors.LIGHT_GRAY },
                ]}
            >
                <View style={styles.head}>
                    <Image
                        source={themeMode === Theme.DARK ? extraInfoData.white_src : extraInfoData.dark_src}
                        style={styles.icon}
                    />
                    <Text style={[styles.category, { color: colors.textcolor }]}>{extraInfoData.title}</Text>
                </View>
                <Text style={[styles.mainInfo, { color: colors.textcolor }]}>
                    {props.digitalValue + extraInfoData.unitMeasure}{' '}
                </Text>
                <Text style={[styles.nearestTime, { color: colors.textcolor }]}>{extraInfoData.additionalInfo}</Text>
            </View>
        );
    }
    return <></>;
};

const styles = StyleSheet.create({
    container: {
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
