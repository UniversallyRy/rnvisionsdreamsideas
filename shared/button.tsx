import React from "react";
import { GestureResponderEvent, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button, Text } from "@ui-kitten/components"
import { CloseIcon, DayIcon, GridIcon, NightIcon, SubmitIcon } from "./icon";

type ButtonProps = {
  text?: string;
  onPress: () => void;
}

interface Styles {
  button: ViewStyle;
  submit: ViewStyle;
  buttonText: TextStyle;
}

// Custom button made for Flat styling
export const FlatButton:React.FC<ButtonProps> = ({ text, onPress, ...props }) => {
  return (
    <Button
      style={styles.button}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Button>
  );
};

export const SubmitButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={styles.submit}
      appearance='ghost'
      accessoryRight={SubmitIcon}
      onPress={onPress}
      {...props}
    />
  );
};

export const GridButton = ({ onPress, ...props }) => {
  return (
    <Button
      appearance='ghost'
      accessoryLeft={GridIcon}
      onPress={onPress}
      {...props}
    />
  );
};

export const CloseButton = ({ onPress, ...props }) => {
  return (
    <Button
      appearance='ghost'
      accessoryRight={CloseIcon}
      onPress={onPress}
      {...props}
    />
  );
};

export const ToggleButton = ( theme: string, toggleTheme: ((event: GestureResponderEvent) => void) | undefined, ...props: undefined[] ) => {
  return (
    <Button
      style={{ marginVertical: 4 }} 
      onPress={ toggleTheme } 
      accessoryRight={theme == "light" ? DayIcon : NightIcon}
      {...props}
    />
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
  submit: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  } 
});

export default FlatButton;
