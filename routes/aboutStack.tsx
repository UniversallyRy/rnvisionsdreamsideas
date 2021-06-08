import React from "react";
import { createStackNavigator, NavigationStackProp } from "react-navigation-stack";
import About from "../screens/about";
import Header from "../shared/header";
import { coltsGray, coltsBlue } from "../styles/global";

type NavProp = {
  navigation: NavigationStackProp;
};

const screens = {
  About: {
    screen: About,
    navigationOptions: ({ navigation }: NavProp) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="About" />,
      };
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: coltsBlue,
    headerStyle: {
      backgroundColor: coltsGray,
      height: 100,
    },
  },
});

export default AboutStack;
