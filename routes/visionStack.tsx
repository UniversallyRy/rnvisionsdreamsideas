import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import Visions from "../screens/visionScreen";
import VisionDetails from "../components/visions/visionDetails";
import Header from "../shared/header";

type VisionStackParamList = {
  Visions: undefined;
  VisionDetails: undefined;
};

type VisionScreenNavigationProp = StackNavigationProp<
  VisionStackParamList,
  'Visions'
>;

type NavProp = {
  navigation: VisionScreenNavigationProp;
}

const Stack = createStackNavigator<VisionStackParamList>()

export const VisionStack: FunctionComponent<NavProp> = () => {
  return (
    <Stack.Navigator 
    initialRouteName="Visions"
    headerMode="screen"
    screenOptions={{
        header: ({ scene, previous, navigation }:any) => (
          <Header title="Visions" scene={scene} previous={previous} navigation={navigation} />
        ),
    }}
    >
      <Stack.Screen
        name="Visions"
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


