import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import colors from '@styles/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { CurrentScreen } from '@screens/CurrentScreen';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export const MainScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        <PagerView
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={event => setCurrentIndex(event.nativeEvent.position)}
        >
            <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
                <CurrentScreen
                    index={0}
                    selectedIndex={currentIndex}
                    location='Омск'
                    timeZone={'Asia/Omsk'}
                    temperature={15}
                />
            </GestureHandlerRootView>
            <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
                <CurrentScreen
                    index={1}
                    selectedIndex={currentIndex}
                    location='Москва'
                    timeZone={'Europe/Moscow'}
                    temperature={-3}
                />
            </GestureHandlerRootView>
        </PagerView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
