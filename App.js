import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { AppRegistry, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/drawer';
import { globalStyles } from './styles/global';
import { PersistGate } from 'redux-persist/integration/react';


const getFonts = () => 
   Font.loadAsync({
    'nunito-regular': require( './assets/fonts/Nunito-Regular.ttf' ),
    'nunito-black': require( './assets/fonts/Nunito-Black.ttf' )
  });

  //customize theme colors
  // const CombinedDefaultTheme = merge( PaperDefaultTheme, NavigationDefaultTheme );
  // const CombinedDarkTheme = merge( PaperDarkTheme, NavigationDarkTheme );
export default function App() {
  const [ fontsLoaded, setFontsLoaded ] = useState( false );

  if( fontsLoaded ){
    return (
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <PaperProvider>
            <NavigationContainer>
              <Navigator style={ globalStyles.navbar }/>
              <StatusBar animated={true} style="auto" />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
        </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={ getFonts }
        onFinish={() => setFontsLoaded( true )}
      />
    )
  }  
}

AppRegistry.registerComponent( App, () => App );