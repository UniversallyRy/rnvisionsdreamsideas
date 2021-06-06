import React from "react";
import { Image } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { globalStyles } from "../../styles/global";

const VisionDetails = ({ navigation }) => {
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
          title={"back to home"}
          onPress={handlePress}
        >
          Go Back
        </Button>
      </Card.Content>
    </Card>
  );
};

export default VisionDetails;
