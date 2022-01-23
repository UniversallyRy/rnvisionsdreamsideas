import React, { useContext } from "react";
import { NavigationScreenProp } from 'react-navigation';
import { TouchableOpacity, StyleSheet } from "react-native";
import { Appbar, TouchableRipple, Switch, useTheme, IconButton, Colors, List } from "react-native-paper";
import { ThemesContext } from './../ThemeContext';

type HeaderProps = {
  navigation: NavigationScreenProp<string, object>;
  title: string;
  scene: any,
  previous: any,
};

const Header:React.FC<HeaderProps> = ({ scene, previous, navigation }) => {
  const header = scene.name;
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
      <TouchableOpacity/>
    )}
      <Appbar.Content title={
          !previous ? header : ''
        }
      />
        <TouchableRipple>
          <Switch
            style={[{ marginLeft: 5 }]}
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
    margin: 10,
    paddingBottom: 10,
  },
});

export default Header;
