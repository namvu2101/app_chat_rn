import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {auth} from '../firebase/firebaseConfig';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';

const ChangePass = ({hideDialog}) => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [renewPassword, setRenewPassword] = React.useState('');
  const [sercurePass, setsercurePass] = React.useState(true);
  const [sercureNewPass, setsercureNewPass] = React.useState(true);
  const [sercureREPass, setsercureREPass] = React.useState(true);
  const [ErrorCode, setErrorCode] = React.useState('');

  const UpdatePass = () => {
    const user = auth().currentUser;
    const credentials = auth.EmailAuthProvider.credential(
      user.email,
      oldPassword,
    );
    if (oldPassword.length == 0) {
      Alert.alert('ERROR!', 'Password Emty', [
        {
          text: 'OK',
          onPress: () => {
            setErrorCode('');
          },
        },
      ]);
    } else if (newPassword != renewPassword) {
      Alert.alert('ERROR!', 'Re PassWord not correctlly', [
        {
          text: 'OK',
          onPress: () => {
            setErrorCode('');
          },
        },
      ]);
    } else {
      user
        .reauthenticateWithCredential(credentials)
        .then(() => {
          user
            .updatePassword(renewPassword)
            .then(() => {
              Alert.alert('Thông báo!', 'Password updated successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    setErrorCode('');
                  },
                },
              ]);
              hideDialog();
            })
            .catch(error => {
              setErrorCode('Password should be at least 6 characters');
              console.log('Lỗi khi cập nhật mật khẩu:', error);
            });
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/weak-password':
              setErrorCode('Password should be at least 6 characters');
              console.log(error);
              break;
            case 'auth/wrong-password':
              setErrorCode('wrong-password');
              console.log(error);
              break;
            default:
              console.log(error);
              break;
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        textColor="black"
        label="Password"
        autoFocus
        secureTextEntry={sercurePass}
        value={oldPassword}
        onChangeText={setOldPassword}
        right={
          <TextInput.Icon
            icon={sercurePass ? 'eye' : 'eye-off'}
            onPress={() => setsercurePass(!sercurePass)}
          />
        }
        style={styles.input}
      />
      <TextInput
        secureTextEntry={sercureNewPass}
        textColor="black"
        value={newPassword}
        onChangeText={setNewPassword}
        label="newPasswprd"
        right={
          <TextInput.Icon
            icon={sercureNewPass ? 'eye' : 'eye-off'}
            onPress={() => setsercureNewPass(!sercureNewPass)}
          />
        }
        style={styles.input}
      />
      <TextInput
        secureTextEntry={sercureREPass}
        textColor="black"
        value={renewPassword}
        onChangeText={setRenewPassword}
        label="renewPasswprd"
        right={
          <TextInput.Icon
            icon={sercureREPass ? 'eye' : 'eye-off'}
            onPress={() => setsercureREPass(!sercureREPass)}
          />
        }
        style={styles.input}
      />
      <Text style={styles.TextError}>{ErrorCode}</Text>
      <View
        style={{
          flexDirection: 'row',
          height: 300,
          justifyContent: 'flex-end',
        }}>
        <Button textColor='#2C6BED' onPress={hideDialog} style={styles.buttonContainer}>Cancel</Button>
        <Button textColor='#2C6BED' onPress={UpdatePass}>Ok</Button>
      </View>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
  
  },
  TextError: {color: 'red', textAlign: 'center'},
  buttonContainer:{
    color:'blue'
  }
});
