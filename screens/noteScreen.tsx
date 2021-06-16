import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Surface } from "react-native-paper";
import { connect } from "react-redux";
import NoteMain from "../components/notes/notesMain";

interface NoteProps {
  noteScreenContainer?: StyleProp<ViewStyle>;
  stateNotes: any;
  stateTodos: any;
}

interface Styles {
  noteScreenContainer: ViewStyle;
}

const NoteScreen:React.FC<NoteProps> = ({ stateNotes, stateTodos }) => {
  return (
    <Surface style={styles.noteScreenContainer}>
      <NoteMain stateNotes={stateNotes} stateTodos={stateTodos} />
    </Surface>
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
