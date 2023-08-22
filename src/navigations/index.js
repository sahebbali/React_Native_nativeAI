// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/Home';
import WellcomePage from '../screens/Wellcome';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="wellcome" component={WellcomePage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;