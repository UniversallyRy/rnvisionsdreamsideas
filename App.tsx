import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import "react-native-get-random-values";
import "react-native-gesture-handler";
import { AppRegistry, StatusBar } from "react-native";
import React, { useState, useMemo, useCallback } from "react";
import { Provider } from "react-redux";
import { store, /*persistor */ } from "./redux/store";
import AppLoading from 'expo-app-loading';
import { BottomTabs } from "./routes/drawer";
// import { PersistGate } from "redux-persist/integration/react";
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as Font from "expo-font";
import { ThemesContext } from "./ThemeContext";
import { default as theme } from './styles/custom-theme.json'



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
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [persistLoaded, setPersistLoaded] = useState(true);
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <ThemesContext.Provider value={{ theme, toggleTheme }}>
        <IconRegistry icons={EvaIconsPack}/>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <StatusBar animated={true} />
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