import React, { useState, useEffect, MutableRefObject } from 'react';
import colors from '@styles/colors';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { useAppDispatch } from '../store/store';
import { createGetCityAction } from '../store/slices/citySlice';
import { createGetWeatherAction } from '../store/slices/weatherSlice';

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
    ]); // exp.for test

    const [filteredData, setFilteredData] = useState([]);

    const [selectedValue, setSelectedValue] = useState({});

    const [inputText, setInputText] = useState('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (inputText) {
            fetch('') // API request
                .then(response => response.json())
                .then(result => {
                    setDataWeather(result.map(el => el.LocalizedName));
                });
        }
    }, [inputText]);

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
                                dispatch(createGetCityAction(item));
                                dispatch(createGetWeatherAction(item));
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
        borderWidth: 0,
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: 12,
    },
});
