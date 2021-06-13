import { StyleSheet, TextStyle, Dimensions } from "react-native";

interface Styles {
  errorText: TextStyle;
}

export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const coltsBlue = "#002C5F";
export const coltsGray = "#A2AAAD";
export const raidSilver = "#A5ACAF";

export const globalStyles = StyleSheet.create<Styles>({
  errorText: {
    fontFamily: "roboto-bold",
    color: "crimson",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
