/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GET_NAME } from './src/modules';

console.log(GET_NAME);
AppRegistry.registerComponent(appName, () => App);
