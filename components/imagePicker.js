import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, View, Platform } from 'react-native';
// import {  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles/global'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'

export default function ImagePic() {
  const [image, setImage] = useState(null);
  const refImage = useRef(null)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={globalStyles.uploadButton}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
