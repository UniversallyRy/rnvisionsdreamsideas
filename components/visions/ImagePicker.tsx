import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { ConnectedProps } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { Layout } from '@ui-kitten/components';
import { windowWidth } from '../../utils/dimensions';
import { useAppDispatch } from '../../utils/hooks';
import { addPic } from '../../redux/reducers/newpic';
import { ImageButtons } from '../../shared/buttons';

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
}

const ImagePic = () => {
  const [image, setImage] = useState(``);
  const dispatch = useAppDispatch()
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { camStatus }:any = await ImagePicker.getCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need gallery permissions to make this work!');
        }
        if (camStatus == 'granted') {
          alert(
            'Sorry, we need permissions from camera app to make this work!'
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    // result variable saves image you pick from phone's gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      let manipResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 425} }],
        { compress: 1, format: SaveFormat.PNG }
      );
      setImage(manipResult.uri);
      dispatch(addPic({ uri: manipResult.uri }));
    }else {
      return undefined;
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
      { image != '' && (
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
    alignItems:'center',
    justifyContent: 'center',
    width: windowWidth,
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