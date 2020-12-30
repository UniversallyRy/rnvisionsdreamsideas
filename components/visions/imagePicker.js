import React, { useState, useEffect } from 'react';
import { View, Platform, Dimensions, Image } from 'react-native';
import { Button, Text} from 'react-native-paper';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { coltsBlue, globalStyles } from '../../styles/global';
import { addPic } from '../../redux/actions';
import * as ImageManipulator from 'expo-image-manipulator';



export function ImagePic({ addPic }) {
  const [ image, setImage ] = useState( null );
  const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

  useEffect(() => {
    ( async () => {
      if ( Platform.OS !== 'web' ) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        const { camStatus } = await ImagePicker.getCameraPermissionsAsync();
        if ( status !== 'granted' ) {
          alert( 'Sorry, we need gallery permissions to make this work!' );
        }
        if ( camStatus == 'granted' ) {
          alert( 'Sorry, we need permissions from camera app to make this work!' );
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
      [{ resize: { height: 800} }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG}
    ); 
    // .canccelled prop from ImagePicker import
    if ( !result.cancelled ) {
      setImage( manipResult.uri );
      addPic( manipResult.uri );
    }
  };

  const CameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    // .canccelled prop from ImagePicker import
    if ( !result.cancelled ) {
      setImage( result.uri );
      addPic( result.uri );
    }
  };

  return (
    <View style={{ alignSelf: 'center' }}>
        <View style={ globalStyles.visionButtonContainer }>
          <Button color={ coltsBlue } style={ globalStyles.uploadButton } title="Add Image From Gallery" onPress={ pickImage }>
            Add from gallery
          </Button>
          <Button icon= 'plus' color={ coltsBlue } style={ globalStyles.uploadButton } title="Take A Picture" onPress={ CameraImage }>
           Take a Picture
          </Button>
        </View>
        { image && <Image source={{ uri: image }} style={{ width: windowWidth * 0.97, height: windowHeight * 0.40, resizeMode: 'cover', alignSelf: 'center'}} /> }
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
)( ImagePic )
