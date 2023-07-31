import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '@styles/colors';

export const Warning: React.FC<{ warningType: string }> = props => {
    return (
        <View style={styles.appearance}>
            <Image source={require('@assets/icons/flash_24.png')} style={styles.icon} />
            <Text style={styles.text}>{props.warningType}</Text>
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
        width: '100%',
        height: 52,
        borderRadius: 15,
    },
    text: {
        marginHorizontal: -8,
        flex: 1,
        fontSize: 16,
        fontFamily: 'ExpandedSemiBold',
        color: colors.WHITE,
        transform: [{ scaleY: 1.1 }],
    },
});
