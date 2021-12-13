import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import JournalScreen from "../screens/journalScreen";
import JournalDetails from "../components/journals/journalDetails";
import Header from "../shared/header";

export type JournalStackParamList = {
  Journal: undefined;
  JournalDetails: { 
    title: string;
    body: string;
    date : string;
  };
};

type JournalScreenNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'Journal'
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
          <Header title="Journals" scene={route} previous={previous} navigation={navigation} />
        ),
      }}
      initialRouteName="Journal"
    >
      <Stack.Screen
        name="Journal"
        component={JournalScreen}
        options={{ headerTitle: 'Journal Screen' }}
      />
      <Stack.Screen
        name="JournalDetails"
        component={JournalDetails}
        options={{ headerTitle: 'Journal Details' }}
      />

    </Stack.Navigator>
  );
};


export default JournalStack;
