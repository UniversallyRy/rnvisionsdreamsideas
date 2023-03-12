import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Icon, Button, ButtonGroup, Text, TopNavigationAction, ButtonProps } from "@ui-kitten/components"
import { windowWidth } from "../utils/constants";
import { ButtonStyles } from "./styles";

//type ButtonType = {
//  text?: string;
//  style?: StyleProp<ViewStyle>;
//  accessibilityLabel?: string;
//  onPress(): void;
//}

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
export const FormButton = ({ text, color, onPress, ...props }: FormProps): JSX.Element => (
  <Button
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
    {...props}
  >
    <Text style={styles.text}>{text}</Text>
  </Button>
);

export const CloseButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    appearance='ghost'
    accessoryRight={(props) => (<Icon  {...props} name="close-outline" />)}
    onPress={onPress}
    {...props}
  />
);

// Header Buttons
export const ToggleButton = ({ theme, toggleTheme, ...props }: ToggleProps): JSX.Element => (
  <Button
    style={styles.toggle}
    accessoryRight={theme == "light" ? (props) => (<Icon  {...props} name="sun" />) : (props) => (<Icon  {...props} name="moon" />)}
    onPress={toggleTheme}
    {...props}
  />
);

export const BackAction = (navigateBack: () => void): JSX.Element => (
  <TopNavigationAction icon={BackIcon} onPress={() => navigateBack()} />
);

// Vision Modal Buttons
export const ImageButtons = ({ pickImage, cameraImage, ...props }: any): JSX.Element => (
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
export const SaveButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    style={styles.edit}
    onPress={onPress}
    accessoryRight={(props) => (<Icon  {...props} name="save-outline" />)}
    {...props}
  >
    Save
  </Button>
);

export const CancelButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    style={styles.delete}
    onPress={onPress}
    {...props}
  >
    Cancel
  </Button>
);

export const EditButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    style={styles.edit}
    onPress={onPress}
    {...props}
  >
    Edit
  </Button>
);

export const FavButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    accessoryRight={(props) => (<Icon  {...props} name="heart-outline" />)}
    onPress={onPress}
    {...props}
  />
);

export const DeleteButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    style={styles.delete}
    onPress={onPress}
    {...props}
  >
    Delete
  </Button>
);
// Footer Buttons
export const SubmitButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    style={styles.submit}
    accessoryLeft={(props) => (<Icon  {...props} name="plus-outline" />)}
    onPress={onPress}
    {...props}
  />
);

export const GridButton = ({ onPress, ...props }: ButtonProps): JSX.Element => (
  <Button
    accessoryLeft={(props) => (<Icon  {...props} name="grid" />)}
    onPress={onPress}
    {...props}
  />
);

export const FooterButtons = ({ left, right }: ButtonProps): JSX.Element => (
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
