import React from "react";
import { StyleSheet, Text, StyleProp, TextStyle, ViewStyle, View } from "react-native";
import { Card } from "react-native-paper";

interface AboutProps {
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

const About: React.FC<AboutProps> = () => {
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
    flex: 1,
    margin: 1,
  },
  textContainer: {
    flex: 0.4,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  text: {
    padding: 8,
    margin: 30,
    alignSelf: "center",
  },
});

export default About;
