import React, { useState } from "react";
import { View, Modal, Text, Dimensions, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Card, Surface } from "react-native-paper";
import AddJournalModal from "../components/journals/addJournalModal";
import JournalList from "../components/journals/journalList";
import JournalGridContainer from "../components/journals/journalGrid";
import { Icon } from "../shared/icon";

interface JournalProps {
  navigation: any;
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

const {height: windowHeight, width: windowWidth} = Dimensions.get("window");

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
        <View style={styles.visionAddToggle}>
          <Icon item="plus" onPress={() => setModalOpen(true)} />
          <Icon item="grid" onPress={() => toggleGrid()} />
        </View>
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
    width: windowWidth,
    flexDirection: "row",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
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
