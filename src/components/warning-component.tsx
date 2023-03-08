import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '@styles/colors';

enum warningType {
    Thunderstorm,
    Strong_wind,
    Snowstorm,
    Rain,
    Fog,
    Little_wind,
    hail,
}

export function Warning(War: warningType) {
    switch (War) {
        case warningType.Thunderstorm:
            return 'Возможна гроза';
            break;
        case warningType.Strong_wind:
            return 'Возможно сильный ветер';
            break;
        case warningType.Snowstorm:
            return 'Возможна метель';
            break;
        case warningType.Rain:
            return 'Возможно дождь';
            break;
        case warningType.Fog:
            return 'Возможно туман';
            break;
        case warningType.Little_wind:
            return 'Возможно слабый ветер';
            break;
        case warningType.hail:
            return 'Возможно град';
            break;
        default:
            return 'Предупреждений нет';
    }
}

export default function Shape() {
    return (
        <View>
            <View style={styles.appearance}>
                <Image source={require('@assets/icon/flash_24.png')} style={styles.icon} />
                <Text style={styles.text}>{Warning(warningType.Thunderstorm)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 14,
    },
    appearance: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.LIGHT_ORANGE,
        width: 327,
        height: 52,
        borderRadius: 16,
    },
    text: {
        marginHorizontal: -5,
        flex: 1,
        fontSize: 16,
        fontFamily: 'ExpandedSemiblod',
        color: colors.WHITE,
        transform: [{ scaleY: 1.1 }],
    },
});
