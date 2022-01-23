import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import JournalScreen from "../screens/journalScreen";
import JournalDetails from "../components/journals/journalDetails";
import Header from "../shared/header";

export type JournalStackParamList = {
  "Journal Entries": undefined;
  "Journal Details": { 
    title: string;
    body: string;
    date : string;
  };
};

type JournalScreenNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'Journal Entries'
>;

type NavProp = {
  navigation: JournalScreenNavigationProp;
};


const Stack = createStackNavigator<JournalStackParamList>()

export const JournalStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        header: ({ route, previous, navigation }:any) => (
          <Header scene={route} previous={previous} navigation={navigation} />
        ),
      }}
      initialRouteName="Journal Entries"
    >
      <Stack.Screen
        name="Journal Entries"
        component={JournalScreen}
        options={{ headerTitle: 'Journal Screen' }}
      />
      <Stack.Screen
        name="Journal Details"
        component={JournalDetails}
        options={{ headerTitle: 'Journal Details' }}
      />

    </Stack.Navigator>
  );
};


export default JournalStack;
