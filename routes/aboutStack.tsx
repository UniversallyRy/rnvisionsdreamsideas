import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import Header from "../shared/header";
import About from "../screens/about";

type AboutStackParamList = {
  About: undefined;
};

type AboutScreenNavigationProp = StackNavigationProp<AboutStackParamList, 'About'>;

type NavProp = {
  navigation: AboutScreenNavigationProp;
};

const Stack = createStackNavigator<AboutStackParamList>();

const AboutStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator 
      initialRouteName="About"
      screenOptions={{
        header: ({ scene, previous, navigation }:any) => (
          <Header title="About" scene={ scene } previous={ previous } navigation={ navigation } />
        ),
      }}
    >
      <Stack.Screen
        name="About"
        component={ About }
      />
    </Stack.Navigator>
  );
};

export default AboutStack;
