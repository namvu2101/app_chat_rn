import {View, Text} from 'react-native';
import * as React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {styles} from '../style';
import auth from '@react-native-firebase/auth';

const LoadingScreen = ({navigation}) => {
  const user = auth().currentUser;
  React.useEffect(() => {
    setTimeout(() => {
      if (!user) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  );
};

export default LoadingScreen;
