import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JournalScreen from '../screens/Journals';
import JournalDetails from '../screens/JournalDetails';

type JournalStackParamList = {
  'Journal Entries': undefined;
  'Journal Details': {
    title: string;
    body: string;
    date: string;
  };
};

const { Navigator, Screen } = createStackNavigator<JournalStackParamList>();

export const JournalStack = (): JSX.Element => (
  <Navigator
    initialRouteName='Journal Entries'
    screenOptions={{ headerShown: false }}
  >
    <Screen
      name='Journal Entries'
      component={JournalScreen}
    />
    <Screen
      name='Journal Details'
      component={JournalDetails}
    />
  </Navigator>
);

export default JournalStack;
