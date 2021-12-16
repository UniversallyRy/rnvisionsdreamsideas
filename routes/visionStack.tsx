import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import Visions from "../screens/visionScreen";
import VisionDetails from "../components/visions/visionDetails";
import Header from "../shared/header";

type VisionStackParamList = {
  VisionScreen: undefined;
  VisionDetails: undefined;
};

type VisionScreenNavigationProp = StackNavigationProp<
  VisionStackParamList,
  'VisionScreen'
>;

type NavProp = {
  navigation: VisionScreenNavigationProp;
}

const Stack = createStackNavigator<VisionStackParamList>()

const VisionStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerMode:"screen",
        header: ({ route, previous, navigation }:any) => (
          <Header title="Visions " scene={route} previous={previous} navigation={navigation} />
        ),
      }}
      initialRouteName="VisionScreen"
    >
      <Stack.Screen
        name="VisionScreen"
        component={Visions}
      />
      <Stack.Screen
        name="VisionDetails"
        component={VisionDetails}
        options={{ headerTitle: 'Vision Details' }}
      />
    </Stack.Navigator>
  );
};

export default VisionStack;


