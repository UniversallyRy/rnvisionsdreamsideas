import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import "react-native-get-random-values";
import "react-native-gesture-handler";
import { AppRegistry, StatusBar } from "react-native";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { AppLoading } from "expo";
import NavDrawer from "./routes/drawer";
import { PersistGate } from "redux-persist/integration/react";
import * as Font from "expo-font";
// const CombinedDefaultTheme = merge( PaperDefaultTheme, NavigationDefaultTheme );
// const CombinedDarkTheme = merge( PaperDarkTheme, NavigationDarkTheme );
// todos: FINISH FIXING JEST TESTING, IMPROVE ACCESSIBILITY, visionboard fixes, build dream journal out, move styles back outside components eventually

const getFonts = () =>
  Font.loadAsync({
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [persistLoaded, setPersistLoaded] = useState(true);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
          <PaperProvider>
            <NavigationContainer>
              <NavDrawer />
              <StatusBar animated={true} />
            </NavigationContainer>
          </PaperProvider>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
          setPersistLoaded(false);
        }}
      />
    );
  }
};

AppRegistry.registerComponent("App", () => App);

export default App;
