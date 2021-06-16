import React from "react";
import { StyleSheet, TouchableOpacity, StyleProp, TextStyle, ViewStyle, Dimensions } from "react-native";
import { useTheme, Appbar, TouchableRipple, Switch } from "react-native-paper";
import { ThemesContext } from './../ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderProps = {
  navigation: any;
  title: string;
  scene: any,
  previous: any,
};

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Header:React.FC<HeaderProps> = ({ scene, previous, navigation, title }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  const { options } = scene.descriptor;
  const header =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(ThemesContext);

  return (
    <Appbar.Header
      theme={{ colors: { primary: theme.colors.primary }} }
      style={styles.headerContainer}
    >
    {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.background}
        />
    ) : (
      <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      
    </TouchableOpacity>
  )}
      <Appbar.Content title={
          !previous ? title : ''
        }
        />
      <TouchableRipple>
      <Switch
          style={[{ marginRight: 15, backgroundColor: theme.colors.backdrop }]}
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
    margin: 15,
    padding: 10,
  },
});

export default Header;
