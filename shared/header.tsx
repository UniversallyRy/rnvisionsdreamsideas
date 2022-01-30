import React, { useContext } from "react";
import { NavigationScreenProp } from 'react-navigation';
import { StyleSheet, ViewStyle } from "react-native";
import { Layout, Divider, TopNavigation } from "@ui-kitten/components";
import { ThemesContext } from './../ThemeContext';
import { BackAction, ToggleButton } from "./buttons";

export type HeaderProps = {
  name: string
  navigation?: NavigationScreenProp<string, object>;
};

interface Styles {
  headerContainer: ViewStyle;
}
const Header:React.FC<HeaderProps> = ({ name, navigation }) => {

  const { theme, toggleTheme } = useContext(ThemesContext);
  let navigateBack;

  if(navigation != undefined) {
    navigateBack = () => {
      navigation.goBack();
    };
  }

  return (
    <Layout style={styles.headerContainer}>
      <TopNavigation 
        title={name} 
        alignment={name.includes("Details") ? "center" : "start"} 
        // Show a back button if on a nested detail screen
        accessoryLeft={name.includes("Details") ? BackAction(navigateBack) : undefined} 
        accessoryRight={ToggleButton(theme, toggleTheme)} 
      />
      <Divider/>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  headerContainer: {
    fontFamily: "roboto",
  },
});

export default Header;
