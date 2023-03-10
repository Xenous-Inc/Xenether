import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '@styles/colors';
import { conditions } from '@utils/constants';

export enum WarningType {
    Thunderstorm,
    StrongWind,
    Snowstorm,
    Rain,
    Fog,
    LittleWind,
    Hail,
}

const getWarningText = (War: WarningType) => {
    switch (War) {
        case WarningType.Thunderstorm:
            return conditions.THUNDERSTORM;

        case WarningType.StrongWind:
            return conditions.STRONG_WIND;

        case WarningType.Snowstorm:
            return conditions.SNOWSTORM;

        case WarningType.Rain:
            return conditions.RAIN;

        case WarningType.Fog:
            return conditions.FOG;

        case WarningType.LittleWind:
            return conditions.LITTLE_WIND;

        case WarningType.Hail:
            return conditions.HAIL;

        default:
            return conditions.NOT_WARNINGS;
    }
};

export const Warning: React.FC<{ warningType: WarningType }> = props => {
    return (
        <View style={styles.appearance}>
            <Image source={require('@assets/icons/flash_24.png')} style={styles.icon} />
            <Text style={styles.text}>{getWarningText(props.warningType)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: '5%',
        height: 24,
        marginHorizontal: 18,
    },
    appearance: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.LIGHT_ORANGE,
        width: '80%',
        height: 52,
        borderRadius: 15,
    },
    text: {
        marginHorizontal: -8,
        flex: 1,
        fontSize: 16,
        fontFamily: 'ExpandedSemiblod',
        color: colors.WHITE,
        transform: [{ scaleY: 1.1 }],
    },
});