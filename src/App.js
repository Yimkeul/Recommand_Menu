// In App.js in a new project

import * as React from 'react';
import { View, Text ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigate from './Navigaions/Navigate';



function App() {
  return (
    <Navigate/>
  );
}

export default App;