import React from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle, Dimensions } from "react-native";
import { useTheme, Appbar, TouchableRipple, Switch } from "react-native-paper";
import { ThemesContext } from './../ThemeContext';

type HeaderProps = {
  navigation: any;
  title: string;
};

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Header:React.FC<HeaderProps> = ({ navigation, title }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(ThemesContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.primary,
        },
      }}
      style={styles.headerContainer}
    >
      <Appbar.Content title={title}/>
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
    flex: 1,
    width: windowWidth,
    height: windowHeight
  },
});

export default Header;
