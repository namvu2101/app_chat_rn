import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../style';
import {TextInput} from 'react-native-paper';
function UITextInput({value, label, onChangeText}) {
  return (
    <TextInput
      style={styles.inputcontainer}
      textColor="black"
      keyboardType='email-address'
      label={label}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

export default UITextInput;
