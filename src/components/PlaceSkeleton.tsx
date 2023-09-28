import Colors from '@styles/colors';
import SkeletonLoader from 'expo-skeleton-loader';
import { Dimensions, StyleSheet } from 'react-native';

export const PlaceSkeleton: React.FC = () => {
    const skeletonStyles = {
        content: {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
        },
    };

    return (
        <SkeletonLoader style={styles.wrapper} boneColor={Colors.GRAY} highlightColor={Colors.WHITE} duration={1200}>
            <SkeletonLoader.Item style={skeletonStyles.content} />
        </SkeletonLoader>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});
