import React, {useState} from 'react';
import {View, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
const SettingsScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegistration = async () => {
    try {
      // Gửi mã xác thực đến số điện thoại người dùng
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      // Chuyển đến màn hình xác thực
      navigation.navigate('AddGroup', {confirmation});
    } catch (error) {
      console.log('Đăng ký lỗi: ', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nhập số điện thoại"
        onChangeText={text => setPhoneNumber(text)}
      selectionColor={'black'}
      />
      <Button title="Đăng ký" onPress={handleRegistration} />
    </View>
  );
};

export default SettingsScreen;
