import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { coltsBlue, raidSilver } from "../styles/global";

const Header = ({ navigation, title }) => {
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
          styles={styles.icon}
        />
        {/* <Image source={require('../assets/favicon.png')}/> */}
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: raidSilver,
  },
  headerText: {
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 20,
    color: coltsBlue,
    letterSpacing: 7,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
  },
  icon: {
    position: "relative",
    flex: 1,
    marginBottom: 10,
  },
});

export default Header;
