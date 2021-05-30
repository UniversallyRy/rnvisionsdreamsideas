import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/global";
import { connect } from "react-redux";
import NoteMain from "../components/notes/notesMain";

export function NoteScreen() {
  return (
    <View style={globalStyles.noteScreenContainer}>
      <NoteMain />
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.notes,
  };
};

export default connect(mapStateToProps)(NoteScreen);
