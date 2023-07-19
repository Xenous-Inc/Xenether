import React from 'react';
import { Screens } from '../constants';
import { CitiesScreen } from '@screens/CitiesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type TCitiesStackParams = {
    [Screens.Settings.CITIES]: undefined;
};

const Stack = createNativeStackNavigator<TCitiesStackParams>();

export const CitiesStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Settings.CITIES} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Settings.CITIES} name={Screens.Settings.CITIES} component={CitiesScreen} />
        </Stack.Navigator>
    );
};
