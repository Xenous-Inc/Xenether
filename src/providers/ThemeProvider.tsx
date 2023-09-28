import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxTheme, Theme, type ThemeType } from '../storage/constants';
import { ThemeContext } from '../model/themeContext';
import { selectTheme } from '../model/themeSelector';
import { useColorScheme } from 'react-native';
import { IThemValues } from '@storage/types';
import Colors from '@styles/colors';

const ColorValues: Record<ThemeType, IThemValues> = {
    [Theme.LIGHT]: {
        textcolor: Colors.BLACK,
        accentColor: Colors.WHITE,
        suppColor: Colors.LIGHT_GRAY,
        extraSuppColor: Colors.EXTRA_LIGHT_GRAY,
    },
    [Theme.DARK]: {
        textcolor: Colors.WHITE,
        accentColor: Colors.BACKGROUND_COLOR,
        suppColor: Colors.SECTION_COLOR,
        extraSuppColor: Colors.BUTTONS_COLOR,
    },
};
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const reduxTheme = useSelector(selectTheme);
    const systemTheme = useColorScheme();
    const [currentTheme, setCurrentTheme] = useState<ThemeType | undefined>(undefined);

    useEffect(() => {
        if (reduxTheme === ReduxTheme.SYSTEM) {
            setCurrentTheme(systemTheme === 'dark' ? Theme.DARK : Theme.LIGHT);
        } else {
            setCurrentTheme(reduxTheme);
        }
    }, [reduxTheme, systemTheme]);

    if (!currentTheme) return <></>;

    return (
        <ThemeContext.Provider value={{ themeMode: currentTheme, colors: ColorValues[currentTheme] }}>
            {children}
        </ThemeContext.Provider>
    );
};
