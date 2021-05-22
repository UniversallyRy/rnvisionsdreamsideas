import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import TodoScreen from "../screens/todoScreen";
import Header from "../shared/header";
import { coltsGray, coltsBlue } from "../styles/global";

const screens = {
  TodoScreen: {
    screen: TodoScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Todo Lists" />
        ),
      };
    },
  },
};

const TodoStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: coltsBlue,
    headerStyle: {
      backgroundColor: coltsGray,
      height: 100,
    },
  },
});

export default TodoStack;
