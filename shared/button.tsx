import React from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle, GestureResponderEvent } from "react-native";
import { Button, Text } from "react-native-paper";
import { coltsBlue, raidSilver } from "../styles/global";

interface ButtonProps {
  text: string;
  onPress: () => void; //((event: GestureResponderEvent) => void);
  button: StyleProp<ViewStyle>;
  buttonText: StyleProp<TextStyle>;
}

interface Styles {
  button: ViewStyle;
  buttonText: TextStyle;
}

// Custom button made for Flat styling
const FlatButton:React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <Button
      color={coltsBlue}
      icon="plus"
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}> {text} </Text>
    </Button>
  );
};

const styles = StyleSheet.create<Styles>({
  button: {
    alignSelf: "center",
    width: 200,
    borderRadius: 2,
    paddingVertical: 30,
    marginTop: 30,
    marginBottom: 10,
    borderColor: "black",
    backgroundColor: raidSilver,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 7.25,
    shadowRadius: 4.84,

    elevation: 5,
  },
  buttonText: {
    color: coltsBlue,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

export default FlatButton;
