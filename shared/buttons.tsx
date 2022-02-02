import React, { useContext } from "react";
import { GestureResponderEvent, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Layout, Button, Text, TopNavigationAction, ButtonGroup } from "@ui-kitten/components"
import { BackIcon, CloseIcon, DayIcon, GridIcon, NightIcon, SaveIcon, SubmitIcon } from "./icons";
import { windowWidth } from "../utils/dimensions";

type ButtonProps = {
  text?: string;
  onPress: () => void;
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
export const KittenButton:React.FC<ButtonProps> = ({ text, onPress, ...props }) => {
  return (
    <Button
      style={styles.button}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.text}>{text}</Text>
    </Button>
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

// Header Buttons
export const ToggleButton = ( theme: string, toggleTheme: ((event: GestureResponderEvent) => void) | undefined, ...props: undefined[] ) => {
  return (
    <Button
      style={styles.toggle} 
      onPress={ toggleTheme } 
      accessoryRight={theme == "light" ? DayIcon : NightIcon}
      {...props}
    />
  );
};

export const BackAction = (navigateBack: () => void) => (
  <TopNavigationAction icon={BackIcon} onPress={() => navigateBack()}/>
);
// Vision Modal Buttons
export const ImageButtons = ({ pickImage, cameraImage, ...props }) => {
  return (
    <ButtonGroup {...props}>
      <Button
        accessibilityLabel="Add Image From Gallery"
        onPress={ pickImage }
        style={ styles.imgSelect }
      >
        Add from Photos
      </Button>
      <Button
        accessibilityLabel="Take A Picture"
        onPress={ cameraImage }
        style={ styles.imgSelect }
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
      style={ styles.edit}
      accessoryRight={SaveIcon}
      onPress={onPress}
      {...props}
    >
      Save
    </Button>
  );
};

export const CancelButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.delete}
      onPress={ onPress }
      {...props}
    >
      Cancel
    </Button>
  );
};
export const EditButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.edit}
      onPress={ onPress }
      {...props}
    >
      Edit
    </Button>
  );
};
export const DeleteButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.delete}
      onPress={ onPress }
      {...props}
    >
      Delete
    </Button>
  );
};
// Footer Buttons
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

export const FooterButtons = ({ context }) => {
  const contextObj:any =  useContext(context);

  let setModalOpen: (arg0: boolean) => any, 
  toggleView: () => any, 
  toggleNoteModal: () => any, 
  toggleTodoModal: () => any

  if(context._currentValue.hasOwnProperty('setModalOpen')){
    setModalOpen  = contextObj.setModalOpen
    toggleView  = contextObj.toggleView
  }else{
    toggleNoteModal = contextObj.toggleNoteModal
    toggleTodoModal  = contextObj.toggleTodoModal
  }

  return (
    <Layout style={styles.footerContainer}>
      {context._currentValue.toggleView != undefined
        ?<>
          <SubmitButton onPress={() => setModalOpen(true)} style={styles.footer}/>
          <GridButton onPress={() => toggleView()} style={styles.footer}/>
        </>
        :<>
          <SubmitButton onPress={() => toggleNoteModal()} style={styles.note}>
            Note
          </SubmitButton>
          <SubmitButton onPress={() => toggleTodoModal()} style={styles.todo}>
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
    borderRadius: 1,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    elevation: 1,
  },
  text: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
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

export default KittenButton;
