import React from "react";
import {
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { globalStyles } from "../styles/global";
import { connect } from "react-redux";
import NoteMain from "../components/notes/notesMain";
import { StateType, ActionType } from 'typesafe-actions';

interface NoteProps {
  noteScreenContainer?: StyleProp<ViewStyle>;
  stateNotes: any;
  stateTodos: any;
}

const NoteScreen:React.FC<NoteProps> = ({ stateNotes, stateTodos }) => {
  return (
    <View style={globalStyles.noteScreenContainer}>
      <NoteMain stateNotes={stateNotes} stateTodos={stateTodos} />
    </View>
  );
};

const mapStateToProps = (state:any) => {
  return {
    stateNotes: state.note,
    stateTodos: state.todos,
  };
};

export default connect(mapStateToProps)(NoteScreen);
