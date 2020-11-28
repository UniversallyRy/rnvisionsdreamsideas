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
import 'react-native-get-random-values'
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/drawer';
import merge from 'deepmerge';
import { globalStyles } from './styles/global';


const getFonts = () => 
   Font.loadAsync({
    'nunito-regular': require( './assets/fonts/Nunito-Regular.ttf' ),
    'nunito-black': require( './assets/fonts/Nunito-Black.ttf' )
  });

  //customize theme colors
  const CombinedDefaultTheme = merge( PaperDefaultTheme, NavigationDefaultTheme );
  const CombinedDarkTheme = merge( PaperDarkTheme, NavigationDarkTheme );


export default function App() {
  const [ fontsLoaded, setFontsLoaded ] = useState( false );

  if( fontsLoaded ){
    return (
        <PaperProvider>
          <NavigationContainer style={ globalStyles.container }>
            <Navigator style={ globalStyles.navbar }/>
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
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