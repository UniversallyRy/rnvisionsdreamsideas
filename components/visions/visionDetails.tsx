import React from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle, ImageStyle, Dimensions } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Button, Text, Card } from "react-native-paper";

interface VisionProps {
  navigation: NavigationStackProp;
  vDetailsContent: StyleProp<ViewStyle>;
  visionTitle: StyleProp<TextStyle>;
  vDetailsImage: StyleProp<ImageStyle>;
  vDetailsButton: StyleProp<ViewStyle>;
}

interface Styles {
  vDetailsContent: ViewStyle;
  visionTitle: TextStyle;
  vDetailsImage: ImageStyle;
  vDetailsButton: ViewStyle;
}

const {width: windowWidth, height: windowHeight } = Dimensions.get("window");

const VisionDetails: React.FC<VisionProps> = ({ navigation }) => {
  const handlePress = () => {
    navigation.goBack();
  };
  const imageUri = navigation.getParam("uri");

  return (
    <Card elevation={7} style={styles.vDetailsContent}>
      <Card.Content>
        <Text style={styles.visionTitle}>
          {" "}
          {navigation.getParam("title")}{" "}
        </Text>
        <Card.Cover source={{ uri: imageUri }} style={styles.vDetailsImage} />
        <Button
          style={styles.vDetailsButton}
          icon="arrow-left"
          mode="contained"
          accessibilityLabel={"Back to All Visions"}
          onPress={handlePress}
        >
          Go Back
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  vDetailsContent: {
    flexDirection: "row",
    flex: 1,
  },
  visionTitle: {
    fontFamily: "roboto-black",
    alignSelf: "center",
    fontSize: 22,
    marginBottom: 10,
  },
  vDetailsImage: {
    resizeMode: "contain",
    borderRadius: 4,
    alignSelf: "center",
    height: windowHeight * 0.65,
    width: windowWidth * 0.97,
    margin: 5,
  },
  vDetailsButton: {
    fontSize: 40,
    fontFamily: "roboto-bold",
    alignSelf: "center",
    width: windowWidth * 0.97,
    elevation: 1,
  },
});

export default VisionDetails;
