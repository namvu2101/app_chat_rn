import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ListAvatar from './ListAvatar';
import ImagePickerButton from './PickImage';

const UIPickAvatar = ({setImageUri,hideDialog}) => {
  return (
    <View style={{flex: 1,alignItems:'center'}}>
      <ImagePickerButton setImageUri={setImageUri} hideDialog={hideDialog} />
      <ListAvatar setImageUri={setImageUri} hideDialog={hideDialog} />
    </View>
  );
};

export default UIPickAvatar;

const styles = StyleSheet.create({});
