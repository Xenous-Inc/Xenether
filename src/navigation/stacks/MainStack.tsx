import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screens } from '../constants';
import { MainScreen } from '@screens/MainScreen';

export type TMainStackParams = {
    [Screens.Main.MAIN]: undefined;
};

const Stack = createNativeStackNavigator<TMainStackParams>();

export const MainStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Main.MAIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Main.MAIN} name={Screens.Main.MAIN} component={MainScreen} />
        </Stack.Navigator>
    );
};
