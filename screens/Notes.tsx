import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Layout } from "@ui-kitten/components";
import Header from "../shared/header";
import Container from "../components/notes";
// todo: draggable
interface Styles {
  noteScreenContainer: ViewStyle;
}

const NoteScreen = () => {
  return (
    <Layout style={ styles.noteScreenContainer }>
      <Header name="Notes" />
      <Container />
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
