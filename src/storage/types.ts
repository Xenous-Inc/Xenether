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
    minTemp: number;
    maxTemp: number;
    description: string;
    mainTemp: number;
    icon: string;
}
