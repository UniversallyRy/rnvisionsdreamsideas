import React, { useContext } from "react";
import { NavigationScreenProp } from 'react-navigation';
import { StyleSheet, ViewStyle } from "react-native";
import { Button, Divider, Icon, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { ThemesContext } from './../ThemeContext';

export type HeaderProps = {
    name: string
    navigation?: NavigationScreenProp<string, object>;
    props?: string[]
};

interface Styles {
  headerContainer: ViewStyle;
}

const Header:React.FC<HeaderProps> = ({ name, navigation, props }) => {

  const themeContext = useContext(ThemesContext);
  let navigateBack;

  if(navigation != undefined) {
    navigateBack = () => {
      navigation.goBack();
    };
  }
  
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
    );
    
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack }/>
  );

  return (
    <Layout style={styles.headerContainer}>
      {name.includes("Details")
        ?<TopNavigation 
            title={name} 
            alignment='center' 
            accessoryLeft={BackAction} 
            accessoryRight={<Button
                               style={{ marginVertical: 4 }} 
                               onPress={themeContext.toggleTheme} 
                               {...props}>
                                 TOGGLE THEME
                            </Button>} 
          />
        :<TopNavigation 
            title={name} 
            alignment='start' 
            accessoryRight={<Button 
                                style={{ marginVertical: 4 }} 
                                onPress={themeContext.toggleTheme} 
                                {...props}>
                                  TOGGLE THEME
                            </Button>} 
        />
      }
      <Divider/>
    </Layout>
  )
};

const styles = StyleSheet.create<Styles>({
  headerContainer: {
    fontFamily: "roboto",
  },
});

export default Header;
