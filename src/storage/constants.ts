export const LOCATIONS = 'locations';

export enum UnitsType {
    Celsius = 'celsius',
    Fahrenheits = 'fahrenheits',
}

export enum SwitcherStatus {
    On = 'on',
    Off = 'off',
}

export const Theme = {
    LIGHT: 'light',
    DARK: 'dark',
} as const;

export type ThemeType = (typeof Theme)[keyof typeof Theme];

export const ReduxTheme = {
    ...Theme,
    SYSTEM: 'system',
} as const;

export type ReduxThemeType = (typeof ReduxTheme)[keyof typeof ReduxTheme];
