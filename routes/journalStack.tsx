import React from "react";
import { createStackNavigator, } from "@react-navigation/stack";
import JournalScreen from "../screens/journalScreen";
import JournalDetails from "../components/journals/journalDetails";
import Header from "../shared/header";

type NavProp = {
  navigation: any;
};

const Stack = createStackNavigator()

export const JournalStack = () => {
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
