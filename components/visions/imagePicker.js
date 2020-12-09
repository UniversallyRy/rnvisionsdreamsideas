import React, { useState, useEffect } from 'react';
import { View, Platform, Dimensions, Image } from 'react-native';
import { Button, Text} from 'react-native-paper';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { coltsGray, globalStyles } from '../../styles/global';
import { addPic } from '../../redux/actions';


export function ImagePic({ addPic }) {
  const [ image, setImage ] = useState( null );
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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
      aspect: [ 4, 3 ],
      quality: 1,
    });
    // .canccelled prop from ImagePicker import
    if ( !result.cancelled ) {
      setImage( result.uri );
      addPic( result.uri );
    }
  };

  const CameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
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
    <View style={{alignSelf: 'center'}}>
        <View style={globalStyles.visionButtonContainer}>
          <Button style={ globalStyles.uploadButton } title="Add Image From Gallery" onPress={ pickImage }>
            <Text style={{color: coltsGray}}>Add from gallery</Text>
          </Button>
          <Button style={ globalStyles.uploadButton } title="Take A Picture" onPress={ CameraImage }>
            <Text style={{color: coltsGray}}>Take a Picture</Text>
          </Button>
        </View>
        { image && <Image source={{ uri: image }} style={{ width: windowWidth * .97, height: 400 }} /> }
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
