import React, { useState, memo } from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
} from "react-native";
import { Text, Modal, Portal, Provider } from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import AddJournalModal from "../components/journals/addJournalModal";
import JournalList from "../components/journals/journalList";
import { coltsBlue, globalStyles } from "../styles/global";
import JournalGridContainer from "../components/journals/journalGrid";
import Icon from "../shared/icon";

interface JournalProps {
  navigation: NavigationStackProp;
  journalContainer: StyleProp<ViewStyle>;
  addJournalContainer: StyleProp<ViewStyle>;
  addJournalTitle: StyleProp<TextStyle>;
  closeModalContainer: StyleProp<ViewStyle>;
  modalClose: StyleProp<ViewStyle>;
  visionAddToggle:StyleProp<ViewStyle>;
  coltsBlue: StyleProp<TextStyle>;
}

interface Styles {
  journalContainer: ViewStyle;
}

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
            contentContainerStyle={globalStyles.addJournalContainer}
          >
            <Text style={globalStyles.addJournalTitle}>Add A Journal Entry</Text>
            <AddJournalModal setModalOpen={setModalOpen} />
            <View style={globalStyles.closeModalContainer}>
              <Icon
                item="close"
                style={{ ...globalStyles.modalClose }}
                onPress={() => setModalOpen(false)}
              />
            </View>
          </Modal>
        </Portal>
        {gridView ? (
          <JournalGridContainer navigation={navigation} />
        ) : (
          <JournalList navigation={navigation} />
        )}
        <View style={globalStyles.visionAddToggle}>
          <Icon item="plus" onPress={() => setModalOpen(true)} />
          <Icon item="grid" onPress={() => toggleGrid()} />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create<Styles>({
  journalContainer:{
    flex: 1, 
    backgroundColor: coltsBlue 
  },
});

export default JournalScreen;