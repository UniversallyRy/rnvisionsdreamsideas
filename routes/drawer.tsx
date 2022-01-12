import React, { FunctionComponent } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { createMaterialBottomTabNavigator, MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import VisionStack from "./visionStack";
import JournalStack from "./journalStack";
import NoteStack from "./noteStack";
// import { AboutStack } from "./aboutStack";

type TabStackParamList = {
  Visions: undefined;
  Journals: undefined;
  Notes: undefined;
};

type NavigationProp = MaterialBottomTabNavigationProp<TabStackParamList>;
interface TabProps {
  navigation?: NavigationProp;
  style?: StyleProp<ViewStyle>;
}

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs: FunctionComponent<TabProps> = () => {
  return (
      <Tab.Navigator
        initialRouteName="Visions"
        shifting={true}
      >
        <Tab.Screen
          name="Visions"
          component={VisionStack}
          options={{
            tabBarIcon: 'home-account',
            tabBarAccessibilityLabel: 'Visions Tab',
          }}
          />
        <Tab.Screen
          name="Journals"
          component={JournalStack}
          options={{
            tabBarIcon: 'bell-outline',
            tabBarAccessibilityLabel: 'Journals Tab',
          }}
        />
        <Tab.Screen
          name="Notes"
          component={NoteStack}
          options={{
            tabBarIcon: 'message-text-outline',
            tabBarAccessibilityLabel: 'Notes Tab',
          }}
        />
      </Tab.Navigator>
  );
};
