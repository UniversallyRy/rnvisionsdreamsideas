import React, { FC } from 'react';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import VisionStack from './visionStack';
import JournalStack from './journalStack';
import NoteStack from './noteStack';
// import { AboutStack } from './aboutStack'
// add settings icon with connection to about

type NavigationProp = NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
export interface TabProps {
  navigation: NavigationProp;
  state: {
    index: number
    routeNames: string | string[]
  }
}

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar: FC<TabProps>= ({ navigation, state }): JSX.Element => (
  <BottomNavigation
    selectedIndex={ state.index }
    onSelect={ index => navigation.navigate(state.routeNames[index]) }>
    <BottomNavigationTab title='Visions' />
    <BottomNavigationTab title='Journals' />
    <BottomNavigationTab title='Notes' />
  </BottomNavigation>
);

const BottomTabs = (): JSX.Element => (
  <Navigator
    screenOptions={{ headerShown:false }}
    tabBar={ (props): JSX.Element => <BottomTabBar { ...props } /> }
  >
    <Screen name='Visions' component={ VisionStack }/>
    <Screen name='Journals' component={ JournalStack }/>
    <Screen name='Notes' component={ NoteStack }/>
  </Navigator>
);

export default BottomTabs;
