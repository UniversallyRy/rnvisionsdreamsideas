import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp, StackNavigationOptions, TransitionSpecs } from "@react-navigation/stack";
import Visions from "../screens/visionScreen";
import VisionDetails from "../components/visions/visionDetails";
import Header from "../shared/header";

type VisionStackParamList = {
  "Vision Images": undefined;
  "Vision Details": undefined;
};

type VisionScreenNavigationProp = StackNavigationProp<VisionStackParamList,'Vision Images'>;

type NavProp = { navigation: VisionScreenNavigationProp };

const Stack = createStackNavigator<VisionStackParamList>();

// screenOption transition animations
const customTrans: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }) 
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["40deg", "0deg"],
            })
          },
          {
            scale: next ? 
              next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }) : 1,
          },
        ]
      }
    }
  }
}

const VisionStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator 
      initialRouteName= "Vision Images"
      screenOptions= {{
        headerMode: "screen",
        header: ({ route, previous, navigation }:any) => (
          <Header scene={route} previous={previous} navigation={navigation} />
          ),
        ...customTrans,
      }}
    >
      <Stack.Screen
        name= "Vision Images"
        component= { Visions }
      />
      <Stack.Screen
        name= "Vision Details"
        component= { VisionDetails }
      />
    </Stack.Navigator>
  );
};

export default VisionStack;