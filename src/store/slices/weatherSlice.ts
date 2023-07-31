import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    SerializedError,
    createEntityAdapter,
    EntityId,
} from '@reduxjs/toolkit';
import { IDailyEl, IExtraEl, IHourlyEl, IWeatherData } from '@storage/types';
import { ExtraInfoType } from '@components/ExtraInfo';

const apiKey = 'IESUMaLag1rb2QxUNf3AcRqb36ixx3E2';

type CitiesState = {
    entities: { [key: string]: IWeatherData };
    status: 'idle' | 'loading' | 'success' | 'error';
    error: SerializedError;
    ids: Array<EntityId>;
};

export const weatherAdapter = createEntityAdapter<IWeatherData>({
    selectId: entity => entity.nameCity,
    sortComparer: (a, b) => (a.nameCity < b.nameCity ? -1 : a.nameCity > b.nameCity ? 1 : 0),
});

export const weatherSlice = createSlice({
    name: 'weatherSheet',
    initialState: {
        status: 'idle',
        ids: [] as EntityId[],
        entities: {},
        error: undefined,
    } as CitiesState,
    reducers: {
        removeCity(state, action: PayloadAction<string>) {
            weatherAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(createGetWeatherAction.pending, state => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(createGetWeatherAction.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error;
        });
        builder.addCase(createGetWeatherAction.fulfilled, (state, action) => {
            state.status = 'success';
            weatherAdapter.addOne(state, action.payload);
        });
    },
});
export const createGetWeatherAction = createAsyncThunk('weatherSheet/fetchData', async (nameCity: string) => {
    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${nameCity}&apikey=${apiKey}`);
    const data = await response.json();

    const dailyData = data.timelines.daily.map(el => {
        return {
            date: el.time,
            weatherCode: el.values.weatherCodeMax,
            dayTemp: Math.trunc(el.values.temperatureMax),
            nightTemp: Math.trunc(el.values.temperatureMin),
        } as IDailyEl;
    });

    const hourlyData = data.timelines.hourly.map(el => {
        return {
            time: el.time,
            mainTemp: Math.trunc(el.values.temperature),
            weatherCode: el.values.weatherCode,
        } as IHourlyEl;
    });

    const extraData = data.timelines.hourly.map(el => {
        return {
            visibility: { title: ExtraInfoType.Visibility, digitalValue: Math.trunc(el.values.visibility) },
            humidity: { title: ExtraInfoType.Humidity, digitalValue: Math.trunc(el.values.humidity) },
            precipitation: { title: ExtraInfoType.Precipitation, digitalValue: Math.trunc(el.values.rainAccumulation) },
            feels_like: {
                title: ExtraInfoType.RealFeel,
                digitalValue: Math.trunc(
                    13.12 +
                        0.6215 * Math.trunc(el.values.temperature) -
                        11.37 * (1.5 * Math.trunc(el.values.windSpeed)) ** 0.16 +
                        0.3965 * Math.trunc(el.values.temperature) * (1.5 * Math.trunc(el.values.windSpeed)) ** 0.16,
                ),
            },
        } as IExtraEl;
    });

    const dataWeather: IWeatherData = {
        nameCity,
        hourly: hourlyData,
        daily: dailyData,
        extra: extraData,
    };
    return dataWeather;
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
