import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import NoteScreen from "../screens/noteScreen";
import Header from "../shared/header";

type NavProp = {
  navigation: any;
};

const Stack = createStackNavigator()


export const NoteStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      header: ({ scene, previous, navigation }) => (
        <Header title="Notes" scene={scene} previous={previous} navigation={navigation} />
      ),
    }}
    initialRouteName="Notes"
    >
      <Stack.Screen
        name="Notes"
        component={NoteScreen}
        options={{ headerTitle: 'Notes' }}
      />

    </Stack.Navigator>
  );
};