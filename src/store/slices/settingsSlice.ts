import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UnitsType } from '@storage/constants';
import { SwitcherStatus } from '@storage/constants';
import { ThemeType } from '@storage/constants';

type SettingState = {
    deg: UnitsType;
    notice: SwitcherStatus;
    theme: ThemeType;
};
const initialState: SettingState = {
    deg: UnitsType.Celsius,
    notice: SwitcherStatus.On,
    theme: ThemeType.System,
};
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeDeg(state) {
           state.deg !== UnitsType.Celsius?
                state.deg = UnitsType.Celsius : state.deg = UnitsType.Fahrenheits
            
        },
        changeTheme(state, action: PayloadAction<ThemeType>) {
            state.theme = action.payload;
        },
        switchToggle(state) {
           state.notice !== SwitcherStatus.On?
                state.notice = SwitcherStatus.On : state.notice = SwitcherStatus.Off;
            
        },
    },
});

export const { changeDeg, changeTheme, switchToggle } = settingsSlice.actions;
export default settingsSlice.reducer;
