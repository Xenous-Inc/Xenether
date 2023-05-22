import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { AppNavigator } from '@navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
        <SafeAreaProvider style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <AppNavigator />
        </SafeAreaProvider>
    );
}
