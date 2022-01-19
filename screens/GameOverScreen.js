import React from 'react'
import { StyleSheet, View, Button, Image, Text } from 'react-native'
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const GameOverScreen = ({ rounds, userNumber, onGameReset }) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/success.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <BodyText style={styles.message}>
                Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>!
            </BodyText>
            <MainButton title="Start Over" onPress={onGameReset} style={styles.buttonColor}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.secondary,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
    },
    message: {
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 20,
        marginHorizontal: 20,
    },
    buttonColor: {
        backgroundColor: Colors.secondary,
        fontFamily: 'open-sans-bold',
        borderRadius: 25,
    }
})

export default GameOverScreen;