import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';

import ChangePass from './ChangePass';
import ChooseSex from './ChooseSex';
import UIDatePicker from './UIDatePicker';
import UpdateUserName from './UpdateUserName';
import UIPickAvatar from './UIPickAvatar';
import Change_ReciverName from './Change_ReciverName';

const UIDialog = props => {
  const {
    hideDialog,
    visible,
    isSelected,
    setGender,
    setDateOfBirth,
    displayName,
    setdisplayName,
    setImageUri,
    upDateName,
    Name,
    receiverId,
  } = props;
  const renderView = () => {
    switch (isSelected) {
      case 'Item 0':
        return (
          <UpdateUserName
            hideDialog={hideDialog}
            displayName={displayName}
            setdisplayName={setdisplayName}
          />
        );
      case 'Change_Name':
        return (
          <Change_ReciverName
            hideDialog={hideDialog}
            upDateName={upDateName}
            Name={Name}
            receiverId={receiverId}
          />
        );
      case 'Avatar':
        return (
          <UIPickAvatar hideDialog={hideDialog} setImageUri={setImageUri} />
        );
      case 'Item 1':
        return (
          <UIDatePicker
            hideDialog={hideDialog}
            setDateOfBirth={setDateOfBirth}
          />
        );
      case 'Item 2':
        return <ChooseSex hideDialog={hideDialog} setGender={setGender} />;
      case 'Item 3':
        return <ChangePass hideDialog={hideDialog} />;
      default:
        return null;
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.container}>
        <Dialog.Actions>{renderView()}</Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default UIDialog;

const styles = StyleSheet.create({
  container: {height: 300, backgroundColor: 'white'},
});
