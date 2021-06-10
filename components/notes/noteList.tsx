import React, { useState } from "react";
import { Modal, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";
import NotesModal from "./notesModal";

interface NoteListProps {
  notes: object;
  deleteNote: ((item: object) => void);
  noteContainer: StyleProp<ViewStyle>;
  noteTitle: StyleProp<TextStyle>;
  count: StyleProp<TextStyle>;
  subtitle: StyleProp<ViewStyle>;
}

interface Styles {
  noteContainer: ViewStyle;
  noteTitle: TextStyle;
  count: TextStyle;
  subtitle: ViewStyle;
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const [visible, setVisible] = useState(false);
  const noteCount = Object.keys(notes).length;

  const toggleListModal = () => {
    setVisible(!visible);
  };

  return (
    <Card style={[styles.noteContainer, { backgroundColor: "green" }]} onPress={() => toggleListModal()}>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => toggleListModal()}
      >
        <NotesModal notes={notes} closeModal={() => toggleListModal()} />
      </Modal>
        <Text style={styles.noteTitle} numberOfLines={1}>
          List of Notes
        </Text>
        <Card.Content style={{ alignItems: "center", bottom: 0}}>
          <Text style={styles.count}>{noteCount}</Text>
          <Text style={styles.subtitle}>Notes</Text>
        </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  noteContainer: {
    padding: 32,
    flexDirection: "column",
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
    height: 280,
  },
  noteTitle: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  count: {
    marginTop: 40,
    fontSize: 48,
    fontWeight: "200",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
  },
});

export default NoteList;
