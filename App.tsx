import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
SplashScreen.preventAutoHideAsync();
export default function App() {
    const [fontsLoaded] = useFonts({
        ExpandedBold: require('./src/assets/fonts/RFDewiExpanded-Bold.ttf'),
        ExpandedSemiblod: require('./src/assets/fonts/RFDewiExpanded-Semibold.ttf'),
        ExpandedUltrabold: require('./src/assets/fonts/RFDewiExpanded-Ultrabold.ttf'),
        ExtendedBold: require('./src/assets/fonts/RFDewiExtended-Bold.ttf'),
        ExtendedRegular: require('./src/assets/fonts/RFDewiExtended-Regular.ttf'),
        ExtendedSemiblod: require('./src/assets/fonts/RFDewiExtended-Semibold.ttf'),
        ProTextMedium: require('./src/assets/fonts/SFProText-Medium.ttf'),
        ProTextBold: require('./src/assets/fonts/SFProText-Bold.ttf'),
        ProTextSemibold: require('./src/assets/fonts/SFProText-Semibold.ttf'),
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
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text> Open up App js to start working on your app!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
