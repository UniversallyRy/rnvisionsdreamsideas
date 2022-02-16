import React from "react";
import { PURGE } from "redux-persist";
import { connect } from "react-redux";
import { Button } from "@ui-kitten/components";

// Generate <TestComponent /> with a button that will purge the persisted store
const Test = (state) => {
  const onPurgeStoredState = (e) => {
    e.PreventDefault();

    const { dispatch } = state; // Grab a ref to the mapped dispatch method

    // Create and dispatch the action which will cause redux-persist to purge
    dispatch({
      type: PURGE,
      key: "notes", // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
      result: () => null, // Func expected on the submitted action.
    });
  };
  return <Button onPress={() => onPurgeStoredState(state)}></Button>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.notes,
  };
};

function mapDispatchToProps(dispatch) {
  return { dispatch }; // Map dispatch method to this.props.dispatch
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);

export type PropsFromRedux = ConnectedProps<typeof Test>;
