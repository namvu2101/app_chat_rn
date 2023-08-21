import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import {PaperProvider} from 'react-native-paper';
import RegisterScreen from './screens/RegisterScreen';
import PhoneNumber from './screens/PhoneNumber';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddNewGroupChat from './screens/AddNewGroupChat';
import MyTabs from './components/UITab';
import {color_base} from './style';
import MyComponent from './components/MyComponents';
import MemoryCard from './game/MemoryCard';

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerTintColor: color_base,
  headerStyle: {backgroundColor: 'white'},
  headerTitleStyle: {color: color_base},
  headerTitleAlign: 'center',
};
const Index = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={globalScreenOptions}
          initialRouteName="Login">
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Phone" component={PhoneNumber} />
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddGroup" component={AddNewGroupChat} />
          <Stack.Screen name="GameMemory" component={MemoryCard} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Index;
