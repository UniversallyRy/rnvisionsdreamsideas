import "react-native-get-random-values";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { AppRegistry, StatusBar } from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store, /*persistor */ } from "./redux/store";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ThemesContext } from "./ThemeContext";
// import { PersistGate } from "redux-persist/integration/react";
import BottomTabs from "./routes/drawer";

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
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  if (fontsLoaded) {
    return (
      <Provider store={ store }>
        <ThemesContext.Provider value={{ theme, toggleTheme }}>
          <IconRegistry icons={ EvaIconsPack }/>
          <ApplicationProvider { ...eva } theme={ eva[theme] }>
            <StatusBar animated={ true } />
            <NavigationContainer>
              <BottomTabs />
            </NavigationContainer>
          </ApplicationProvider>
        </ThemesContext.Provider>
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
        onError={console.warn}
      />
    );
  }
};

AppRegistry.registerComponent("App", () => App);

export default App;