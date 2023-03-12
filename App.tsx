import "react-native-get-random-values";
import React, { useState, useEffect, useCallback } from "react";
import { AppRegistry, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import { ThemesContext } from "./ThemeContext";
import BottomTabs from "./routes/Drawer";
import { store, /*persistor */ } from "./redux/store";
import { default as customTheme } from './styles/custom-theme.json';
// import { PersistGate } from "redux-persist/integration/react";
SplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // const [persistLoaded, setPersistLoaded] = useState(true);
  const [theme, setTheme] = useState('light');
  const [evaTheme, setEvaTheme] = useState(eva.light);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
          "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
          "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const toggleTheme = (): void => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    nextTheme === 'light' ? setEvaTheme(eva.light) : setEvaTheme(eva.dark);
    setTheme(nextTheme);
  };

    return (
      <Provider store={store}>
        <ThemesContext.Provider value={{ theme, toggleTheme }}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...evaTheme, ...customTheme }}>
            <StatusBar animated={true} />
            <NavigationContainer onReady={onLayoutRootView}>
              <BottomTabs />
            </NavigationContainer>
          </ApplicationProvider>
        </ThemesContext.Provider>
      </Provider>
    );
};

AppRegistry.registerComponent("App", () => App);

export default App;
