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
  buttonText: TextStyle;
  editButton: TextStyle;
  deleteButton: TextStyle;
  imageButtons: TextStyle;
  submit: ViewStyle;
  toggle: ViewStyle;
  footerContainer: ViewStyle;
  footerButton: ViewStyle;
  note: ViewStyle;
  todo: ViewStyle;
}

// default export kittenui styled button
export const KittenButton:React.FC<ButtonProps> = ({ text, onPress, ...props }) => {
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

export const BackAction = (navigateBack) => (
  <TopNavigationAction icon={BackIcon} onPress={() => navigateBack()}/>
);

export const FooterButtons = ({ context }) => {
  const contextObj:any =  useContext(context);
  let setModalOpen, toggleView, toggleNoteModal, toggleTodoModal
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
          <SubmitButton onPress={() => setModalOpen(true)} style={styles.footerButton}/>
          <GridButton onPress={() => toggleView()} style={styles.footerButton}/>
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
// Vision Modal Buttons
export const ImageButtons = ({ pickImage, cameraImage, ...props }) => {
  return (
    <ButtonGroup {...props}>
      <Button
        accessibilityLabel="Add Image From Gallery"
        onPress={ pickImage }
        style={ styles.imageButtons }
      >
        Add from gallery
      </Button>
      <Button
        accessibilityLabel="Take A Picture"
        onPress={ cameraImage }
        style={ styles.imageButtons }
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
      style={ styles.editButton}
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
      style={ styles.deleteButton}
      onPress={ onPress }
    >
      Cancel
    </Button>
  );
};
export const EditButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.editButton}
      onPress={ onPress }
    >
      Edit
    </Button>
  );
};
export const DeleteButton = ({ onPress, ...props }) => {
  return (
    <Button
      style={ styles.deleteButton}
      onPress={ onPress }
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
  editButton: {
    width: windowWidth * 0.40,
    margin: 1,
  },
  deleteButton: {
    margin: 1,
    backgroundColor: "red",
    width: windowWidth * 0.40,
  },
  imageButtons: {
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
  footerButton: {
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
