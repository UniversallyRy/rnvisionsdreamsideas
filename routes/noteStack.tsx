import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import NoteScreen from "../screens/noteScreen";
import Header from "../shared/header";

type NoteStackParamList = {
  NoteScreen: undefined;
};

type NoteScreenNavigationProp = StackNavigationProp<
  NoteStackParamList,
  'NoteScreen'
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
    initialRouteName="NoteScreen"
    >
      <Stack.Screen
        name="NoteScreen"
        component={NoteScreen}
        options={{ headerTitle: 'Notes' }}
      />

    </Stack.Navigator>
  );
};