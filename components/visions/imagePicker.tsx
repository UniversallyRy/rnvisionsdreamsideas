import React, { FunctionComponent, useState, useEffect } from "react";
import { View, Text, Platform, StyleSheet, StyleProp, ViewStyle, ImageStyle } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch, ConnectedProps } from "react-redux";
import { addPic } from "../../redux/reducers/newpic";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import * as ImageManipulator from "expo-image-manipulator"
import { windowHeight, windowWidth } from "../../utils/dimensions";

interface Styles {
  visionButtonContainer: ViewStyle;
  uploadButton: ViewStyle;
  image: ImageStyle;
}

const ImagePic = () => {
  const [image, setImage] = useState('');
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

    let manipResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { height: 800 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
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
      <>
        <Text>
          { image && (
            <Card.Cover source={{ uri: image }}
              style={ styles.image }
            />
          )}
        </Text>
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
    </>
  );
};

const styles = StyleSheet.create<Styles>({
  visionButtonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    
  },
  uploadButton: {
    margin: 5,
    elevation: 5,
  },
  image:{
    width: windowWidth * 0.97,
    height: windowHeight * 0.73,
    resizeMode: "contain",
    alignSelf: "center",
  }
});


export default ImagePic;

// {isOn: boolean, toggleOn: () => void}