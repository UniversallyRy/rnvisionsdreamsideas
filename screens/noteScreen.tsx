import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { connect } from "react-redux";
import { Layout } from "@ui-kitten/components";
import NoteMain from "../components/notes/notesMain";
import Header from "../shared/header";

interface NoteProps {
  stateNotes: object[];
  stateTodos: object[];
}

interface Styles {
  noteScreenContainer: ViewStyle;
}

const NoteScreen:React.FC<NoteProps> = ({ stateNotes, stateTodos }) => {
  return (
    <Layout style={styles.noteScreenContainer}>
      <Header name="Notes"/>
      <NoteMain stateNotes={stateNotes} stateTodos={stateTodos} />
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  noteScreenContainer: {
    flex: 1,
    fontFamily: "roboto-black",
  },
});
const mapStateToProps = (state:any) => {
  return {
    stateNotes: state.note,
    stateTodos: state.todos,
  };
};

export default connect(mapStateToProps)(NoteScreen);
