import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import AboutScreen from '../screens/About';

type AboutStackParamList = {
  About: undefined;
};

type AboutScreenNavigationProp = StackNavigationProp<AboutStackParamList, 'About'>;

type NavProp = {
  navigation: AboutScreenNavigationProp;
};

const Stack = createStackNavigator<AboutStackParamList>();

const AboutStack: React.FunctionComponent<NavProp> = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name='About'
      component={AboutScreen} />
  </Stack.Navigator>
);

export default AboutStack;
