import React from "react";
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { FAB, useTheme } from "react-native-paper";

interface IconProps {
  item: string;
  onPress?: (() => void);
  modalToggle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>
}

interface Styles {
  modalToggle: ViewStyle;
  delete: ViewStyle;
}

export const Icon:React.FC<IconProps> = ({ item, onPress }) => {
  const theme = useTheme();
  return (
    <FAB
      theme={theme}
      icon={`${item}`}
      small
      style={styles.modalToggle}
      onPress={onPress}
    />
  );
};

export const DeleteButton:React.FC<IconProps> = ({ item, onPress }) => {
  return (
    <FAB
      icon={`${item}`}
      small
      style={styles.delete}
      onPress={onPress}
    />
  );
};
const styles = StyleSheet.create<Styles>({
  modalToggle: {
    marginTop: 3,
    marginBottom: 1,
    marginHorizontal: 84,
    elevation: 2,
    backgroundColor: "silver"
  },
  delete: {
    margin: 5,
    elevation: 2,
    backgroundColor: "red",
  }
});

