import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useTheme, Appbar, TouchableRipple, Switch } from "react-native-paper";
import { NavigationScreenProp } from 'react-navigation';
import { ThemesContext } from './../ThemeContext';

type HeaderProps = {
  navigation: NavigationScreenProp<string, object>;
  title: string;
  scene: any,
  previous: any,
};

const Header:React.FC<HeaderProps> = ({ scene, previous, navigation }) => {
  const header = scene.name
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = useContext(ThemesContext);

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
      <TouchableOpacity
      // onPress={() => {
      //   navigation.openDrawer();
      // }}
    >
      
    </TouchableOpacity>
  )}
      <Appbar.Content title={
          !previous ? header : ''
        }
        />
      <TouchableRipple>
      <Switch
          style={[{ marginRight: 15 }]}
          color={'darkgray'}
          value={isThemeDark}
          onValueChange={() => toggleTheme()}
        />
      </TouchableRipple>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    margin: 10,
    paddingBottom: 10,
  },
});

export default Header;
