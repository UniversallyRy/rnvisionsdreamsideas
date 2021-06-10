import { StyleSheet, Dimensions } from "react-native";

export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const coltsBlue = "#002C5F";
export const coltsGray = "#A2AAAD";
export const raidSilver = "#A5ACAF";

export const globalStyles = StyleSheet.create({
  // Note Styles
  addNoteForm: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textInput: {
    width: 100,
    height: 100,
  },
  todoErrorText: {
    width: windowWidth * 0.75,
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
  addNoteButton: {
    padding: 16,
    width: windowWidth * 0.2,
    borderRadius: 2,
    borderColor: "black",
    backgroundColor: "#A2AAAD",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 7.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  addNoteButtonText: {
    color: "#002C5F",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  noteList: {
    color: coltsGray,
  },
  noteCard: {
    alignItems: "center",
    width: windowWidth * 0.99,
    borderRadius: 3,
    elevation: 5,
    padding: 15,
    backgroundColor: coltsBlue,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 0,
    marginVertical: 6,
  },
  noteText: {
    color: coltsGray,
    fontFamily: "roboto-black",
    padding: 5,
  },
  noteCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.4,
  },
  noteContainer: {
    padding: 10,
    alignItems: "center",
  },
  tDetailsButton: {
    backgroundColor: coltsGray,
    margin: 20,
  },
  tDetailsContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    height: windowHeight,
    backgroundColor: coltsGray,
  },
  noteDetails: {
    flex: 0.4,
    alignContent: "center",
    fontSize: 20,
    height: windowHeight * 0.3,
    width: windowWidth * 0.97,
    alignSelf: "center",
    fontWeight: "bold",
    backgroundColor: coltsBlue,
  },
  noteButtons: {
    alignContent: "center",
    flexDirection: "row",
    margin: 10,
    fontSize: 30,
  },
  navbar: {
    fontSize: 40,
  },
  errorText: {
    fontFamily: "roboto-bold",
    color: "crimson",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
