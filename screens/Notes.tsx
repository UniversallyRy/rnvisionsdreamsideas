import React, { useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Layout } from "@ui-kitten/components";
import Header from "../shared/header";
import NoteContent from "../components/notes";
import { FooterButtons } from "../shared/buttons";
// todo: draggable
interface Styles {
  noteScreenContainer: ViewStyle;
}

const NoteScreen = () => {
  return (
    <Layout style={ styles.noteScreenContainer }>
      <Header name="Notes" />
      <NoteContent />
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  noteScreenContainer: {
    flex: 1,
    fontFamily: "roboto-black",
  },
});

export default NoteScreen;
