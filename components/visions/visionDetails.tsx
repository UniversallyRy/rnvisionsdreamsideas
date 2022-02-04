import React, { FC } from "react";
import { Image, StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from 'react-navigation';
import { Card, Text } from '@ui-kitten/components';
import { windowHeight, windowWidth } from "../../utils/dimensions";
import Header from "../../shared/header";

type VisionProps = {
  navigation: NavigationScreenProp<string, object>;
  route: {
    key: string;
    name: string;
    params: {
      item: {
        id: string;
        title: string;
        uri: string;
      },
    },
    path: undefined;
  };
}

interface Styles {
  vDetailsContent: ViewStyle;
  visionTitle: TextStyle;
  vDetailsImage: ImageStyle;
  vCardContainer: ViewStyle;
}

const VisionDetails: FC<VisionProps> = ({ navigation, route }) => {
  const { id, title, uri } = route.params.item;

  return (
    <SafeAreaView style={ styles.vDetailsContent }>
      <Header name={ "Vision Details" } navigation={ navigation }/>
      <Card style={ styles.vCardContainer }>
          <Text style={ styles.visionTitle }>{ title }</Text>
          <Image key= { id } source={{ uri }} style={ styles.vDetailsImage } />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  vDetailsContent: {
    flex: 1,  
    fontFamily: "roboto-black",
    flexDirection: "column",
  },
  vCardContainer: {
    alignSelf: "center",
    width: windowWidth,
    height: windowHeight,
    elevation: 1,
  },
  visionTitle: {
    alignSelf: "center",
    fontSize: 22,
    marginBottom: 10,
  },
  vDetailsImage: {
    resizeMode: "contain",
    borderRadius: 3,
    alignSelf: "center",
    height: windowHeight * 0.65,
    width: windowWidth * 0.97,
    margin: 5,
  },
});

export default VisionDetails;
