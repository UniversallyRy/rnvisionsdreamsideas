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
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./routes/drawer";
import { globalStyles } from "./styles/global";
import { PersistGate } from "redux-persist/integration/react";

const getFonts = () =>
  Font.loadAsync({
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
// const CombinedDefaultTheme = merge( PaperDefaultTheme, NavigationDefaultTheme );
// const CombinedDarkTheme = merge( PaperDarkTheme, NavigationDarkTheme );
// todos: styling, todo page fixes, vision fixes
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  //persist state for loader
  const [persistLoaded, setPersistLoaded] = useState(true);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <PersistGate loading={persistLoaded} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <Navigator style={globalStyles.navbar} />
              <StatusBar animated={true} style="auto" />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
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
}

AppRegistry.registerComponent(App, () => App);
