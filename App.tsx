import "react-native-get-random-values";
import 'react-native-gesture-handler';
import React, { useState } from "react";
import { AppRegistry, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ThemesContext } from "./ThemeContext";
import BottomTabs from "./routes/Drawer";
import { store, /*persistor */ } from "./redux/store";
import { default as customTheme } from './styles/custom-theme.json';
// import { PersistGate } from "redux-persist/integration/react";

const App = (): JSX.Element => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // const [persistLoaded, setPersistLoaded] = useState(true);
  const [theme, setTheme] = useState('light');
  const [evaTheme, setEvaTheme] = useState(eva.light);

  const toggleTheme = (): void => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    nextTheme === 'light' ? setEvaTheme(eva.light) : setEvaTheme(eva.dark);
    setTheme(nextTheme);
  };

  const getFonts = (): Promise<void> => {
    return Font.loadAsync({
      "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
      "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });
  };

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <ThemesContext.Provider value={{ theme, toggleTheme }}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...evaTheme, ...customTheme }}>
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
        onFinish={(): void => {
          setFontsLoaded(true);
          // setPersistLoaded(false);
        }}
        onError={console.warn}
      />
    );
  }
};

export default App;

AppRegistry.registerComponent("App", () => App);
