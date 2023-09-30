import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxTheme, ReduxThemeType, UnitsType } from '@storage/constants';
import { SwitcherStatus } from '@storage/constants';

type SettingState = {
    deg: UnitsType;
    notice: SwitcherStatus;
    theme: ReduxThemeType;
};
const initialState: SettingState = {
    deg: UnitsType.Celsius,
    notice: SwitcherStatus.On,
    theme: ReduxTheme.SYSTEM as ReduxThemeType,
};
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeDeg(state) {
            state.deg !== UnitsType.Celsius ? (state.deg = UnitsType.Celsius) : (state.deg = UnitsType.Fahrenheits);
        },
        changeTheme(state, action: PayloadAction<ReduxThemeType>) {
            state.theme = action.payload;
        },
        switchToggle(state) {
            state.notice !== SwitcherStatus.On
                ? (state.notice = SwitcherStatus.On)
                : (state.notice = SwitcherStatus.Off);
        },
    },
});

export const { changeDeg, changeTheme, switchToggle } = settingsSlice.actions;
export default settingsSlice.reducer;
