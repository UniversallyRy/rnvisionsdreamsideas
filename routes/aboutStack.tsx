import React, { FC } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import About from "../screens/about";

type AboutStackParamList = {
  About: undefined;
};

type AboutScreenNavigationProp = StackNavigationProp<AboutStackParamList, 'About'>;

type NavProp = {
  navigation: AboutScreenNavigationProp;
};

const Stack = createStackNavigator<AboutStackParamList>();

const AboutStack: FC<NavProp> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={ About }
      />
    </Stack.Navigator>
  );
};

export default AboutStack;
