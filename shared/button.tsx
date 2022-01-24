import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button, Icon, Text } from "@ui-kitten/components"

interface ButtonProps {
  text?: string;
  onPress: () => void;
}

interface Styles {
  button: ViewStyle;
  submit: ViewStyle;
  buttonText: TextStyle;
}

const SubmitIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);
const GridIcon = (props) => (
  <Icon {...props} name='grid'/>
);


// Custom button made for Flat styling
const FlatButton:React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <Button
      style={styles.button}
      onPress={onPress}
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
      accessoryLeft={SubmitIcon}
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
