import React from "react";
import {
  createStackNavigator,
  NavigationStackProp,
} from "react-navigation-stack";
import Visions from "../screens/visionScreen";
// import VisionImageGrid from '../components/visions/visionImageGrid';
import VisionDetails from "../components/visions/visionDetails";
import Header from "../shared/header";
import { coltsGray, coltsBlue } from "../styles/global";

type NavProp = {
  navigation: NavigationStackProp,
};

const screens = {
  VisionImageGrid: {
    screen: Visions,
    navigationOptions: ({ navigation }: NavProp) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Vision Board" />
        ),
      };
    },
  },
  VisionDetails: {
    screen: VisionDetails,
    navigationOptions: {
      title: "Vision Details",
    },
  },
};

const VisionStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: coltsBlue,
    headerStyle: {
      backgroundColor: coltsGray,
      height: 100,
    },
  },
});

export default VisionStack;