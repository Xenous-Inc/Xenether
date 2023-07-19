import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stacks } from './constants';
import { MainStack, TMainStackParams } from './stacks/MainStack';
import { SettingsStack, TSettingsStackParams } from './stacks/SettingsStack';

export type TAppStackParams = {
    [Stacks.MAIN]: NavigatorScreenParams<TMainStackParams>;
    [Stacks.SETTINGS]: NavigatorScreenParams<TSettingsStackParams>;
};

const Stack = createNativeStackNavigator<TAppStackParams>();

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Stacks.MAIN} screenOptions={{ headerShown: false }}>
                <Stack.Screen key={Stacks.MAIN} name={Stacks.MAIN} component={MainStack} />
                <Stack.Screen key={Stacks.SETTINGS} name={Stacks.SETTINGS} component={SettingsStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
