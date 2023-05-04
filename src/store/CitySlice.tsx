import { createSlice } from '@reduxjs/toolkit';

const citySlice = createSlice({
    name: 'City',
    initialState: {
        cities: [],
    },
    reducers: {
        addCity(state, action) {
            state.cities.push({
                location: action.payload.text,
                timeZone: action.payload.text,
            });
        },
        removeCity(state, action) {
            state.cities = state.cities.filter(city => {
                city.location !== action.payload.location;
            });
        },
    },
});

export const { addCity, removeCity } = citySlice.actions;

export default citySlice.reducer;
