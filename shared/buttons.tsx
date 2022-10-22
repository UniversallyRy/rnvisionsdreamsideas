import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Layout, Button, ButtonGroup, Text, TopNavigationAction } from "@ui-kitten/components"
import { BackIcon, CloseIcon, DayIcon, FavIcon, GridIcon, NightIcon, SaveIcon, SubmitIcon } from "./icons";
import { windowWidth } from "../utils/constants";
import { ButtonStyles } from "./Styles";

type ButtonProps = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  onPress(): void;
}

type FormProps = {
  text?: string;
  color: string;
  onPress(): void;
}

type ToggleProps = {
  theme: string;
  toggleTheme(): void;
}

// default export kittenui styled button
export const FormButton: React.FunctionComponent<FormProps> = ({ text, color, onPress, ...props }): JSX.Element => (
  <Button
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
    {...props}
  >
    <Text style={styles.text}>{text}</Text>
  </Button>
);

export const CloseButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    appearance='ghost'
    accessoryRight={CloseIcon}
    onPress={onPress}
    {...props}
  />
);

// Header Buttons
export const ToggleButton: React.FunctionComponent<ToggleProps> = ({ theme, toggleTheme, ...props }: ToggleProps): JSX.Element => (
  <Button
    style={styles.toggle}
    accessoryRight={theme == "light" ? DayIcon : NightIcon}
    onPress={toggleTheme}
    {...props}
  />
);

export const BackAction: React.FunctionComponent<() => void> = (navigateBack): JSX.Element => (
  <TopNavigationAction icon={BackIcon} onPress={() => navigateBack()} />
);
// Vision Modal Buttons
export const ImageButtons: React.FunctionComponent<{ pickImage: () => void, cameraImage: () => void }> = ({ pickImage, cameraImage, ...props }): JSX.Element => (
  <ButtonGroup {...props}>
    <Button
      style={styles.imgSelect}
      onPress={pickImage}
      accessibilityLabel="Add Image From Gallery"
    >
      Add from Photos
    </Button>
    <Button
      style={styles.imgSelect}
      onPress={cameraImage}
      accessibilityLabel="Take A Picture"
    >
      Take a Picture
    </Button>
  </ButtonGroup>
);
// Journal Buttons
export const SaveButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }): JSX.Element => (
  <Button
    style={styles.edit}
    onPress={onPress}
    accessoryRight={SaveIcon}
    {...props}
  >
    Save
  </Button>
);

export const CancelButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }): JSX.Element => (
  <Button
    style={styles.delete}
    onPress={onPress}
    {...props}
  >
    Cancel
  </Button>
);

export const EditButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }): JSX.Element => (
  <Button
    style={styles.edit}
    onPress={onPress}
    {...props}
  >
    Edit
  </Button>
);

export const FavButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    accessoryRight={FavIcon}
    onPress={onPress}
    {...props}
  />
);

export const DeleteButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }): JSX.Element => (
  <Button
    style={styles.delete}
    onPress={onPress}
    {...props}
  >
    Delete
  </Button>
);
// Footer Buttons
export const SubmitButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    style={styles.submit}
    appearance='ghost'
    accessoryLeft={SubmitIcon}
    onPress={onPress}
    {...props}
  />
);

export const GridButton: React.FunctionComponent<ButtonProps> = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    appearance='ghost'
    accessoryLeft={GridIcon}
    onPress={onPress}
    {...props}
  />
);

export const FooterButtons: React.FunctionComponent<ButtonProps> = ({ left, right }: any): JSX.Element => (
  <Layout style={styles.footerContainer}>
    {/*  if adjustable view, right button is a grid toggle */}
    {right.name === 'toggleView'
      ? <>
        <SubmitButton onPress={(): boolean => left(true)} style={styles.footer} />
        <GridButton onPress={(): boolean => right()} style={styles.footer} />
      </>
      : <>
        <SubmitButton onPress={(): boolean => left(true)} style={styles.note}>
          Note
        </SubmitButton>
        <SubmitButton onPress={(): boolean => right(true)} style={styles.todo}>
          Todo
        </SubmitButton>
      </>}
  </Layout>
);

const styles = StyleSheet.create<ButtonStyles>({
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
