import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Number from '../components/Number';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText style={styles.listItemIndex}>#{listLength - itemData.index}</BodyText>
        <FontAwesome5 name="long-arrow-alt-right" size={24} color="black" />
        <BodyText style={styles.listValue}>{itemData.item}</BodyText>
    </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
    const firstGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(firstGuess);
    const [pastGuesses, setPastGuesses] = useState([firstGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'colder' && currentGuess < userChoice) || (direction === 'hotter' && currentGuess > userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'colder') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuess => [nextNum, ...curPastGuess]);
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Current Guess:</Text>
            <Number>{currentGuess}</Number>
            <Card style={styles.buttonContainer}>
                <MainButton
                    style={styles.colder}
                    title={<MaterialIcons name="arrow-downward" size={18} color="white" />}
                    onPress={nextGuessHandler.bind(this, 'colder')}
                />
                <MainButton
                    style={styles.hotter}
                    title={<MaterialIcons name="arrow-upward" size={18} color="white" />}
                    onPress={nextGuessHandler.bind(this, 'hotter')}
                />
            </Card>
            <View style={styles.listContainer}>
                <BodyText style={styles.guessHeader} >Your Guesses:</BodyText>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item.toString()}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        paddingBottom: 15,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    colder: {
        backgroundColor: '#0000FF',
    },
    hotter: {
        backgroundColor: '#ff0000',
    },
    listContainer: {
        width: '80%',
        // Need to set flex to 1 to make scrollview work on Android
        flex: 1,
    },
    list: {
        // alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 15,
        backgroundColor: '#ccc',
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%'
    },
    guessHeader: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
    },
    listItemIndex: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
    },
    listValue: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: colors.secondary
    }
});

export default GameScreen;