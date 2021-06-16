import React from "react";
import { createStackNavigator, } from "@react-navigation/stack";
import About from "../screens/about";
import Header from "../shared/header";

type NavProp = {
  navigation: any;
};

const Stack = createStackNavigator()

export const AboutStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header title="About" scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
      initialRouteName="About"
    >
      <Stack.Screen
        name="About Stack"
        component={About}
      />

    </Stack.Navigator>
  );
};


