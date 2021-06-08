import React from "react";
import { createStackNavigator, NavigationStackProp } from "react-navigation-stack";
import NoteScreen from "../screens/noteScreen";
import Header from "../shared/header";
import { coltsGray, coltsBlue } from "../styles/global";

type NavProp = {
  navigation: NavigationStackProp;
};

const screens = {
  NoteScreen: {
    screen: NoteScreen,
    navigationOptions: ({ navigation }: NavProp) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Notes" />,
      };
    },
  },
};

const NoteStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: coltsBlue,
    headerStyle: {
      backgroundColor: coltsGray,
      height: 100,
    },
  },
});

export default NoteStack;
