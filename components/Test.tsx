import React from "react";
import { PURGE } from "redux-persist";
import { connect, ConnectedProps } from "react-redux";
import { Button } from "@ui-kitten/components";
import { IdeaType } from "../redux/reducers/ideas";

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

const mapStateToProps = (state: { notes: IdeaType[] }) => ({
  state: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
}); /* Map dispatch method to this.props.dispatch*/

export type PropsFromRedux = ConnectedProps<typeof Test>;
export default connect(mapStateToProps, mapDispatchToProps)(Test);
