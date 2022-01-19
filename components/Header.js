import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle} >{title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Header;