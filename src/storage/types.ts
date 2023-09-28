import { ExtraInfoType } from '@components/ExtraInfo';
import { EntityState, SerializedError } from '@reduxjs/toolkit';
import { ThemeType } from './constants';
import { ColorSchemeName, ColorValue } from 'react-native';

export interface ILocation {
    location: string;
    timeZone: string;
    latitude: number;
    longitude: number;
    locationId: string;
}

export interface ICityName {
    nameCity: string;
    icon?: string;
    index?: number;
    selectedIndex?: number;
}
export interface ICity {
    timeZone: number;
    minTemp: number;
    maxTemp: number;
    description: string;
    mainTemp: number;
}

export interface IWeatherByTime {
    hourly: IHourlyEl[];
    daily: IDailyEl[];
    extra: IExtraEl[];
}
export interface IWeatherData {
    nameCity: string;
    dataWeather: IWeatherByTime;
    cityWeather: ICity;
}
export interface IHourlyEl {
    time: string;
    mainTemp: number;
    weatherCode: number;
}

export interface IDailyEl {
    date: string;
    weatherCode: number;
    dayTemp: number;
    nightTemp: number;
}

export interface IExtraEl {
    visibility?: IExtraData;
    humidity?: IExtraData;
    precipitation?: IExtraData;
    feels_like?: IExtraData;
}

export interface IExtraData {
    title?: ExtraInfoType;
    digitalValue?: number;
}

export interface IApiState<T> {
    status: Status;
    data?: T | undefined;
    error?: SerializedError;
}

export interface IApiNormalizedState<T> extends EntityState<T> {
    status: Status;
    error?: SerializedError;
}

export enum Status {
    Idle = 'idle',
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
}

export interface IThemValues {
    textcolor: string;
    accentColor: string;
    suppColor: string;
    extraSuppColor: string;
}

export interface ITheme {
    themeMode: ThemeType;
    colors: IThemValues;
}
