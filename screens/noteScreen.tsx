import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/global";
import { connect } from "react-redux";
import NoteMain from "../components/notes/notesMain";

const NoteScreen = ({ stateNotes, stateTodos }) => {
  return (
    <View style={globalStyles.noteScreenContainer}>
      <NoteMain stateNotes={stateNotes} stateTodos={stateTodos} />
    </View>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stateNotes: state.note,
    stateTodos: state.todos,
  };
};

export default connect(mapStateToProps)(NoteScreen);
