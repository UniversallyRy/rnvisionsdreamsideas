import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Text, Modal } from "@ui-kitten/components";
import AddJournalModal from "../components/journals/addJournalModal";
import JournalList from "../components/journals/journalList";
import JournalGridContainer from "../components/journals/journalGrid";
import JournalFilter from "../components/journals/journalFilter";
import { windowHeight, windowWidth } from "../utils/dimensions";
import Header from "../shared/header";
import { CloseButton } from "../shared/button";
import FooterButtons from "../components/journals/FooterButtons";

interface JournalProps {
  navigation: NavigationScreenProp<string, object>;
  journalContainer: StyleProp<ViewStyle>;
  addJournalTitle: StyleProp<TextStyle>;
  closeModalContainer: StyleProp<ViewStyle>;
  visionAddToggle:StyleProp<ViewStyle>;
  modalContent:StyleProp<ViewStyle>;
}

type ContextProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
  toggleView: () => void;
}
interface Styles {
  journalContainer: ViewStyle;
  addJournalTitle: ViewStyle;
  visionAddToggle: ViewStyle;
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
      <Layout style={styles.journalContainer}>
        <Header name="Journals"/>
        <Modal
          style={{backgroundColor: "white",...styles.journalContainer}}
          visible={modalOpen}
        >
          <Text style={styles.addJournalTitle}>Add A Journal Entry</Text>
          <AddJournalModal setModalOpen={setModalOpen} />
          <CloseButton
            style={{position: "absolute", left: windowWidth * 0.45, bottom: 0}}
            accessibilityLabel={"Closes Modal"}
            onPress={() => setModalOpen(false)}
          />
        </Modal>
        <JournalFilter/>
        
        {gridView ? (
          <JournalGridContainer navigation={navigation} />
        ) : (
          <JournalList navigation={navigation} />
        )}
        <JournalContext.Provider value={{ setModalOpen, toggleView }}>
          <Layout style={styles.visionAddToggle}>
          <FooterButtons/>
          </Layout>
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
  visionAddToggle: {
    flexDirection: "row",
    marginTop: "auto",
    justifyContent: "center",
    backgroundColor: 'transparent',
  },
  modalContent: {
    height: windowHeight,
  },
  closeModalContainer: {
    flex: 1,
  },
});

export default JournalScreen;
