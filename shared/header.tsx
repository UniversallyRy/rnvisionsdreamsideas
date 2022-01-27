import React, { useContext } from "react";
import { NavigationScreenProp } from 'react-navigation';
import { StyleSheet, ViewStyle } from "react-native";
import { Layout, Divider, TopNavigation } from "@ui-kitten/components";
import { ThemesContext } from './../ThemeContext';
import { ToggleButton } from "./button";
import { BackAction } from "./icon";

export type HeaderProps = {
  name: string
  navigation?: NavigationScreenProp<string, object>;
  props?: string[]
};

interface Styles {
  headerContainer: ViewStyle;
}

const Header:React.FC<HeaderProps> = ({ name, navigation, props }) => {

  const { toggleTheme } = useContext(ThemesContext);
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
        accessoryLeft={name.includes("Details") ? BackAction(navigateBack) : undefined} 
        accessoryRight={ToggleButton(toggleTheme)} 
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
