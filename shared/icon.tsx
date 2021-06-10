import React from "react";
import { GestureResponderEvent, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { FAB } from "react-native-paper";

interface IconProps {
  item: string;
  onPress?: ((event: GestureResponderEvent) => void);
  modalToggle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>
}

interface Styles {
  modalToggle: ViewStyle;
  delete: ViewStyle;
}

export const Icon:React.FC<IconProps> = ({ item, onPress }) => {
  return (
    <FAB
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
    marginBottom: 15,
    marginHorizontal: 84,
  },
  delete: {
    margin: 5,
  }
});

