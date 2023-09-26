import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UnitsType } from '@storage/constants';
import { SwitcherStatus } from '@storage/constants';
import { ThemeType } from '@storage/constants';
import { ITheme } from '@storage/types';
import colors from '@styles/colors';
import { ColorSchemeName } from 'react-native';

type SettingState = {
    deg: UnitsType;
    notice: SwitcherStatus;
    theme: ITheme;
};
type ThemeAction = {
    system?: ColorSchemeName;
    theme: ThemeType;
};
const initialThemeMode = {
    color: colors.BLACK,
    backgroud: colors.WHITE,
};
const initialState: SettingState = {
    deg: UnitsType.Celsius,
    notice: SwitcherStatus.On,
    theme: {
        nameTheme: ThemeType.System,
        mode: initialThemeMode,
        systemMode: undefined,
    },
};
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeDeg(state) {
            state.deg !== UnitsType.Celsius ? (state.deg = UnitsType.Celsius) : (state.deg = UnitsType.Fahrenheits);
        },
        setSystemTheme(state, action: PayloadAction<ColorSchemeName>) {
            state.theme.systemMode = action.payload;
        },
        changeTheme(state, action: PayloadAction<ThemeAction>) {
            state.theme.nameTheme = action.payload.theme;

            state.theme.nameTheme === ThemeType.System && action.payload.system === 'light'
                ? (state.theme.mode = { color: colors.BLACK, backgroud: colors.WHITE })
                : (state.theme.mode = { color: colors.WHITE, backgroud: colors.BACKGROUND_COLOR });

            state.theme.nameTheme === ThemeType.Dark
                ? (state.theme.mode = { color: colors.WHITE, backgroud: colors.BACKGROUND_COLOR })
                : (state.theme.mode = { color: colors.BLACK, backgroud: colors.WHITE });
        },
        switchToggle(state) {
            state.notice !== SwitcherStatus.On
                ? (state.notice = SwitcherStatus.On)
                : (state.notice = SwitcherStatus.Off);
        },
    },
});

export const { changeDeg, changeTheme, switchToggle, setSystemTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
