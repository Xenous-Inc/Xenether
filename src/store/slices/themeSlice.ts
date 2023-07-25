import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@storage/constants';

type DegState = {
    theme: ThemeType;
};
const initialState: DegState = {
    theme: ThemeType.System,
};
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<ThemeType>) {
            state.theme = action.payload;
        },
    },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
