import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import Visions from "../screens/visionScreen";
import VisionDetails from "../components/visions/visionDetails";
import Header from "../shared/header";
import { ParamListBase, } from "@react-navigation/routers";

type NavProp = {
  navigation?: StackNavigationProp<
  ParamListBase,
  'Profile'
>,
};

const Stack = createStackNavigator()

export const VisionStack = () => {
  return (
    <Stack.Navigator 
    initialRouteName="Visions"
    headerMode="screen"
    screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header title="Visions" scene={scene} previous={previous} navigation={navigation} />
        ),
    }}
    >
      <Stack.Screen
        name="Visions"
        component={Visions}
      />
      <Stack.Screen
        name="VisionDetails"
        component={VisionDetails}
        options={{ headerTitle: 'Vision Details' }}
      />
    </Stack.Navigator>
  );
};


