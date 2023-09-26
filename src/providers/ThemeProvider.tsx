import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { setSystemTheme } from '../store/slices/settingsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);

    const { theme } = useAppSelector(state => state.settings);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!theme.systemMode && !isMounted) {
            dispatch(setSystemTheme(useColorScheme()));
        }
        setIsMounted(true);
    }, [theme.systemMode]);

    if (!theme.systemMode && !isMounted) {
        return <></>;
    }
    return <>{children}</>;
};

export default ThemeProvider;
