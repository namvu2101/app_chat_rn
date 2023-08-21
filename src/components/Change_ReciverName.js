import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {firestore, userCurrent} from '../firebase/firebaseConfig';

const Change_ReciverName = ({hideDialog, Name, upDateName, receiverId}) => {
  const UpdateInformation = () => {
    firestore()
      .collection('Chats')
      .doc(receiverId)
      .update({
        NameChat: Name,
      })
      .then(() => {
        hideDialog();
      });
  };

  return (
    <View style={{flex: 1}}>
      <TextInput
        label="Change"
        style={styles._input}
        value={Name}
        onChangeText={upDateName}
        textColor="black"
      />
      <Button onPress={UpdateInformation} style={{alignItems: 'flex-end'}}>
        Change
      </Button>
    </View>
  );
};

export default Change_ReciverName;

const styles = StyleSheet.create({
  _input: {
    backgroundColor: 'white',
    height: 60,
  },
});
