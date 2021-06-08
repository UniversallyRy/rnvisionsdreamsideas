import React from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { coltsGray, coltsBlue } from "../styles/global";

interface StyleProps {
  aboutContainer: StyleProp<ViewStyle>;
  textContainer: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

interface Styles {
  textContainer: ViewStyle;
  aboutContainer: ViewStyle;
  text: TextStyle;
}

const aboutText: string =
  "This is an ongoing App based on charting any visions or dreams you may have. Notes tab for thoughts and todos.";

const About: React.FC<StyleProps> = () => {
  return (
    <View style={styles.aboutContainer}>
      <Card style={styles.textContainer}>
        <Text style={styles.text}>
          {" "}
          {aboutText}{" "}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  aboutContainer:{
    backgroundColor: coltsGray, 
    flex: 1
  },
  textContainer: {
    backgroundColor: coltsBlue,
    flex: 0.4,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  text: {
    padding: 8,
    margin: 30,
    alignSelf: "center",
    color: coltsGray,
  },
});

export default About;
