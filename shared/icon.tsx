import React from "react";
import { GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IconProps {
  item: string;
  onPress: ((event: GestureResponderEvent) => void);
  modalToggle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>
}

const Icon:React.FC<IconProps> = ({ item, onPress }) => {
  return (
    <MaterialCommunityIcons
      name={`${item}`}
      size={24}
      style={globalStyles.modalToggle}
      onPress={onPress}
    />
  );
};

export default Icon;
