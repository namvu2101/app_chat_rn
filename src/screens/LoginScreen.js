import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../style';
import {Avatar, TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation, route}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('123456');
  const [sercurePass, setsercurePass] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!route.params) {
      setemail('');
    } else {
      setemail(route.params.email);
    }
  }, [route.params]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.replace('Tabs');
      }
    });
    return unsubscribe;
  }, [auth().currentUser]);

  const handelLogin = () => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Cảnh báo!', 'Bạn chưa nhập đủ thông tin', [{text: 'OK'}]);
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Home');
          setpassword('');
        })
        .catch(e => {
          switch (e.code) {
            case 'auth/wrong-password':
              setError('Bạn nhập sai mật khẩu');
              setpassword('');
              break;
            case 'auth/too-many-requests':
              setError('Vui lòng thử lại sau ít phút');
              setpassword('');
              break;
            case 'auth/invalid-email':
              setError('Email không đúng định dạng');
              break;
            case 'auth/user-not-found':
              setError('Email không tồn tại');
              break;
            case ' auth/network-request-failed':
              setError('Không có kết nối Internet');
              break;

            default:
              setError('Lỗi không xác định');
              console.log(e);
              break;
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Avatar.Image
          size={100}
          source={{
            uri: 'https://th.bing.com/th/id/OIP.w7rumG_zt3HlqrAHMDU3hAHaHa?w=161&h=180&c=7&r=0&o=5&pid=1.7',
          }}
        />
        <TextInput
          style={styles.inputcontainer}
          textColor="black"
          label="Email"
          keyboardType="email-address"
          autoFocus
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          style={styles.inputcontainer}
          label="Password"
          textColor="black"
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
        <Text style={{color: 'red'}}>{error}</Text>
        <Button
          style={styles.buttonContainer}
          mode="contained-tonal"
          textColor='white'
          disabled={!email ? true : false}
          onPress={handelLogin}>
          Login
        </Button>
        <Button
          style={styles.buttonContainer}
          mode="contained-tonal"
          textColor='white'
          onPress={() => navigation.navigate('Register')}>
          Register
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
