import { StyleSheet, TextStyle } from "react-native";

interface Styles {
  errorText: TextStyle;
}
//global stylesheet, may want to move more styles to this file
export const globalStyles = StyleSheet.create<Styles>({
  errorText: {
    fontFamily: "roboto-bold",
    color: "crimson",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
