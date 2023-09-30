import { createContext, useContext } from 'react';
import { Theme } from '../storage/constants';
import { ITheme } from '@storage/types';
import Colors from '@styles/colors';

export const ThemeContext = createContext<ITheme>({
    themeMode: Theme.LIGHT,
    colors: {
        textcolor: Colors.BLACK,
        accentColor: Colors.WHITE,
        suppColor: Colors.LIGHT_GRAY,
        extraSuppColor: Colors.EXTRA_LIGHT_GRAY,
    },
});

export const useTheme = () => useContext(ThemeContext);
