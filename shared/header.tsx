import React from "react";
import { StyleSheet, View, SafeAreaView, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderProps = {
  navigation: any;
  title: string;
  headerContainer?: StyleProp<ViewStyle>;
  headerText?: StyleProp<TextStyle>;
};

interface Styles {
  headerContainer: ViewStyle;
  headerText: TextStyle;
}

const Header:React.FC<HeaderProps> = ({ navigation, title }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <MaterialIcons
          name="menu"
          size={36}
          onPress={openMenu}
        />
        {/* <Image source={require('../assets/favicon.png')}/> */}
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  headerContainer: {
    flexDirection: "row",
  },
  headerText: {
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 20,
    letterSpacing: 7,
  },
});

export default Header;
