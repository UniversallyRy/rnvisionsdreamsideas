import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import Notes from "../screens/notes";

type NoteStackParamList = {
  "Check Notes": undefined;
}

type NotesNavigationProp = StackNavigationProp<
  NoteStackParamList,
  'Check Notes'
>

type NavProp = {
  navigation: NotesNavigationProp;
}

const Stack = createStackNavigator<NoteStackParamList>()

const NoteStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator
      screenOptions= {{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ "Check Notes" }
        component={ Notes }
      />
    </Stack.Navigator>
  );
};

export default NoteStack