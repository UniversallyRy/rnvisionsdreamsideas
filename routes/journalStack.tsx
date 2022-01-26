import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import JournalScreen from "../screens/journalScreen";
import JournalDetails from "../components/journals/journalDetails";

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


const { Navigator,  Screen } = createStackNavigator<JournalStackParamList>()

export const JournalStack: FunctionComponent<NavProp> = () => {
  return (
    <Navigator 
      initialRouteName="Journal Entries"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Journal Entries"
        component={JournalScreen}
      />
      <Screen
        name="Journal Details"
        component={JournalDetails}
      />

    </Navigator>
  );
};


export default JournalStack;
