import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { ICity } from '@storage/types';

const apiKey = 'f467ce1b7a6266168a069f38c99d7029';

type CitiesState = {
    cities: Array<ICity>;
    status: 'idle' | 'loading' | 'success' | 'error';
    error: SerializedError;
};
const initialState: CitiesState = {
    cities: [],
    status: 'idle',
    error: null,
};

export const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        removeCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(city => city.nameCity !== action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(createGetCityAction.pending, state => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(createGetCityAction.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error;
        });
        builder.addCase(createGetCityAction.fulfilled, (state, action) => {
            state.status = 'success';
            const isSameCity = state.cities.find(city => city.nameCity === action.meta.arg);
            if (!isSameCity) {
                state.cities.push({
                    nameCity: action.meta.arg,
                    timeZone: action.payload.timeZone,
                    minTemp: action.payload.minTemp,
                    maxTemp: action.payload.maxTemp,
                    description: action.payload.description,
                    mainTemp: action.payload.mainTemp,
                    icon: action.payload.icon,
                });
            }
        });
    },
});

export const createGetCityAction = createAsyncThunk('cities/fetchData', async (nameCity: string) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${apiKey}&lang=ru&units=metric`,
    );
    const data = await response.json();
    const dataCity: ICity = {
        nameCity: data.name,
        timeZone: data.timezone,
        minTemp: Math.trunc(data.main.temp_min),
        maxTemp: Math.trunc(data.main.temp_max),
        description: data.weather[0].description,
        mainTemp: Math.trunc(data.main.temp),
        icon: data.weather[0].icon,
    };
    return dataCity;
});

export const { removeCity } = citySlice.actions;
export default citySlice.reducer;
