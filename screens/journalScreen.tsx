import React, { useState } from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Dimensions,
  Modal
} from "react-native";
import { Card, Surface, Text } from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import AddJournalModal from "../components/journals/addJournalModal";
import JournalList from "../components/journals/journalList";
import JournalGridContainer from "../components/journals/journalGrid";
import { Icon } from "../shared/icon";

interface JournalProps {
  navigation: NavigationStackProp;
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

const {height: windowHeight } = Dimensions.get("window");

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
        {gridView ? (
          <JournalGridContainer navigation={navigation} />
        ) : (
          <JournalList navigation={navigation} />
        )}
        <Surface style={styles.visionAddToggle}>
          <Icon item="plus" onPress={() => setModalOpen(true)} />
          <Icon item="grid" onPress={() => toggleGrid()} />
        </Surface>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  journalContainer:{
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
    alignSelf: "center",
    marginTop: "auto",
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
