import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useLayoutEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { auth } from '../firebase/firebaseConfig';
import {userCurrent} from '../firebase/firebaseConfig';
import {Avatar} from 'react-native-paper';
import { color_base } from '../style';
import App from '../game/App';
const Tab = createBottomTabNavigator();

export default function MyTabs({navigation}) {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign:'center',
        headerTitleStyle: {color: color_base},

        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Game') {
            iconName = 'gamepad-variant';
          }
          return <Icon name={iconName} color={color} size={24} />;
        },
        })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Game" component={App} />
    </Tab.Navigator>
  );
}
