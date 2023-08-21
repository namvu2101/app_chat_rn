/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Index from './src/Index';
import CustomListItem from './src/components/CustomListItem';
import HomeScreen from './src/screens/HomeScreen';
import MyComponent from './src/components/MyComponents';

AppRegistry.registerComponent(appName, () => Index);
