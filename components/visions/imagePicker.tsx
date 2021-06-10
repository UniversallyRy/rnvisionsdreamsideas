import React, { useState, useEffect } from "react";
import { StyleSheet, StyleProp, ViewStyle, Platform, Dimensions, Image } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { addPic } from "../../redux/actions";
import * as ImageManipulator from "expo-image-manipulator";

interface ImageProps {
  addPic: ((item:any) => void);
  visionButtonContainer: StyleProp<ViewStyle>;
  uploadButton: StyleProp<ViewStyle>;
}
interface Styles {
  visionButtonContainer: ViewStyle;
  uploadButton: ViewStyle;
}


const ImagePic: React.FC<ImageProps> = ({ addPic }) => {
  const [image, setImage] = useState('');
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestCameraRollPermissionsAsync();
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { height: 800 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    // .canccelled prop from ImagePicker import
    if (!result.cancelled) {
      setImage(manipResult.uri);
      addPic(manipResult.uri);
    }
  };

  const CameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    // .canccelled prop from ImagePicker import
    if (!result.cancelled) {
      setImage(result.uri);
      addPic(result.uri);
    }
  };

  return (
      <Card>
        <Card.Content style={styles.visionButtonContainer}>
        <Button
          style={styles.uploadButton}
          accessibilityLabel="Add Image From Gallery"
          onPress={pickImage}
        >
          Add from gallery
        </Button>
        <Button
          style={styles.uploadButton}
          accessibilityLabel="Take A Picture"
          onPress={CameraImage}
        >
          Take a Picture
        </Button>
        </Card.Content>
      <Text>
        {image && (
          <Image source={{uri: image}}
            style={{
              width: windowWidth * 0.97,
              height: windowHeight * 0.6,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
        )}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  visionButtonContainer: {
    flexDirection: "row",
  },
  uploadButton: {
    margin: 5,
    alignSelf: "center"
  },
});

const mapDispatchToProps = { addPic };

export default connect(null, mapDispatchToProps)(ImagePic);
