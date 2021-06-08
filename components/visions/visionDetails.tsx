import React from "react";
import { Image, StyleProp, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Button, Text, Card } from "react-native-paper";
import { globalStyles } from "../../styles/global";

interface VisionProps {
  navigation: NavigationStackProp;
  vDetailsContent: StyleProp<ViewStyle>;
  journalTitle: StyleProp<TextStyle>;
  vDetailsImage: StyleProp<ImageStyle>;
  jDetailsButton: StyleProp<ViewStyle>;
}

const VisionDetails: React.FC<VisionProps> = ({ navigation }) => {
  const handlePress = () => {
    navigation.goBack();
  };
  const imageUri = navigation.getParam("uri");

  return (
    <Card style={globalStyles.vDetailsContent}>
      <Card.Content>
        <Text style={globalStyles.journalTitle}>
          {" "}
          {navigation.getParam("title")}{" "}
        </Text>
        <Image source={{ uri: imageUri }} style={globalStyles.vDetailsImage} />
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

export default VisionDetails;
