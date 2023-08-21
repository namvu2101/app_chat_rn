import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import {Avatar, Button, Dialog, Portal} from 'react-native-paper';

const cards = [
  // "🥹",
  // "🗣️",
  '🦷',
  '🍑',
  '☎️',
  '📷',
  '🐷',
  '🎁',
  '🎈',
  '🔑',
  '🥕',
  '🥑',
  '👻',
  '🎃',
  // "🥵",
  
];

const MemoryCard = ({navigation}) => {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [Level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeOut, setTimeOut] = useState(60);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOut(prevTimeOut => prevTimeOut - 1);
    }, 1000);

    // Clear the timer when timeOut reaches 0
    if (timeOut === 0) {
      setVisible(true);
      clearInterval(timer);
    }
    if (didPlayerWin()) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeOut]);

  useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
      setScore(score + 1);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 200);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = index => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
  };

  const didPlayerWin = () => matchedCards.length === board.length;
  const resetGame = () => {
    setBoard(shuffle([...cards, ...cards]));
    setSelectedCards([]);
    setMatchedCards([]);
    setTimeOut(60);
  };

  useEffect(() => {
    if (didPlayerWin()) {
      setTimeout(() => {
        resetGame();
        setLevel(Level + 1);
        setScore(score);
      }, 3000);
    }
  }, [matchedCards]);
  return (
    <View style={styles.container}>
      <View style={{width: 60, alignItems: 'center'}}>
        <Avatar.Icon
          icon="alarm"
          size={50}
          color="white"
          style={{backgroundColor: '#0f172a'}}
        />
        <Text
          style={{
            fontSize: 32,
            fontWeight: '900',
            color: 'snow',
          }}>
          {timeOut}
        </Text>
      </View>
      <Text style={styles.title}>
        {didPlayerWin() ? 'Congratulations 🎉' : `Level ${Level}`}
      </Text>
      <Text style={styles.title}>Score: {score}</Text>

      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapCard(index)}>
              {card}
            </Card>
          );
        })}
      </View>

      <Dialog
        visible={visible}
        dismissable={false}
        style={{backgroundColor: 'white', height: 200}}>
        <Dialog.Actions
          style={{justifyContent: 'center', flexDirection: 'column'}}>
          <Text style={{color: 'black'}}>YOU LOST 🥵</Text>
          <Text style={{color: 'black'}}>{score}</Text>
          <Button
            onPress={() => {
              setVisible(false);
              setLevel(1)
              setScore(0)
              resetGame();
            }}>
            ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  board: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: 'snow',
    marginVertical: 10,
    textAlign: 'center',
  },
});

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

export default MemoryCard;
