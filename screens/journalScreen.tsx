import React, { useState } from "react";
import { View, Modal, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Card, Surface } from "react-native-paper";
import { NavigationScreenProp } from 'react-navigation';
import AddJournalModal from "../components/journals/addJournalModal";
import JournalList from "../components/journals/journalList";
import JournalGridContainer from "../components/journals/journalGrid";
import JournalFilter from "../components/journals/journalFilter";
import { Icon } from "../shared/icon";
import { windowHeight, windowWidth } from "../utils/dimensions";


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
      <Card style={styles.journalContainer}>
            <Modal
              visible={modalOpen}
              onDismiss={() => setModalOpen(false)}
            >
                <Text style={styles.addJournalTitle}>Add A Journal Entry</Text>
                <AddJournalModal setModalOpen={setModalOpen} />
                <Surface style={styles.closeModalContainer}>
                  <Icon
                    item="close"
                    onPress={() => setModalOpen(false)}
                  />
                </Surface>
            </Modal>
            <JournalFilter/>
          {gridView ? (
            <JournalGridContainer navigation={navigation} />
          ) : (
            <JournalList navigation={navigation} />
          )}
          <View style={styles.visionAddToggle}>
            <Icon item="plus" onPress={() => setModalOpen(true)} />
            <Icon item="grid" onPress={() => toggleGrid()} />
          </View>
      </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  journalContainer:{
    width: windowWidth,
    height: windowHeight,
    flex: 1,
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
    justifyContent: "flex-end",
  },
});

export default JournalScreen;
