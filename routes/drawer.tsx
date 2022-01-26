import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import VisionStack from "./visionStack";
import JournalStack from "./journalStack";
import NoteStack from "./noteStack";
// import { AboutStack } from "./aboutStack";

type TabStackParamList = {
  Visions: undefined;
  Journals: undefined;
  Notes: undefined;
};

type NavigationProp = BottomTabNavigationProp<TabStackParamList>;
interface TabProps {
  navigation?: NavigationProp;
  style?: StyleProp<ViewStyle>;
}

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Visions'/>
    <BottomNavigationTab title='Journals'/>
    <BottomNavigationTab title='Notes'/>
  </BottomNavigation>
);  

export const BottomTabs = () => (
  <Navigator 
    screenOptions={{
      headerShown:false
    }}
    tabBar={props => <BottomTabBar {...props} />}
  >
    <Screen name='Visions' component={VisionStack}/>
    <Screen name='Journals' component={JournalStack}/>
    <Screen name='Notes' component={NoteStack}/>
  </Navigator>
);
