import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AppRegistry, Text } from 'react-native';
import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { AppNavigator } from '@navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store, { persistor } from './src/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import SkeletonLoader from 'expo-skeleton-loader';
import colors from '@styles/colors';

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
        <Provider store={store}>
            <StatusBar backgroundColor='transparent' translucent={true} barStyle='dark-content' />
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider style={{ flex: 1 }} onLayout={onLayoutRootView}>
                    <AppNavigator />
                    
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
      
    );
}
