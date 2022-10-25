import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NoteScreen from '../screens/Notes';

type NoteStackParamList = { 'Check Notes': undefined };

const Stack = createStackNavigator<NoteStackParamList>();

const NoteStack = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name='Check Notes'
      component={NoteScreen}
    />
  </Stack.Navigator>
);

export default NoteStack;
