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
import { store, /*persistor */ } from "./redux/store";
import { AppLoading } from "expo";
import { BottomTabs } from "./routes/drawer";
import { PersistGate } from "redux-persist/integration/react";
import * as Font from "expo-font";
import { ThemesContext } from "./ThemeContext";


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};


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
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [persistLoaded, setPersistLoaded] = useState(true);


  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <ThemesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <StatusBar animated={true} />
            <NavigationContainer theme={theme}>
              <BottomTabs />
            </NavigationContainer>
          </PaperProvider>
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
      />
    );
  }
};

AppRegistry.registerComponent("App", () => App);

export default App;