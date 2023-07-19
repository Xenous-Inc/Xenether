import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stacks } from './constants';
import { MainStack, TMainStackParams } from './stacks/MainStack';
import { SettingsStack, TSettingsStackParams } from './stacks/SettingsStack';
import { CitiesStack, TCitiesStackParams } from './stacks/CitiesStack';

export type TAppStackParams = {
    [Stacks.MAIN]: NavigatorScreenParams<TMainStackParams>;
    [Stacks.SETTINGS]: NavigatorScreenParams<TSettingsStackParams>;
    [Stacks.CITIES]: NavigatorScreenParams<TCitiesStackParams>;
};

const Stack = createNativeStackNavigator<TAppStackParams>();

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Stacks.MAIN} screenOptions={{ headerShown: false }}>
                <Stack.Screen key={Stacks.MAIN} name={Stacks.MAIN} component={MainStack} />
                <Stack.Screen key={Stacks.SETTINGS} name={Stacks.SETTINGS} component={SettingsStack} />
                <Stack.Screen key={Stacks.CITIES} name={Stacks.CITIES} component={CitiesStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
