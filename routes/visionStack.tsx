import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp, StackNavigationOptions, TransitionSpecs } from "@react-navigation/stack";
import Visions from "../screens/visionScreen";
import VisionDetails from "../components/visions/visionDetails";
import Header from "../shared/header";

type VisionStackParamList = {
  VisionScreen: undefined;
  VisionDetails: undefined;
};

type VisionScreenNavigationProp = StackNavigationProp<VisionStackParamList,'VisionScreen'>;

type NavProp = {
  navigation: VisionScreenNavigationProp;
}

const Stack = createStackNavigator<VisionStackParamList>()

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
      initialRouteName="VisionScreen"
      screenOptions ={{
        headerMode:"screen",
        header: ({ route, previous, navigation }:any) => (
          <Header title="Visions " scene={route} previous={previous} navigation={navigation} />
          ),
        ...customTrans,
      }}
    >
      <Stack.Screen
        name="VisionScreen"
        component={Visions}
        options={{ 
          // ...TransitionPresets.DefaultTransition,
          // cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid, 
          // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
      <Stack.Screen
        name="VisionDetails"
        component={VisionDetails}
        options={{ 
          headerTitle: 'Vision Details', 
          // ...TransitionPresets.ModalTransition,
          // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, 
          // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
    </Stack.Navigator>
  );
};

export default VisionStack;


