import React, { useState, useEffect } from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import { ConnectedProps } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { Layout } from '@ui-kitten/components';
import { ImageButtons } from '../../../shared/buttons';
import { windowWidth } from '../../../utils/constants';
import { useAppDispatch } from '../../../utils/hooks';
import { addPic } from '../../../redux/reducers/newpic';
import { ImageStyles } from '../Styles';

const ImagePic = (): JSX.Element => {
  const [image, setImage] = useState(``);
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async (): Promise<void> => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  const pickImage = async (): Promise<undefined> => {
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

  const cameraImage = async (): Promise<void> => {
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
        <Image source={{ uri: image }} style={ styles.img } />
      )}
      <ImageButtons
        pickImage={ pickImage }
        cameraImage={ cameraImage }
      />
    </Layout>
  );
};

const styles = StyleSheet.create<ImageStyles>({
  container:{
    alignItems:'center',
    justifyContent: 'center',
    width: windowWidth,
    marginBottom: 40,
  },
  img:{
    width: 500,
    height: 500,
    marginBottom: 80,
    borderRadius: 28,
  }
});

export type PropsFromRedux = ConnectedProps<typeof ImagePic>;
export default ImagePic;