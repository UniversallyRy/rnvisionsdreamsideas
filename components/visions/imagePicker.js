import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../../styles/global';
import { addPic } from '../../redux/actions';

export function ImagePic({ addPic }) {
  const [ image, setImage ] = useState( null );

  useEffect(() => {
    ( async () => {
      if ( Platform.OS !== 'web' ) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if ( status !== 'granted' ) {
          alert( 'Sorry, we need camera roll permissions to make this work!' );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    // result variable saves image you pick from phone's gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 4, 3 ],
      quality: 1,
    });
    // .canccelled prop from ImagePicker import
    if ( !result.cancelled ) {
      setImage( result.uri );
      addPic( result.uri );
    }
  };

  return (
    <View>
      <Button style={ globalStyles.uploadButton } title="Pick an image from camera roll" onPress={ pickImage } />
      { image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> }
    </View>
  );
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.pic,
  }
}

const mapDispatchToProps = { addPic }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePic )
