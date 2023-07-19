import React from 'react';
import { Screens } from '../constants';
import { SettingsScreen } from '@screens/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type TSettingsStackParams = {
    [Screens.Settings.MAIN]: undefined;
};

const Stack = createNativeStackNavigator<TSettingsStackParams>();

export const SettingsStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Settings.MAIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Settings.MAIN} name={Screens.Settings.MAIN} component={SettingsScreen} />
        </Stack.Navigator>
    );
};
