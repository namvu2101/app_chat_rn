import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';

const App = ({navigation}) => {
  const [LevelArray, setLevelArray] = useState([]);
  useEffect(() => {
    const shuffle = () => {
      const updatedArray = [];
      for (let i = 0; i < 5; i++) {
        updatedArray.push(i + 1);
      }
      setLevelArray(updatedArray);
    
    };
    shuffle();
  }, []);
  
  return (
    <View style={styles.container}>
      <Button
        icon="gamepad-variant"
        mode="contained"
        onPress={() => navigation.navigate('GameMemory')}>
        Memory Card
      </Button>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
