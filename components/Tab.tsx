import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface VisionProps {
  icon: string;
  isSelected: boolean;
  container: StyleProp<ViewStyle>;
}

interface Styles {
  container: ViewStyle;
}

const Tab: React.FC<VisionProps> = ({ icon, isSelected }) => (
  <View style={styles.container}>
    <Ionicons name={icon} color={isSelected ? "black" : "grey"} size={30} />
  </View>
);

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Tab;
