import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import NoteScreen from "../screens/noteScreen";

type NoteStackParamList = {
  "Check Notes": undefined;
}

type NoteScreenNavigationProp = StackNavigationProp<
  NoteStackParamList,
  'Check Notes'
>

type NavProp = {
  navigation: NoteScreenNavigationProp;
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
        component={ NoteScreen }
      />
    </Stack.Navigator>
  );
};

export default NoteStack