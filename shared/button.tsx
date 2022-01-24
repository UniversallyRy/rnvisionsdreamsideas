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

const CloseIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);

// Custom button made for Flat styling
const FlatButton:React.FC<ButtonProps> = ({ text, onPress, ...props }) => {
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
