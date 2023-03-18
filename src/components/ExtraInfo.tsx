import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { signs, caseOfCategories, unitMeasure } from '@utils/constants';
import colors from '@styles/colors';

export enum Category {
    Precipitation,
    Visibility,
    FeelingTemp,
    Ownership,
}

type CategoryToIcon = {
    [key in Category]: IIconData;
};

interface IIconData {
    src: number;
}

export interface IProps {
    catergory: Category;
    digitalValue: number;
}

const Icons: CategoryToIcon = {
    [Category.Precipitation]: {
        src: require('@assets/icons/water_drop_outline_20.png'),
    },
    [Category.Visibility]: {
        src: require('@assets/icons/view_outline_28.png'),
    },
    [Category.FeelingTemp]: {
        src: require('@assets/icons/thermometer.png'),
    },
    [Category.Ownership]: {
        src: require('@assets/icons/fog_16.png'),
    },
};

const SetTitle = (titleCategory: Category) => {
    switch (titleCategory) {
        case Category.Precipitation:
            return caseOfCategories.PRECIPITATION;
        case Category.Visibility:
            return caseOfCategories.VISIBILITY;
        case Category.FeelingTemp:
            return caseOfCategories.FEELING_TEMP;
        case Category.Ownership:
            return caseOfCategories.OWNERSHIP;
        default:
            return;
    }
};

const SetUnitMeasure = (titleCategory: Category) => {
    switch (titleCategory) {
        case Category.Precipitation:
            return unitMeasure.MILLIMETERS;
        case Category.Visibility:
            return unitMeasure.KILOMETERS;
        case Category.FeelingTemp:
            return signs.CELSIUS;
        case Category.Ownership:
            return signs.INTEREST;
        default:
            return;
    }
};

const SetComment = (titleCategory: Category) => {
    switch (titleCategory) {
        case Category.Precipitation:
            return 'Ничего не ожидается в ближайшие 10 дней';
        case Category.Visibility:
            return 'Видимость снижена из-за дыма';
        case Category.FeelingTemp:
            return 'Дождь может стать прохладнее';
        case Category.Ownership:
            return 'Точка росы\nсейчас: 8' + signs.INTEREST;
        default:
            return;
    }
};

const CheckOnPrecipitation = (titleCategory: Category) => {
    if (titleCategory === Category.Precipitation) {
        return <Text style={styles.nearestTime}>за 24 часа</Text>;
    }
};

export const ExtraInfo: React.FC<IProps> = props => {
    const image = Icons[props.catergory];
    return (
        <View style={styles.container}>
            <Text style={styles.category}>{SetTitle(props.catergory)}</Text>
            <Image source={image.src} style={styles.icon} />
            <Text style={styles.basicDate}>{props.digitalValue + SetUnitMeasure(props.catergory)} </Text>
            <View>{CheckOnPrecipitation(props.catergory)}</View>
            <Text style={styles.terms}>{SetComment(props.catergory)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.LIGHT_GRAY,
        width: '37.5%',
        height: 152,
        borderRadius: 16,
        position: 'relative',
    },
    icon: {
        marginTop: -14,
        marginLeft: 13,
        opacity: 0.5,
    },
    category: {
        opacity: 0.5,
        fontFamily: 'ExtendedSemiblod',
        fontSize: 11,
        marginLeft: 33,
        marginTop: 12,
    },
    basicDate: {
        fontFamily: 'ExtendedBold',
        fontSize: 32,
        marginLeft: 17,
        marginTop: 14,
        transform: [{ scaleX: 1.1 }],
    },
    nearestTime: {
        fontFamily: 'ExtendedSemiblod',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 2,
    },
    terms: {
        fontFamily: 'ExtendedRegular',
        color: colors.GRAY,
        textAlign: 'left',
        fontSize: 11,
        marginLeft: 5,
        padding: 5,
        marginTop: 105,
        position: 'absolute',
    },
});
