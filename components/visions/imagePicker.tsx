import React, { FunctionComponent, useState, useEffect } from "react";
import { Image, Platform, StyleSheet, ViewStyle, ImageStyle } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useDispatch, ConnectedProps } from "react-redux";
import { addPic } from "../../redux/reducers/newpic";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { windowWidth } from "../../utils/dimensions";
import { ImageButtons } from "../../shared/buttons";

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
}

const ImagePic: FunctionComponent = () => {
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

  const cameraImage = async () => {
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
    <Layout style={ styles.container }>
      { image != "" && (
        <Image source={{ uri: image }} style={ styles.image } />
      )}
      <ImageButtons
        pickImage={ pickImage }
        cameraImage={ cameraImage }
      />
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container:{
    width: windowWidth,
    alignItems:"center",
    justifyContent: "center",
    marginBottom: 40,
  },
  image:{
    width: 500,
    height: 500,
    marginBottom: 80,
    borderRadius: 28,
  }
});

export default ImagePic;
export type PropsFromRedux = ConnectedProps<typeof ImagePic>

// {isOn: boolean, toggleOn: () => void}