import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import JournalScreen from '../screens/Journals';
import JournalDetails from '../screens/JournalDetails';

export type JournalStackParamList = {
  'Journal Entries': undefined;
  'Journal Details': {
    title: string;
    body: string;
    date: string;
  };
};

type JournalsNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'Journal Entries'
>;

type NavProp = {
  navigation: JournalsNavigationProp;
};

const { Navigator, Screen } = createStackNavigator<JournalStackParamList>();

export const JournalStack: React.FunctionComponent<NavProp> = (): JSX.Element => (
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
