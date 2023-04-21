import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import colors from '@styles/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { CurrentScreen } from '@screens/CurrentScreen';

export const MainScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <PagerView
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={event => setCurrentIndex(event.nativeEvent.position)}
        >
            <GestureHandlerRootView style={styles.container}>
                <CurrentScreen
                    index={0}
                    selectedIndex={currentIndex}
                    location='Омск'
                    timeZone={'Asia/Omsk'}
                    temperature={15}
                />
            </GestureHandlerRootView>
            <GestureHandlerRootView style={styles.container}>
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
