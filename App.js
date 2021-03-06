import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [loading, setLoading] = useState(false);

    if (!loading) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => { setLoading(true) }}
            onError={(err) => console.log(err)}
        />;
    }

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    }

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
    }

    const resetGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
    } else if (guessRounds > 0) {
        content = <GameOverScreen userNumber={userNumber} rounds={guessRounds} onGameReset={resetGameHandler} />
    }

    return (
        <View style={styles.screen}>
            <Header title="Guess A Number" />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});