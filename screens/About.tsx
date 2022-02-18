import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";

interface Styles {
  textContainer: ViewStyle;
  aboutContainer: ViewStyle;
  text: TextStyle;
}

const aboutText: string =
  "This is an ongoing App based on charting any visions or dreams you may have. Notes tab for thoughts and todos.";

const About = () => {
  return (
    <Layout style={ styles.aboutContainer }>
      <Card style={ styles.textContainer }>
        <Text style={ styles.text }>
          { " " }
          { aboutText }{ " " }
        </Text>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  aboutContainer:{
    flex: 1,
    margin: 1,
    alignItems: "center",
  },
  textContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    elevation: 2,
  },
  text: {
    alignSelf: "center",
    padding: 8,
    margin: 30,
  },
});

export default About;
