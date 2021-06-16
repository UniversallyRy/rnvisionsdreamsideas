import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createAppContainer, NavigationNavigator, NavigationProp, NavigationState } from "react-navigation";
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
      <Tab.Screen
        name="About"
        component={AboutStack}
        options={{
          tabBarIcon: 'message-text-outline',
        }}
      />
    </Tab.Navigator>
  );
};

// // creates a navigation bar from react-navigation-stack imports
// const BottomTab:NavigationNavigator<DrawerProps, NavigationProp<NavigationState>> = createDrawerNavigator(
//   {
//     Visions: {
//       screen: VisionStack,
//     },
//     Journals: {
//       screen: JournalStack,
//     },
//     Notes: {
//       screen: NoteStack,
//     },
//     About: {
//       screen: AboutStack,
//     },
//   },
//   {
//     drawerType: "front",
//     drawerWidth: 130,
//     // drawerBackgroundColor: coltsGray,
//     contentOptions: {
//       // stack screens container styling
//       // activeTintColor: coltsBlue,
//       // inactiveTintColor: "black",
//       itemsContainerStyle: {
//         marginVertical: 10,
//       },
//       //single stack screen styling
//       itemStyle: {
//         marginHorizontal: 1,
//         marginVertical: 50,
//         alignSelf: "center",
//       },
//     },
//   }
// );

