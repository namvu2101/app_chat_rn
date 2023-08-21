import {View, Text, Alert, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../style';
import {TextInput, Button,Avatar} from 'react-native-paper';
import UITextInput from '../components/UITextInput';
import ImagePickerButton from '../components/PickImage';
import auth from '@react-native-firebase/auth';
import {utils} from '@react-native-firebase/app';
import {firebase} from '@react-native-firebase/firestore';
import UIModel from '../components/UIModel';

const RegisterScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [visible, setVisible] = React.useState(false);
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('123456');
  const [repassword, setrepassword] = useState('123456');
  const [sercurePass, setsercurePass] = useState(true);
  const [sercureREPass, setsercureREPass] = useState(true);
  const [imageUri, setImageUri] = useState(
    'https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?w=234&h=204&c=7&r=0&o=5&pid=1.7'
  );

  const AddUser = () => {
    if (email.length == 0) {
      Alert.alert('Cảnh báo!', 'Bạn chưa nhập Email', [{text: 'OK'}]);
    } else if (password.length == 0) {
      Alert.alert('Cảnh báo!', 'Bạn chưa nhập Mật khẩu', [{text: 'OK'}]);
    } else if (name.length == 0) {
      Alert.alert('Cảnh báo!', 'Bạn phải nhập Tên hiển thị', [{text: 'OK'}]);
    } else if (password != repassword) {
      Alert.alert('Cảnh báo!', 'Mật khẩu không khớp', [{text: 'OK'}]);
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          userCredential.user.updateProfile({
            
          });
          const id = userCredential.user.uid;
          SaveToFireStore(id);
          Alert.alert('Thông báo!', 'Đăng ký thành công', [
            {
              text: 'OK',
            },
          ]);
        })
        .catch(e => {
          switch (e.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Cảnh báo!', 'Email đã tồn tại', [
                {text: 'OK', onPress: () => setemail('')},
              ]);
              break;
            case 'auth/invalid-email':
              Alert.alert('Cảnh báo!', 'Email không hợp lệ', [{text: 'OK'}]);
              break;
            case 'auth/weak-password':
              setError('Mật khẩu phải lớn hơn 6 kí tự ');
              break;
            default:
              console.log('Error=>', e);
              break;
          }
        });
    }
  };

  const SaveToFireStore = async id => {
    try {
      await firebase.firestore().collection('Users').doc(`${id}`).set({
        Email: email,
        Name: name,
        PassWord: password,
        Avatar: imageUri,
        Phone: '',
        Date: '',
        Sex: '',
        Address: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[styles.text_color, {fontSize: 30}]}>
          Create a Signal Account
        </Text>

        <Avatar.Image size={80} source={{ uri: imageUri }}/>
        <Button mode="contained" style={{backgroundColor:'#2C6BED'}} textColor='white' onPress={() => setVisible(!visible)}>
         Select Avatar
        </Button>
        <UITextInput label={'Email'} value={email} onChangeText={setemail} />
        <TextInput
          style={styles.inputcontainer}
          textColor="black"
          label="Your Name"
          value={name}
          onChangeText={setname}
        />
        <TextInput
          style={styles.inputcontainer}
          textColor="black"
          label="Password"
          secureTextEntry={sercurePass}
          value={password}
          onChangeText={setpassword}
          right={
            <TextInput.Icon
              icon={sercurePass ? 'eye' : 'eye-off'}
              onPress={() => setsercurePass(!sercurePass)}
            />
          }
        />
        <TextInput
          style={styles.inputcontainer}
          textColor="black"
          label="RePassword"
          secureTextEntry={sercureREPass}
          value={repassword}
          onChangeText={setrepassword}
          right={
            <TextInput.Icon
              icon={sercureREPass ? 'eye' : 'eye-off'}
              onPress={() => setsercureREPass(!sercureREPass)}
            />
          }
        />
        <Button
          style={styles.buttonContainer}
          mode="contained-tonal"
          disabled={email.length == 0 ? true : false}
          onPress={AddUser}>
          Register
        </Button>

        <UIModel visible={visible} setVisible={setVisible} setImageUri={setImageUri} />
      </View>
    </View>
  );
};

export default RegisterScreen;
