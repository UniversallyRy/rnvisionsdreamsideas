import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import JournalScreen from "../screens/journalScreen";
import JournalDetails from "../components/journals/journalDetails";
import Header from "../shared/header";

export type JournalStackParamList = {
  JournalScreen: undefined;
  JournalDetails: { 
    title: string;
    body: string;
    date : string;
  };
};

type JournalScreenNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'JournalScreen'
>;

type NavProp = {
  navigation: JournalScreenNavigationProp;
};


const Stack = createStackNavigator<JournalStackParamList>()

export const JournalStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header title="Journal Screen" scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
      initialRouteName="JournalScreen"
    >
      <Stack.Screen
        name="JournalScreen"
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
