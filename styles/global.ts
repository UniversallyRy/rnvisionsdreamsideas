import { StyleSheet, Dimensions } from "react-native";

export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const coltsBlue = "#002C5F";
export const coltsGray = "#A2AAAD";
export const raidSilver = "#A5ACAF";

export const globalStyles = StyleSheet.create({
  // Vision Styles
  slideContainer: {
    width: windowWidth,
    height: windowHeight * 0.88,
    backgroundColor: "transparent",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  slideCarousel: {
    width: windowWidth,
    flex: 1,
  },
  slideImage: {
    width: windowWidth * 0.98,
    height: windowHeight * 0.6,
  },
  slideTitle: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 32,
    marginBottom: 20,
    marginTop: 20,
  },
  pagination: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    marginTop: 10,
  },
  // Journal Styles

  journalBorder: {
    margin: 10,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: coltsGray,
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowRadius: 350,
    shadowOffset: {
      width: 4,
      height: 3,
    },
    width: windowWidth * 0.92,
  },
  journalCard: {
    backgroundColor: "#000",
    alignSelf: "center",
    width: windowWidth * 0.92,
    marginBottom: 1,
    borderRadius: 7,
  },
  journalTitle: {
    fontFamily: "roboto-black",
    fontSize: 20,
    marginBottom: 10,
  },
  journalText: {
    fontFamily: "roboto-regular",
    fontSize: 12,
  },
  journalDate: {
    fontFamily: "roboto-italic",
    fontSize: 10,
    marginTop: 35,
    margin: 5,
    color: coltsGray,
  },
  addJournalForm: {
    margin: 15,
  },
  jDetailsText: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    padding: 7,
    marginTop: 50,
    marginVertical: 18,
    lineHeight: 20,
    color: coltsGray,
  },
  jDetailsTitle: {
    fontFamily: "roboto-black",
    fontSize: 18,
    color: raidSilver,
    padding: 10,
  },
  jDetailsDate: {
    fontFamily: "roboto-italic",
    fontSize: 10,
    color: raidSilver,
    padding: 10,
  },
  jDetailsButton: {
    fontSize: 40,
    fontFamily: "roboto-black",
    backgroundColor: coltsGray,
    shadowColor: coltsBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
  },
  jDetailsContainer: {
    flexDirection: "row",
    width: windowWidth,
    height: windowHeight,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: coltsGray,
  },
  jDetailsCard: {
    alignSelf: "center",
    margin: 10,
    backgroundColor: coltsBlue,
    width: windowWidth * 0.99,
  },
  // Note Styles

  noteScreenContainer: {
    flex: 1,
    backgroundColor: coltsBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  noteListContainer: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: coltsGray,
  },
  addNoteForm: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  noteInput: {
    width: windowWidth * 0.75,
    paddingLeft: 14,
    paddingTop: 32,
    paddingRight: 14,
    paddingBottom: 16,
    marginLeft: 4,
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
