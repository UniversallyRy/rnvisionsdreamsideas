import React, { useState } from 'react';
import { Modal, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddVision from '../components/visions/addVision';
import SlideList from '../components/visions/slideList';
import { globalStyles } from '../styles/global';


export function Visions({ navigation, state }) {
    const [ modalOpen, setModalOpen ] = useState( false );
   
    return (
        <View style={ globalStyles.visionPage }>
          <Modal style={{ margin:10 }}visible={ modalOpen } animationType='slide'>
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
              <View style={ globalStyles.modalContent }>
                <Text Text='Add Vision'> Add A Vision </Text>
                <MaterialCommunityIcons
                  name='close'
                  size={ 24 }
                        // rest/spread operator to grab modaltoggle props and adds any new modalcloses props  
                  style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                  onPress={ () => setModalOpen( false ) }
                />  
                <AddVision/>
              </View>
              </TouchableWithoutFeedback>
          </Modal>

          <MaterialCommunityIcons
            name='plus'
            size={ 24 }
            style={ globalStyles.modalToggle }
            onPress={ () => setModalOpen(true) }
          />


          <SlideList
            data={ state }
            onPress={ () => navigation.navigate( 'VisionDetails', item ) }   
          />
          
        </View>
    )
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.visions,
    stateUri: state.pic
  }
}

export default connect( mapStateToProps )( Visions )