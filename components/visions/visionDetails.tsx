import React, { FunctionComponent } from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { Card, Button } from "react-native-paper";
import { NavigationScreenProp } from 'react-navigation';
import { windowHeight, windowWidth } from "../../utils/dimensions";


type VisionProps = {
  navigation: NavigationScreenProp<string, object>;
  route: any;
}

interface Styles {
  vDetailsContent: ViewStyle;
  visionTitle: TextStyle;
  vDetailsImage: ImageStyle;
  vDetailsButton: ViewStyle;
}

const VisionDetails: FunctionComponent<VisionProps> = ({ navigation, route }) => {
  const handlePress = () => {
    navigation.goBack();
  };
  const { data } = route.params;

  return (
    <Card elevation={ 7 } style={ styles.vDetailsContent }>
      <Card.Content>
        <Card.Title title={ data.title } style={ styles.visionTitle } />
        <Card.Cover key= { data.id } source={{ uri: data.uri }} style={ styles.vDetailsImage } />
        <Button
          style={ styles.vDetailsButton }
          icon="arrow-left"
          mode="contained"
          accessibilityLabel={ "Back to All Visions" }
          onPress={ handlePress } 
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
