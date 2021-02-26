import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = ({ icon, isSelected }) => (
  <View style={styles.container}>
    <Ionicons name={icon} color={isSelected ? "black" : "grey"} size={30} />
  </View>
);
export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
