import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import NoteScreen from "../screens/noteScreen";
import Header from "../shared/header";
import { coltsGray, coltsBlue } from "../styles/global";

const screens = {
  NoteScreen: {
    screen: NoteScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Note Lists" />
        ),
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
