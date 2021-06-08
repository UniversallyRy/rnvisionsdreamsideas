import React from "react";
import { View, StyleSheet, StyleProp, TextStyle, ViewStyle, } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Button, Text, Card } from "react-native-paper";
import { globalStyles, coltsGray, windowWidth } from "../../styles/global";

interface JournalDProps {
  navigation: NavigationStackProp;
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
}

const JournalDetails: React.FC<JournalDProps> = ({ navigation }) => {
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Card style={globalStyles.jDetailsContainer}>
      <Card.Content style={globalStyles.jDetailsCard}>
        <Text style={globalStyles.jDetailsTitle}>
          {" "}
          {navigation.getParam("title")}{" "}
        </Text>
        <View style={styles.divider} />
        <Text style={globalStyles.jDetailsText}>
          {" "}
          {navigation.getParam("body")}{" "}
        </Text>
        <View style={styles.divider} />
        <Text style={globalStyles.jDetailsDate}>
          {" "}
          {navigation.getParam("date")}{" "}
        </Text>
        <Button
          style={globalStyles.jDetailsButton}
          icon="arrow-left"
          mode="contained"
          dark={true}
          accessibilityLabel={"back to home"}
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
    backgroundColor: coltsGray,
    alignSelf: "center",
    height: 0.3,
    width: windowWidth * 0.98,
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.7,
  },
});

export default JournalDetails;
