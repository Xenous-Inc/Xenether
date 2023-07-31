import { ExtraInfoType } from '@components/ExtraInfo';

export interface ILocation {
    location: string;
    timeZone: string;
    latitude: number;
    longitude: number;
    locationId: string;
}

export interface ICity {
    nameCity: string;
    timeZone: number;
    minTemp?: number;
    maxTemp?: number;
    description?: string;
    mainTemp: number;
    icon?: string;
    index?: number;
    selectedIndex?: number;
}

export interface IWeatherData {
    hourly: IHourlyEl[];
    daily: IDailyEl[];
    extra: IExtraEl[];
    nameCity: string;
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
