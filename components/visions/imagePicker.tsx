import React, { FunctionComponent, useState, useEffect } from "react";
import { View, Text, Platform, StyleSheet, StyleProp, ViewStyle, ImageStyle } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch, ConnectedProps } from "react-redux";
import { addPic } from "../../redux/reducers/newpic";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { windowHeight, windowWidth } from "../../utils/dimensions";

interface Styles {
  container: ViewStyle;
  visionButtonContainer: ViewStyle;
  uploadButton: ViewStyle;
  image: ImageStyle;
}

const ImagePic = () => {
  const [image, setImage] = useState(``);
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { camStatus }:any = await ImagePicker.getCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need gallery permissions to make this work!");
        }
        if (camStatus == "granted") {
          alert(
            "Sorry, we need permissions from camera app to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    // result variable saves image you pick from phone's gallery
    let result:any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    let manipResult = await manipulateAsync(
      result.uri,
      [{ resize: { width: 425} }],
      { compress: 1, format: SaveFormat.PNG }
    );
    // .canccelled prop from ImagePicker import
    if (!result.cancelled) {
      setImage(manipResult.uri);
      dispatch(addPic({uri: manipResult.uri}));
    }else {
      result.uri = ''
    }
  };

  const CameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      dispatch(addPic({ uri: result.uri }));
    }
  };

  return (
      <Card elevation={0} style={ styles.container }>
        <Card.Content>
          { image != "" && (
            <Card.Cover source={{ uri: image }} style={ styles.image }
            />
          )}
        </Card.Content>
        <View style={ styles.visionButtonContainer }>
          <Button
            mode="contained"
            accessibilityLabel="Add Image From Gallery"
            onPress={ pickImage }
            style={ styles.uploadButton }
          >
            Add from gallery
          </Button>
          <Button
            mode="contained"
            accessibilityLabel="Take A Picture"
            onPress={ CameraImage }
            style={ styles.uploadButton }
          >
            Take a Picture
          </Button>
        </View>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  visionButtonContainer: {
    alignSelf: "center",
    flexDirection: "row",
  },
  uploadButton: {
    margin: 5,
    elevation: 3,
  },
  container:{
    width: windowWidth,
    alignItems:"center",
    marginBottom: 40,
  },
  image:{
    width: 500,
    height: 500,
    marginBottom: 80,
    borderRadius: 28,
    elevation: 2,
  }
});

export default ImagePic;
// {isOn: boolean, toggleOn: () => void}