import React from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle, GestureResponderEvent } from "react-native";
import { Button, Text } from "react-native-paper";
import { coltsBlue, raidSilver } from "../styles/global";

interface ButtonProps {
  text?: string;
  onPress: () => void; //((event: GestureResponderEvent) => void);
  button?: StyleProp<ViewStyle>;
  buttonText?: StyleProp<TextStyle>;
  accessabilityLabel?: string;
  color?: any
}

interface Styles {
  button: ViewStyle;
  buttonText: TextStyle;
}

// Custom button made for Flat styling
const FlatButton:React.FC<ButtonProps> = ({ color, text, onPress }) => {
  return (
    <Button
      mode="contained"
      icon="plus"
      style={styles.button}
      onPress={onPress}
      color={color}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create<Styles>({
  button: {
    alignSelf: "center",
    width: 200,
    borderRadius: 1,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    elevation: 1,
  },
  buttonText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

export default FlatButton;
