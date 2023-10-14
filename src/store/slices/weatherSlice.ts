import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity, IDailyEl, IWeatherData, IExtraEl, IHourlyEl, IWeatherByTime, IApiState, Status } from '@storage/types';
import { ExtraInfoType } from '@components/ExtraInfo';

const apiKeyForWeather = 'IESUMaLag1rb2QxUNf3AcRqb36ixx3E2';
//const apiKeyForCity = 'f467ce1b7a6266168a069f38c99d7029';
const apiKeyForCity = 'fd21a78310975f8a355d1eb33cb75bea';
//const apiKeyForCity = 'e526cddbe4485914980205c2136171e6';

export type WeatherState = { [key: string]: IApiState<IWeatherData> };

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {} as WeatherState,
    reducers: {
        removeCity(state, action: PayloadAction<string>) {
            const { [action.payload]: _, ...newState } = state;
            state = newState;
        },
    },
    extraReducers: builder => {
        builder.addCase(createGetWeatherAction.pending, (state, action) => {
            if (!state[action.meta.arg]) {
                state[action.meta.arg] = { status: Status.Pending };
            } else {
                state[action.meta.arg].status = Status.Pending;
                state[action.meta.arg].error = undefined;
            }
        });
        builder.addCase(createGetWeatherAction.rejected, (state, action) => {
            state[action.meta.arg].status = Status.Error;
            state[action.meta.arg].error = action.error;
        });
        builder.addCase(createGetWeatherAction.fulfilled, (state, action) => {
            state[action.meta.arg].status = Status.Success;
            state[action.meta.arg].error = undefined;
            state[action.meta.arg].data = action.payload;
        });
    },
});
export const createGetWeatherAction = createAsyncThunk('weatherSheet/fetchData', async (nameCity: string) => {
    const responseForMain = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${nameCity}&apikey=${apiKeyForWeather}`,
    );
    const responseForCity = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${apiKeyForCity}&lang=ru&units=metric`,
    );
    const mainData = await responseForMain.json();
    const cityData = await responseForCity.json();

    const dailyData = mainData.timelines.daily.map(el => {
        return {
            date: el.time,
            weatherCode: el.values.weatherCodeMax,
            dayTemp: Math.trunc(el.values.temperatureMax),
            nightTemp: Math.trunc(el.values.temperatureMin),
        } as IDailyEl;
    });

    const hourlyData = mainData.timelines.hourly.map(el => {
        return {
            time: el.time,
            mainTemp: Math.trunc(el.values.temperature),
            weatherCode: el.values.weatherCode,
        } as IHourlyEl;
    });

    const extraData = mainData.timelines.hourly.map(el => {
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

    const dataWeather: IWeatherByTime = {
        hourly: hourlyData,
        daily: dailyData,
        extra: extraData,
    };
    const cityWeather: ICity = {
        timeZone: cityData.timezone,
        mainTemp: Math.trunc(cityData.main.temp),
        minTemp: Math.trunc(cityData.main.temp_min),
        maxTemp: Math.trunc(cityData.main.temp_max),
        description: cityData.weather[0].description,
    };
    const data: IWeatherData = {
        nameCity: nameCity,
        dataWeather: dataWeather,
        cityWeather: cityWeather,
    };
    return data;
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
