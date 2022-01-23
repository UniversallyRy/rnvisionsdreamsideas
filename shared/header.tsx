import React, { useContext } from "react";
import { NavigationScreenProp } from 'react-navigation';
import { TouchableOpacity, StyleSheet } from "react-native";
import { Appbar, TouchableRipple, Switch, useTheme, IconButton, Colors } from "react-native-paper";
import { ThemesContext } from './../ThemeContext';

export type HeaderProps = {
  navigation: NavigationScreenProp<string, object>
  scene: {
    key: string
    name: string
    params: undefined
  }
  previous: undefined | boolean
};

const Header:React.FC<HeaderProps> = ({ scene, previous, navigation }) => {
  const { toggleTheme, isThemeDark } = useContext(ThemesContext);
  // scene.name = Stack.Screen name prop
  const header = scene.name;
  const theme = useTheme();

  return (
    <Appbar.Header
      theme={{ colors: { primary: theme.colors.primary }} }
      style={styles.headerContainer}
    >
    {previous ? (
      <Appbar.BackAction
        onPress={() => navigation.goBack()}
        color={theme.colors.background}
      />
    ) : (
      <TouchableOpacity/>
    )}
      <Appbar.Content title={
          !previous ? header : 'Back'
        }
      />
        <TouchableRipple>
          <Switch
            color={'darkgray'}
            value={isThemeDark}
            onValueChange={() => toggleTheme()}
          />
        </TouchableRipple>
        {isThemeDark === true ?
        <IconButton
          icon="moon-waxing-crescent"
          color={Colors.grey300}
          size={14}
        />
        :<IconButton
          icon="white-balance-sunny"
          color={Colors.yellow800}
          size={14}
        />
        }
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 15,
  },
});

export default Header;
