import React from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Layout, Button, ButtonGroup, Text, TopNavigationAction } from "@ui-kitten/components"
import { BackIcon, CloseIcon, DayIcon, GridIcon, NightIcon, SaveIcon, SubmitIcon } from "./icons";
import { windowWidth } from "../utils/constants";

type ButtonProps = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  onPress: (event?: GestureResponderEvent | undefined) => void;
}

type FormProps = {
  text?: string;
  color: string;
  onPress: () => void
}

type ToggleProps = {
  theme: string;
  toggleTheme: (event?: GestureResponderEvent | undefined) => void;
}

interface Styles {
  button: ViewStyle;
  text: TextStyle;
  toggle: ViewStyle;
  imgSelect: ViewStyle;
  edit: ViewStyle;
  delete: ViewStyle;
  submit: ViewStyle;
  note: ViewStyle;
  todo: ViewStyle;
  footerContainer: ViewStyle;
  footer: ViewStyle;
}

// default export kittenui styled button
export const FormButton = ({ text, color, onPress, ...props }: FormProps) => {
  return (
    <Button
      style={ [ styles.button, { backgroundColor: color }] }
      onPress={ onPress }
      { ...props }
    >
      <Text style={ styles.text }>{ text }</Text>
    </Button>
  );
};

export const CloseButton:React.FC<ButtonProps>= ({ onPress, ...props }:ButtonProps) => {
  return (
    <Button
      appearance='ghost'
      accessoryRight={ CloseIcon }
      onPress={ onPress }
      { ...props }
    />
  );
 };

// Header Buttons
export const ToggleButton = ({ theme, toggleTheme, ...props } : ToggleProps) => { 
  return (
    <Button
      style={ styles.toggle } 
      accessoryRight={ theme == "light" ? DayIcon : NightIcon }
      onPress={ toggleTheme } 
      {...props }
    />
  );
};

export const BackAction = (navigateBack: () => void) => (
  <TopNavigationAction icon={ BackIcon } onPress={ () => navigateBack() }/>
);
// Vision Modal Buttons
export const ImageButtons = ({ pickImage, cameraImage, ...props }) => {
  return (
    <ButtonGroup { ...props }>
      <Button
        style={ styles.imgSelect }
        onPress={ pickImage }
        accessibilityLabel="Add Image From Gallery"
      >
        Add from Photos
      </Button>
      <Button
        style={ styles.imgSelect }
        onPress={ cameraImage }
        accessibilityLabel="Take A Picture"
      >
        Take a Picture
      </Button>
    </ButtonGroup>
  );
};
// Journal Buttons
export const SaveButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.edit }
      onPress={ onPress }
      accessoryRight={ SaveIcon }
      { ...props }
    >
      Save
    </Button>
  );
};

export const CancelButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.delete }
      onPress={ onPress }
      { ...props }
    >
      Cancel
    </Button>
  );
};
export const EditButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.edit }
      onPress={ onPress }
      { ...props }
    >
      Edit
    </Button>
  );
};
export const DeleteButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.delete }
      onPress={ onPress }
      { ...props }
    >
      Delete
    </Button>
  );
};
// Footer Buttons
export const SubmitButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.submit }
      appearance='ghost'
      accessoryLeft={ SubmitIcon }
      onPress={ onPress }
      { ...props }
    />
  );
};

export const GridButton = ({ onPress, ...props }) => {
  return (
    <Button
      appearance='ghost'
      accessoryLeft={ GridIcon }
      onPress={ onPress }
      { ...props }
    />
  );
};

export const FooterButtons = ({ left, right }) => {
  return (
    <Layout style={ styles.footerContainer }>
      {/*  if adjustable view, right button is a grid toggle */}
      { right.name === 'toggleView'
        ?<>
          <SubmitButton onPress={ () => left(true) } style={ styles.footer }/>
          <GridButton onPress={ () => right() } style={ styles.footer }/>
        </>
        :<>
          <SubmitButton onPress={ () => left(true) } style={ styles.note }>
            Note
          </SubmitButton>
          <SubmitButton onPress={ () => right(true) } style={ styles.todo }>
            Todo
          </SubmitButton>
        </>
      }
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  button: {
    alignSelf: "center",
    width: 200,
    borderWidth: 0,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    elevation: 2,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  edit: {
    width: windowWidth * 0.40,
    margin: 1,
  },
  delete: {
    margin: 1,
    backgroundColor: "red",
    width: windowWidth * 0.40,
  },
  imgSelect: {
    margin: 5,
    elevation: 1,
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  toggle: {
    alignItems: "center",
    margin: 4 
  },
  footerContainer: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent"
  },
  footer: {
    marginHorizontal: 50,
  },
  note: {
    marginHorizontal: 15,
  },
  todo: {
    marginHorizontal: 15,
  }
});
