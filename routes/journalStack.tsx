import React, { FunctionComponent } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Journals from '../screens/journals';
import Details from '../components/journals/ItemDetails';

export type JournalStackParamList = {
  'Journal Entries': undefined;
  'Journal Details': { 
    title: string;
    body: string;
    date : string;
  };
};

type JournalsNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'Journal Entries'
>;

type NavProp = {
  navigation: JournalsNavigationProp;
};

const { Navigator, Screen } = createStackNavigator<JournalStackParamList>()

export const JournalStack: FunctionComponent<NavProp> = () => {
  return (
    <Navigator 
      initialRouteName='Journal Entries'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name='Journal Entries'
        component={ Journals }
      />
      <Screen
        name='Journal Details'
        component={ Details }
      />

    </Navigator>
  );
};

export default JournalStack;