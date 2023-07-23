import { createSlice } from '@reduxjs/toolkit';
import { UnitsType } from '@storage/constants';

type DegState = {
    deg: UnitsType;
};
const initialState: DegState = {
    deg: UnitsType.Celsius,
};
export const degSlice = createSlice({
    name: 'deg',
    initialState,
    reducers: {
        changeDeg(state) {
            if (state.deg !== UnitsType.Celsius) {
                state.deg = UnitsType.Celsius;
            } else {
                state.deg = UnitsType.Fahrenheits;
            }
        },
    },
});

export const { changeDeg } = degSlice.actions;
export default degSlice.reducer;
