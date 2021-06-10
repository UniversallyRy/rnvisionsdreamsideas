import React from "react";
import { createStackNavigator, NavigationStackProp } from "react-navigation-stack";
import JournalScreen from "../screens/journalScreen";
import JournalDetails from "../components/journals/journalDetails";
import Header from "../shared/header";

type NavProp = {
  navigation: NavigationStackProp;
};

const screens = {
  JournalList: {
    screen: JournalScreen,
    navigationOptions: ({ navigation }: NavProp) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Dream Journal" />
        ),
      };
    },
  },
  JournalDetails: {
    screen: JournalDetails,
    navigationOptions: {
      title: "Journal Details",
    },
  },
};

const JournalStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    // headerTintColor: coltsBlue,
    headerStyle: {
      // backgroundColor: coltsGray,
      height: 100,
    },
  },
});

export default JournalStack;
