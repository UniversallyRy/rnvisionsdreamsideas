import React, { FC } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import NoteScreen from "../screens/Notes";

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

const NoteStack: FC<NavProp> = () => {
  return (
    <Stack.Navigator
      screenOptions= {{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ "Check Notes" }
        component={ NoteScreen }
      />
    </Stack.Navigator>
  );
};

export default NoteStack