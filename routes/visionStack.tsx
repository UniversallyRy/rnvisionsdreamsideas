import React from 'react';
import { createStackNavigator, StackNavigationProp, StackNavigationOptions, TransitionSpecs } from '@react-navigation/stack';
import VisionScreen from '../screens/Visions';
import VisionDetails from '../screens/VisionDetails';

type VisionStackParamList = {
  'Vision Images': undefined;
  'Vision Details': undefined;
};

type VisionScreenNavigationProp = StackNavigationProp<VisionStackParamList, 'Vision Images'>;

type NavProp = { navigation: VisionScreenNavigationProp };

const { Navigator, Screen } = createStackNavigator<VisionStackParamList>();

// screenOption transition animations
const customTrans: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => ({
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
            outputRange: ['40deg', '0deg'],
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
  })
}

const VisionStack: React.FunctionComponent<NavProp> = (): JSX.Element => (
  <Navigator
    initialRouteName='Vision Images'
    screenOptions={{
      headerShown: false,
      ...customTrans,
    }}
  >
    <Screen
      name='Vision Images'
      component={VisionScreen} />
    <Screen
      name='Vision Details'
      component={VisionDetails} />
  </Navigator>
);

export default VisionStack;
