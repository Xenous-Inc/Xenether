import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { IApiState, ICityName, Status } from '@storage/types';

const apiKey = 'f467ce1b7a6266168a069f38c99d7029';

type CitiesState = IApiState<Array<ICityName>>;
const initialState: CitiesState = {
    data: [],
    status: Status.Idle,
    error: null,
};

export const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        removeCity(state, action: PayloadAction<string>) {
            state.data = state.data.filter(city => city.nameCity !== action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(createGetCityAction.pending, state => {
            state.status = Status.Pending;
            state.error = null;
        });
        builder.addCase(createGetCityAction.rejected, (state, action) => {
            state.status = Status.Error;
            state.error = action.error;
        });
        builder.addCase(createGetCityAction.fulfilled, (state, action) => {
            state.status = Status.Success;
            const isSameCity = state.data.find(city => city.nameCity === action.meta.arg);
            if (!isSameCity) {
                state.data.push({
                    nameCity: action.meta.arg,
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
    const dataCity: ICityName = {
        nameCity: data.name,
        icon: data.weather[0].icon,
    };
    return dataCity;
});

export const { removeCity } = citySlice.actions;
export default citySlice.reducer;
