import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { VisionStack } from "./visionStack";
import { AboutStack } from "./aboutStack";
import { NoteStack } from "./noteStack";
import JournalStack from "./journalStack";

interface DrawerProps {
  style?: StyleProp<ViewStyle>
}

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
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
