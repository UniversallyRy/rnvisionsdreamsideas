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
      data: {
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
  console.log(route)
  const { data } = route.params;

  return (
    <SafeAreaView style={ styles.vDetailsContent }>
      <Header name="Vision Details" navigation={navigation}/>
      <Card style={ styles.vCardContainer}>
          <Text style={ styles.visionTitle }>{data.title}</Text>
          <Image key= { data.id } source={{ uri: data.uri }} style={ styles.vDetailsImage } />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  vDetailsContent: {
    fontFamily: "roboto-black",
    flexDirection: "column",
    flex: 1,
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
    borderRadius: 4,
    alignSelf: "center",
    height: windowHeight * 0.65,
    width: windowWidth * 0.97,
    margin: 5,
  },
});

export default VisionDetails;
