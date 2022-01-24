import React, { useState } from "react";
import { Modal, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Text } from "@ui-kitten/components";
import AddJournalModal from "../components/journals/addJournalModal";
import JournalList from "../components/journals/journalList";
import JournalGridContainer from "../components/journals/journalGrid";
import JournalFilter from "../components/journals/journalFilter";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { Icon } from "../shared/icon";
import Header from "../shared/header";
import { CloseButton } from "../shared/button";


interface JournalProps {
  navigation: NavigationScreenProp<string, object>;
  journalContainer: StyleProp<ViewStyle>;
  addJournalTitle: StyleProp<TextStyle>;
  closeModalContainer: StyleProp<ViewStyle>;
  visionAddToggle:StyleProp<ViewStyle>;
  modalContent:StyleProp<ViewStyle>;
}

interface Styles {
  journalContainer: ViewStyle;
  addJournalTitle: ViewStyle;
  visionAddToggle: ViewStyle;
  modalContent: ViewStyle;
  closeModalContainer: ViewStyle;
}

const JournalScreen: React.FC<JournalProps>= ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [gridView, setGridView] = useState(true);

  const toggleGrid = () => {
    setGridView(!gridView);
  };

  return (
      <SafeAreaView style={styles.journalContainer}>
        <Header name="Journals"/>
        <Modal
          style={styles.journalContainer}
          visible={modalOpen}
          onDismiss={() => setModalOpen(false)}
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
        <Layout style={styles.visionAddToggle}>
          <Icon item="plus" onPress={() => setModalOpen(true)} />
          <Icon item="grid" onPress={() => toggleGrid()} />
        </Layout>
      </SafeAreaView>
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
    paddingTop: 1,
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
