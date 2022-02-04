import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Text, Modal } from "@ui-kitten/components";
import Header from "../shared/header";
import JournalList from "../components/journals/journalList";
import JournalGridContainer from "../components/journals/journalGrid";
import AddJournalModal from "../components/journals/addJournalModal";
import JournalFilter from "../components/journals/journalFilter";
import { CloseButton, FooterButtons } from "../shared/buttons";
import { windowHeight, windowWidth } from "../utils/dimensions";
// todo: add swipe to delete
interface JournalProps {
  navigation: NavigationScreenProp<string, object>;
}

type ContextProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
  toggleView: () => void;
}
interface Styles {
  journalContainer: ViewStyle;
  addJournalTitle: TextStyle;
  modalContent: ViewStyle;
  closeModalContainer: ViewStyle;
}

export const JournalContext = createContext<ContextProps>({setModalOpen: () => {}, toggleView: () => {}});

const JournalScreen: React.FC<JournalProps>= ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [gridView, setGridView] = useState(true);

  const toggleView = () => {
    setGridView(!gridView);
  };

  return (
    <Layout style={ styles.journalContainer }>
      <Header name={ "Journals" }/>
      <Modal
        style={{ backgroundColor: "white",...styles.journalContainer }}
        visible={ modalOpen }
      >
        <Text style={ styles.addJournalTitle }>Add A Journal Entry</Text>
        <AddJournalModal setModalOpen={ setModalOpen } />
        <CloseButton
          style={{ position: "absolute", left: windowWidth * 0.45, bottom: 0 }}
          accessibilityLabel={ "Closes Modal" }
          onPress={ () => setModalOpen(false) }
        />
      </Modal>
      <JournalFilter/>
      
      {gridView ? (
        <JournalGridContainer navigation={navigation} />
      ) : (
        <JournalList navigation={navigation} />
      )}
      
      <JournalContext.Provider value={{ setModalOpen, toggleView }}>
        <FooterButtons context={ JournalContext }/>
      </JournalContext.Provider>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  journalContainer:{
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    fontFamily: "roboto-black",
  },
  addJournalTitle: {
    alignSelf: "center",
    padding: 20,
    fontSize: 18,
    borderRadius: 2,
  },
  modalContent: {
    height: windowHeight,
  },
  closeModalContainer: {
    flex: 1,
  },
});

export default JournalScreen;
