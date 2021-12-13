import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import NoteScreen from "../screens/noteScreen";
import Header from "../shared/header";

type NoteStackParamList = {
  Notes: undefined;
};

type NoteScreenNavigationProp = StackNavigationProp<
  NoteStackParamList,
  'Notes'
>;

type NavProp = {
  navigation: NoteScreenNavigationProp;
}

const Stack = createStackNavigator<NoteStackParamList>()


export const NoteStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      header: ({ route, previous, navigation }:any) => (
        <Header title="Notes" scene={route} previous={previous} navigation={navigation} />
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