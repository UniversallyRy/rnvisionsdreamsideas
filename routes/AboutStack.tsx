import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../screens/About';

type AboutStackParamList = { About: undefined };

const Stack = createStackNavigator<AboutStackParamList>();

const AboutStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name='About'
      component={AboutScreen} />
  </Stack.Navigator>
);

export default AboutStack;
