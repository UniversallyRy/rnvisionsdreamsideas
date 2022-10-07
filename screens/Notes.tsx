import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import Header from "../shared/header";
import NoteContent from "../components/notes";
import { NoteStyles } from "./Styles";
// todo: draggable item, resort as well, opacity change, smoother transitions

const NoteScreen = () => {

  return (
    <Layout style={ styles.noteScreenContainer }>
      <Header name="Notes" />
      <NoteContent />
    </Layout>
  );

};

const styles = StyleSheet.create<NoteStyles>({
  noteScreenContainer: {
    flex: 1,
    fontFamily: "roboto-black",
  },
});

export default NoteScreen;
