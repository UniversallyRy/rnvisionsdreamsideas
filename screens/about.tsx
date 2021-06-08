import React from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { coltsGray, coltsBlue } from "../styles/global";

interface AboutProps {
  aboutContainer: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

interface Styles {
  aboutContainer: ViewStyle;
  text: TextStyle;
}

const aboutText: string =
  "This is an ongoing App based on charting any visions or dreams you may have. Notes tab for thoughts and todos.";

const About: React.FC<AboutProps> = () => {
  return (
    <View style={{ backgroundColor: coltsGray, flex: 1 }}>
      <Card style={styles.aboutContainer}>
        <Text style={styles.text}>
          {" "}
          {aboutText}{" "}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  text: {
    padding: 8,
    margin: 30,
    alignSelf: "center",
    color: coltsGray,
  },
  aboutContainer: {
    backgroundColor: coltsBlue,
    flex: 0.4,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});

export default About;
