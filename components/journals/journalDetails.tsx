import React, { FunctionComponent } from "react";
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Card, Button } from "react-native-paper";

type JournalDProps = {
  navigation: any;
  route: any,
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

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const JournalDetails: FunctionComponent<JournalDProps> = ({ route, navigation }) => {
  const handlePress = () => {
    navigation.goBack();
  };

  const { title, body, date } = route.params;

  return (
    <Card style={styles.jDetailsContainer}>
      <Card.Content style={styles.jDetailsCard}>
        <Text style={styles.jDetailsTitle}>
          {" "}
          {title}{" "}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.jDetailsText}>
          {" "}
          {body}{" "}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.jDetailsDate}>
          {" "}
          {date}{" "}
        </Text>
        <Button
          style={styles.jDetailsButton}
          icon="arrow-left"
          mode="contained"
          dark={true}
          accessibilityLabel={"Back to Journals"}
          onPress={handlePress}
        >
          Go Back
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
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
  jDetailsContainer: {
    flexDirection: "row",
    width: windowWidth,
    height: windowHeight,
    alignContent: "center",
    justifyContent: "center",
  },
  jDetailsCard: {
    alignSelf: "center",
    margin: 10,
    width: windowWidth * 0.99,
  },
});

export default JournalDetails;
