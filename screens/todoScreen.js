import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/global";
import { connect } from "react-redux";
import ListMain from "../components/todos/listMain";

export function TodoScreen() {
  return (
    <View style={globalStyles.todoScreenContainer}>
      <ListMain />
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  };
};

export default connect(mapStateToProps)(TodoScreen);
