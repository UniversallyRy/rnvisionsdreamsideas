import React, { useContext } from "react";
import { GestureResponderEvent, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button, Layout, Text, TopNavigationAction } from "@ui-kitten/components"
import { BackIcon, CloseIcon, DayIcon, GridIcon, NightIcon, SubmitIcon } from "./icon";

type ButtonProps = {
  text?: string;
  onPress: () => void;
}

interface Styles {
  button: ViewStyle;
  buttonText: TextStyle;
  submit: ViewStyle;
  toggle: ViewStyle;
  footerContainer: ViewStyle;
  footerButton: ViewStyle;
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

//
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
            <SubmitButton onPress={() => toggleNoteModal()} style={styles.footerButton}/>
            <SubmitButton onPress={() => toggleTodoModal()} style={styles.footerButton}/>
          </>
        }
      </Layout>
  )
}


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
    borderRadius: 20,
  }
});

export default KittenButton;
