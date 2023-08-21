import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button,TextInput} from 'react-native-paper';

const UpdateUserName = ({hideDialog,displayName,setdisplayName}) => {
  return (
    <View style={{flex:1}}>
      <TextInput
        label="displayName"
        style={styles._input}
        value={displayName}
        onChangeText={setdisplayName}
        textColor="black"
      />
      <Button onPress={hideDialog} style={{alignItems: 'flex-end'}}>
        Update
      </Button>
    </View>
  );
};

export default UpdateUserName;

const styles = StyleSheet.create({
  _input: {
    backgroundColor: 'white',
    height: 60,
  },
});
