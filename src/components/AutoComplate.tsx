import React, { useState, useEffect, MutableRefObject } from 'react';
import colors from '@styles/colors';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Platform } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { useAppDispatch, useAppSelector } from '../store/store';
import { createGetCityAction } from '../store/slices/citySlice';
import { ThemeType } from '@storage/constants';

const apiKey = 'oZUoTGcJocTndXbE8RTnMmHAgJVU3wZF';

interface IAutoComplate {
    refInput: MutableRefObject<TextInput>;
}

export const AutoComplate: React.FC<IAutoComplate> = props => {
    const [dataWeather, setDataWeather] = useState<string[]>([
        'Лондон',
        'Москва',
        'Омск',
        'Аляска',
        'Новосибирск',
        'Дубай',
        'Дубай',
        'Дубай',
        'Дубай',
        'Дубай',
        'Дубай',
        'Дубай',
        'Дубай',
        'Дубай',
        'Дубай',
    ]); // exp.for testrequest

    const [filteredData, setFilteredData] = useState([]);

    const [selectedValue, setSelectedValue] = useState({});

    const [inputText, setInputText] = useState('');
    //const [weather, setWeather] = useState<WeatherState>({});
    const dispatch = useAppDispatch();
    const { data: cities } = useAppSelector(store => store.cities);
    // if (weather.toString() === '{}') {
    //     dispatch(createGetCityAction(selectedValue.toString()));
    //     dispatch(createGetWeatherAction(selectedValue.toString()));
    // }

    useEffect(() => {
        //console.log(weather);
        if (inputText) {
            fetch('') // API request
                .then(response => response.json())
                .then(result => {
                    setDataWeather(result.map(el => el.LocalizedName));
                })
                .catch(() => {});
        }
    }, [inputText]);

    useEffect(() => {
        if (!cities.some(city => city.nameCity === selectedValue.toString())) {
            dispatch(createGetCityAction(selectedValue.toString()));
        }
    }, [selectedValue]);

    const findDataWeather = (query: string) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredData(dataWeather.filter(data => data.search(regex) >= 0));
        } else {
            setFilteredData([]);
        }
    };
    const { theme } = useAppSelector(state => state.settings);
    return (
        <View>
            <Image
                style={styles.iconSearch}
                source={
                    theme.nameTheme === ThemeType.Dark ||
                    (theme.nameTheme === ThemeType.System && theme.systemMode === 'dark')
                        ? require('@assets/icons/white-search-icon.png')
                        : require('@assets/icons/search-icon.png')
                }
            />
            <Autocomplete
                ref={props.refInput}
                autoCapitalize='none'
                autoCorrect={false}
                style={[
                    styles.textInput,
                    {
                        backgroundColor:
                            theme.nameTheme === ThemeType.Dark ||
                            (theme.nameTheme === ThemeType.System && theme.systemMode === 'dark')
                                ? colors.BUTTONS_COLOR
                                : colors.LIGHT_GRAY,
                        color: theme.mode.color,
                    },
                ]}
                containerStyle={[
                    styles.autocompleteContainer,
                    {
                        backgroundColor:
                            theme.nameTheme === ThemeType.Dark ||
                            (theme.nameTheme === ThemeType.System && theme.systemMode === 'dark')
                                ? colors.SECTION_COLOR
                                : colors.WHITE,
                    },
                ]}
                inputContainerStyle={[styles.containerInput]}
                listContainerStyle={[
                    styles.containerFlatList,
                    {
                        backgroundColor:
                            theme.nameTheme === ThemeType.Dark ||
                            (theme.nameTheme === ThemeType.System && theme.systemMode === 'dark')
                                ? colors.SECTION_COLOR
                                : colors.WHITE,
                    },
                ]}
                data={filteredData}
                defaultValue={JSON.stringify(selectedValue) === '{}' ? '' : selectedValue}
                onChangeText={text => {
                    findDataWeather(text);
                    setInputText(text);
                }}
                placeholder='Введите название города'
                placeholderTextColor={theme.mode.color}
                flatListProps={{
                    scrollEnabled: false,
                    style: [
                        styles.customList,
                        {
                            backgroundColor:
                                theme.nameTheme === ThemeType.Dark ||
                                (theme.nameTheme === ThemeType.System && theme.systemMode === 'dark')
                                    ? colors.BUTTONS_COLOR
                                    : colors.EXTRA_LIGHT_GRAY,
                        },
                    ],
                    keyboardShouldPersistTaps: 'always',
                    renderItem: ({ item }) => (
                        <TouchableOpacity
                            style={{ zIndex: 1 }}
                            onPress={() => {
                                setSelectedValue(item);
                                setFilteredData([]);
                            }}
                        >
                            <Text style={[styles.itemText, { color: theme.mode.color }]}>{item}</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconSearch: {
        position: 'absolute',
        left: 27,
        marginTop: 31,
        zIndex: 2,
    },
    containerFlatList: {
        marginTop: 80,
        zIndex: Platform.OS === 'android' ? 1 : 0,
        position: Platform.OS === 'android' ? 'absolute' : 'relative',
        width: Platform.OS === 'ios' ? '100%' : '111%',
    },
    containerInput: {
        borderWidth: 0,
    },
    textInput: {
        borderRadius: 12,
        paddingLeft: 35,
    },
    autocompleteContainer: {
        padding: 20,
        height: '54%',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 5,
    },
    customList: {
        marginHorizontal: Platform.OS === 'ios' ? 0 : 20,
        borderWidth: 0,
        borderRadius: 12,
    },
});
