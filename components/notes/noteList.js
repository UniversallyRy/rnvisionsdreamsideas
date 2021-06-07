import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import { connect } from "react-redux";
import NotesModal from "./notesModal";
import { coltsGray } from "../../styles/global";
import { deleteNote } from "../../redux/actions";

const NoteList = ({ notes, deleteNote }) => {
  const [visible, setVisible] = useState(false);
  const noteCount = Object.keys(notes).length;

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
        style={[styles.noteContainer, { backgroundColor: "green" }]}
        onPress={() => toggleListModal()}
      >
        <Text style={styles.noteTitle} numberOfLines={1}>
          List of Notes
        </Text>
        <View style={{ marginTop: "auto", alignItems: "center" }}>
          <Text style={styles.count}>{noteCount}</Text>
          <Text style={styles.subtitle}>Notes</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    padding: 32,
    flexDirection: "column",
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
    height: 345,
  },
  noteTitle: {
    alignSelf: "center",
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
