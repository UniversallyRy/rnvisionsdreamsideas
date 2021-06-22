import React, { FunctionComponent } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { createMaterialBottomTabNavigator, MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { VisionStack } from "./visionStack";
import { AboutStack } from "./aboutStack";
import { NoteStack } from "./noteStack";
import JournalStack from "./journalStack";

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
      <Tab.Navigator>
        <Tab.Screen
          name="Visions"
          component={VisionStack}
          options={{
            tabBarIcon: 'home-account',
          }}
        />
        <Tab.Screen
          name="Journals"
          component={JournalStack}
          options={{
            tabBarIcon: 'bell-outline',
          }}
        />
        <Tab.Screen
          name="Notes"
          component={NoteStack}
          options={{
            tabBarIcon: 'message-text-outline',
          }}
        />
      </Tab.Navigator>
  );
};
