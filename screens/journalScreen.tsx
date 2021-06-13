import React, { useState } from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Dimensions,
  View,
} from "react-native";
import { Text, Modal, Portal, Provider } from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import AddJournalModal from "../components/journals/addJournalModal";
import JournalList from "../components/journals/journalList";
import JournalGridContainer from "../components/journals/journalGrid";
import { Icon } from "../shared/icon";

interface JournalProps {
  navigation: NavigationStackProp;
  journalContainer: StyleProp<ViewStyle>;
  addJournalContainer: StyleProp<ViewStyle>;
  addJournalTitle: StyleProp<TextStyle>;
  closeModalContainer: StyleProp<ViewStyle>;
  visionAddToggle:StyleProp<ViewStyle>;
  modalContent:StyleProp<ViewStyle>;
}

interface Styles {
  journalContainer: ViewStyle;
  addJournalContainer: ViewStyle;
  addJournalTitle: ViewStyle;
  visionAddToggle: ViewStyle;
  modalContent: ViewStyle;
  closeModalContainer: ViewStyle;
}

const {height: windowHeight } = Dimensions.get("window");

const JournalScreen: React.FC<JournalProps>= ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [gridView, setGridView] = useState(true);

  const toggleGrid = () => {
    setGridView(!gridView);
  };

  return (
    <Provider>
      <View style={styles.journalContainer}>
        <Portal>
          <Modal
            visible={modalOpen}
            onDismiss={() => setModalOpen(false)}
            contentContainerStyle={styles.addJournalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.addJournalTitle}>Add A Journal Entry</Text>
              <AddJournalModal setModalOpen={setModalOpen} />
              <View style={styles.closeModalContainer}>
                <Icon
                  item="close"
                  onPress={() => setModalOpen(false)}
                />
              </View>
            </View>
          </Modal>
        </Portal>
        {gridView ? (
          <JournalGridContainer navigation={navigation} />
        ) : (
          <JournalList navigation={navigation} />
        )}
        <View style={styles.visionAddToggle}>
          <Icon item="plus" onPress={() => setModalOpen(true)} />
          <Icon item="grid" onPress={() => toggleGrid()} />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create<Styles>({
  journalContainer:{
    fontFamily: "roboto-black",
    flex: 1,
  },
  addJournalTitle: {
    alignSelf: "center",
    padding: 20,
    fontSize: 18,
    borderRadius: 2,
  },
  addJournalContainer: {
    flex: 1,
    backgroundColor:"white",
    height: windowHeight,
    fontFamily: "roboto-black",
  },
  visionAddToggle: {
    alignSelf: "center",
    flexDirection: "row",
  },
  modalContent: {
    flex: 1,
    height: windowHeight,
  },
  closeModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default JournalScreen;
