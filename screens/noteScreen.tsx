import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
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
    <View style={styles.noteScreenContainer}>
      <NoteMain stateNotes={stateNotes} stateTodos={stateTodos} />
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  noteScreenContainer: {
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
