import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import colors from '@styles/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CityComponent } from '@components/CityComponent';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        ExpandedBold: require('@assets/fonts/RFDewiExpanded-Bold.ttf'),
        ExpandedSemiBold: require('@assets/fonts/RFDewiExpanded-Semibold.ttf'),
        ExpandedUltraBold: require('@assets/fonts/RFDewiExpanded-Ultrabold.ttf'),
        ExtendedBold: require('@assets/fonts/RFDewiExtended-Bold.ttf'),
        ExtendedRegular: require('@assets/fonts/RFDewiExtended-Regular.ttf'),
        ExtendedSemiBold: require('@assets/fonts/RFDewiExtended-Semibold.ttf'),
        ProTextMedium: require('@assets/fonts/SFProText-Medium.ttf'),
        ProTextBold: require('@assets/fonts/SFProText-Bold.ttf'),
        ProTextSemiBold: require('@assets/fonts/SFProText-Semibold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
            <CityComponent location={'Омск'} timeZone={'Asia/Omsk'} />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
