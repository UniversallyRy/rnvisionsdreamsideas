import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/global";
import { connect } from "react-redux";
import ListMain from "../components/notes/listMain";

export function NoteScreen() {
  return (
    <View style={globalStyles.noteScreenContainer}>
      <ListMain />
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.notes,
  };
};

export default connect(mapStateToProps)(NoteScreen);
