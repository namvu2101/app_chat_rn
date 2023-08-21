import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from 'react-native-paper';

const ChooseSex = ({hideDialog, setGender}) => {
  const Choose = (title) => {
    setGender(title)
    hideDialog()
  };
  return (
    <View style={{flex: 1}}>
      {data.map(i => (
        <TouchableOpacity
          style={styles._Item}
          key={i.id}
          onPress={() => {
            Choose(i.title)
          }}>
          <Text style={styles._ItemText}>{i.title}</Text>
        </TouchableOpacity>
      ))}
      <Button onPress={hideDialog} style={{alignItems: 'flex-end'}}>
        Cancel
      </Button>
    </View>
  );
};

export default ChooseSex;

const data = [
  {
    id: '1',
    title: 'Male',
  },
  {
    id: '2',
    title: 'Female',
  },
  {
    id: '3',
    title: 'Other',
  },
];
const styles = StyleSheet.create({
  _Item: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    alignItems: 'center',
  },
  _ItemText: {textAlign: 'center', color: 'black'},
});
