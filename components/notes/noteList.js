import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import { connect } from "react-redux";
import NotesModal from "./notesModal";
import { coltsGray } from "../../styles/global";
import { deleteNote } from "../../redux/actions";

export function NoteList({ notes, deleteNote }) {
  const [visible, setVisible] = useState(false);
  const toggleListModal = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => toggleListModal()}
      >
        <NotesModal notes={notes} closeModal={() => toggleListModal()} />
      </Modal>
      <TouchableOpacity
        // style={[styles.listContainer, { backgroundColor: notes.color }]}
        onPress={() => toggleListModal()}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          Notes
        </Text>
        <View></View>
      </TouchableOpacity>
      <Button
        style={styles.deleteButton}
        color={coltsGray}
        icon="close-outline"
        mode="contained"
        onPress={() => deleteNote(notes.id)}
      >
        Delete
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 16,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: "white",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  deleteButton: {
    margin: 2,
    width: 200,
    alignSelf: "center",
  },
});

const mapDispatchToProps = { deleteNote };

export default connect(null, mapDispatchToProps)(NoteList);
