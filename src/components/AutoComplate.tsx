import React, { useState, useEffect, MutableRefObject } from 'react';
import colors from '@styles/colors';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Platform } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { useAppDispatch, useAppSelector } from '../store/store';
import { createGetCityAction } from '../store/slices/citySlice';
import { createGetWeatherAction, WeatherState } from '../store/slices/weatherSlice';
import { ICityName } from '@storage/types';

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
        if (!cities?.some(city => city.nameCity === selectedValue.toString())) {
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

    return (
        <View>
            <Image style={styles.iconSearch} source={require('@assets/icons/search-icon.png')} />
            <Autocomplete
                ref={props.refInput}
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.textInput}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={styles.containerInput}
                listContainerStyle={styles.containerFlatList}
                data={filteredData}
                defaultValue={JSON.stringify(selectedValue) === '{}' ? '' : selectedValue}
                onChangeText={text => {
                    findDataWeather(text);
                    setInputText(text);
                }}
                placeholder='Введите название города'
                placeholderTextColor={colors.GRAY}
                flatListProps={{
                    scrollEnabled: false,
                    style: styles.customList,
                    keyboardShouldPersistTaps: 'always',
                    renderItem: ({ item }) => (
                        <TouchableOpacity
                            style={{ zIndex: 1 }}
                            onPress={() => {
                                setSelectedValue(item);
                                setFilteredData([]);
                            }}
                        >
                            <Text style={styles.itemText}>{item}</Text>
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
        marginTop: 16,
        zIndex: Platform.OS === 'android' ? 1 : 0,
        position: Platform.OS === 'android' ? 'absolute' : 'relative',
        width: Platform.OS === 'ios' ? '100%' : '111%',
    },
    containerInput: {
        borderWidth: 0,
    },
    textInput: {
        backgroundColor: colors.LIGHT_GRAY,
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
        marginTop: Platform.OS === 'ios' ? 0 : 59,
        marginHorizontal: Platform.OS === 'ios' ? 0 : 20,
        borderWidth: 0,
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: 12,
    },
});
