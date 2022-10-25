import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export interface AboutStyles {
  textContainer: ViewStyle;
  aboutContainer: ViewStyle;
  text: TextStyle;
}

export interface VisionStyles {
    container: ViewStyle;
}

export interface VDetailsStyles {
    container: ViewStyle;
    card: ViewStyle;
    img: ImageStyle;
    title: TextStyle;
}
export interface JDetailsStyles {
    container: ViewStyle;
    card: ViewStyle;
    textTitle: TextStyle;
    textBody: TextStyle;
    textDate: TextStyle;
}

export interface JournalStyles {
    screen: ViewStyle;
    title: TextStyle;
    close: ViewStyle;
}

export interface NoteStyles {
    noteScreenContainer: ViewStyle;
}
