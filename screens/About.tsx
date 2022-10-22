import React from "react";
import { StyleSheet } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import { AboutStyles } from "./Styles";
// style about
const aboutText: string =
  "This is an ongoing App based on charting any visions or dreams you may have. Notes tab for thoughts and todos.";

const About: React.FunctionComponent = (): JSX.Element => (
  <Layout style={styles.aboutContainer}>
    <Card style={styles.textContainer}>
      <Text style={styles.text}>
        {aboutText}
      </Text>
    </Card>
  </Layout>
);

const styles = StyleSheet.create<AboutStyles>({
  aboutContainer: {
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
