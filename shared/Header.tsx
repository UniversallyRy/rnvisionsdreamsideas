import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout, TopNavigation, Divider } from "@ui-kitten/components";
import { ToggleButton, BackAction } from "./Buttons";
import { ThemesContext } from './../ThemeContext';
import { HeaderStyles } from "./styles";

export type HeaderProps = {
  name: string
  navigation?: NavigationScreenProp<string, object>;
};

const Header: React.FunctionComponent<HeaderProps> = ({ name, navigation }): JSX.Element => {

  let navigateBack: () => void;
  const { theme, toggleTheme } = useContext(ThemesContext);

  if (navigation != undefined) {
    navigateBack = () => {
      navigation.goBack();
    }
  } else {
    navigateBack = () => {
      return null
    }
  }

  return (
    <Layout style={styles.headerContainer}>
      <TopNavigation
        title={name}
        // Show a back button if on a nested detail screen
        alignment={name.includes("Details") ? "center" : "start"}
        accessoryLeft={name.includes("Details") ? BackAction(navigateBack) : undefined}
        accessoryRight={ToggleButton({ theme, toggleTheme })}
      />
      <Divider />
    </Layout>
  );

};

const styles = StyleSheet.create<HeaderStyles>({
  headerContainer: {
    fontFamily: "roboto",
  },
});

export default Header;
