import React, { FunctionComponent } from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from 'react-navigation';
import { Card, Layout, Text } from "@ui-kitten/components";
import Header from "../../shared/header";
import { windowHeight, windowWidth } from "../../utils/dimensions";

export type JournalDProps = {
  navigation: NavigationScreenProp<string, object>;
  route: any;
  jDetailsContainer: StyleProp<ViewStyle>;
  jDetailsCard: StyleProp<ViewStyle>;
  jDetailsTitle: StyleProp<ViewStyle>;
  divider: StyleProp<ViewStyle>;
  jDetailsText: StyleProp<TextStyle>;
  jDetailsDate: StyleProp<TextStyle>;
  jDetailsButton: StyleProp<TextStyle>;
}

interface Styles {
  divider: ViewStyle;
  jDetailsContainer: ViewStyle;
  jDetailsCard: ViewStyle;
  jDetailsTitle: ViewStyle;
  jDetailsText: TextStyle;
  jDetailsDate: TextStyle;
  jDetailsButton: TextStyle;
}

const JournalDetails: FunctionComponent<JournalDProps> = ({ route, navigation }) => {

  const { title, body, date } = route.params;

  return (
    <SafeAreaView style={styles.jDetailsContainer}>
      <Header name="Vision Details" navigation={navigation}/>
      <Card style={styles.jDetailsCard}>
        <Text style={styles.jDetailsTitle}>
          {" "}
          {title}{" "}
        </Text>
        <Layout style={styles.divider} />
        <Text style={styles.jDetailsText}>
          {" "}
          {body}{" "}
        </Text>
        <Layout style={styles.divider} />
        <Text style={styles.jDetailsDate}>
          {" "}
          {date}{" "}
        </Text>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  jDetailsContainer: {
    flexDirection: "column",
    width: windowWidth,
    height: windowHeight,
    alignContent: "center",
  },
  divider: {
    backgroundColor: "gray",
    alignSelf: "center",
    height: 0.3,
    width: windowWidth * 0.98,
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.7,
  },
  jDetailsText: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    padding: 7,
    marginTop: 50,
    marginVertical: 18,
    lineHeight: 20,
  },
  jDetailsTitle: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    padding: 10,
  },
  jDetailsDate: {
    fontFamily: "roboto-italic",
    fontSize: 10,
    padding: 10,
  },
  jDetailsButton: {
    fontSize: 40,
    fontFamily: "roboto-black",
  },
  jDetailsCard: {
    alignSelf: "center",
    margin: 10,
    width: windowWidth * 0.99,
    height: windowHeight * 0.5
  },
});

export default JournalDetails;
