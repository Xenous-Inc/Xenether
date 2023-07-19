import React from 'react';
import { Screens } from '../constants';
import { CitiesScreen } from '@screens/CitiesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type TCitiesStackParams = {
    [Screens.Cities.MAIN]: undefined;
};

const Stack = createNativeStackNavigator<TCitiesStackParams>();

export const CitiesStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Cities.MAIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Cities.MAIN} name={Screens.Cities.MAIN} component={CitiesScreen} />
        </Stack.Navigator>
    );
};
