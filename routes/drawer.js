import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import VisionStack from "./visionStack";
import AboutStack from "./aboutStack";
import NoteStack from "./noteStack";
import JournalStack from "./journalStack";
import { coltsGray, coltsBlue } from "../styles/global";

// creates a navigation bar from react-navigation-stack imports
const RootDrawerNavigator = createDrawerNavigator(
  {
    Visions: {
      screen: VisionStack,
    },
    Journals: {
      screen: JournalStack,
    },
    Notes: {
      screen: NoteStack,
    },
    About: {
      screen: AboutStack,
    },
  },
  {
    headerMode: "screen",
    drawerType: "front",
    drawerWidth: 150,
    drawerBackgroundColor: coltsGray,
    contentOptions: {
      // stack screens container styling
      activeTintColor: coltsBlue,
      inactiveTintColor: "black",
      itemsContainerStyle: {
        marginVertical: 10,
      },
      //single stack screen styling
      itemStyle: {
        marginHorizontal: 1,
        marginVertical: 50,
        alignSelf: "center",
      },
    },
  }
);

export default createAppContainer(RootDrawerNavigator);
