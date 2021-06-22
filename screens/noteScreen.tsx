import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Card } from "react-native-paper";
import { connect } from "react-redux";
import NoteMain from "../components/notes/notesMain";

interface NoteProps {
  stateNotes: object[];
  stateTodos: object[];
  noteScreenContainer?: StyleProp<ViewStyle>;
}

interface Styles {
  noteScreenContainer: ViewStyle;
}

const NoteScreen:React.FC<NoteProps> = ({ stateNotes, stateTodos }) => {
  return (
    <Card style={styles.noteScreenContainer}>
      <NoteMain stateNotes={stateNotes} stateTodos={stateTodos} />
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  noteScreenContainer: {
    fontFamily: "roboto-black",
    flex: 1,
  },
});
const mapStateToProps = (state:any) => {
  return {
    stateNotes: state.note,
    stateTodos: state.todos,
  };
};

export default connect(mapStateToProps)(NoteScreen);
