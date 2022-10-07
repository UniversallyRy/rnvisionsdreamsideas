import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout, TopNavigation, Divider } from "@ui-kitten/components";
import { ToggleButton, BackAction } from "./buttons";
import { HeaderStyles } from "./Styles";
import { ThemesContext } from './../ThemeContext';

export type HeaderProps = {
  name: string
  navigation?: NavigationScreenProp<string, object>;
};

const Header:React.FC<HeaderProps> = ({ name, navigation }): JSX.Element => {

  let navigateBack;
  const { theme, toggleTheme } = useContext(ThemesContext);

  if(navigation != undefined) {
    navigateBack = (): void => {
      navigation.goBack();
    };
  }

  return (
    <Layout style={ styles.headerContainer }>
      <TopNavigation
        title={ name }
        // Show a back button if on a nested detail screen
        alignment={ name.includes("Details") ? "center" : "start" }
        accessoryLeft={ name.includes("Details") ? BackAction(navigateBack) : undefined }
        accessoryRight={ ToggleButton({ theme, toggleTheme }) }
      />
      <Divider/>
    </Layout>
  );

};

const styles = StyleSheet.create<HeaderStyles>({
  headerContainer: {
    fontFamily: "roboto",
  },
});

export default Header;
