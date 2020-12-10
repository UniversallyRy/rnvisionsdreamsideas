import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Animated, Modal,StyleSheet, StatusBar, SafeAreaView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddVision from '../components/visions/addVision';
import VisionImageList from '../components/visions/visionImageList';
import VisionTitles from '../components/visions/visionTitles';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { coltsBlue, coltsGray, globalStyles } from '../styles/global';
import { setIn } from 'formik';

const VISIBLE_ITEMS = 3;


export function Visions({ navigation, state }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollXIndex = useRef(new Animated.Value(0)).current;
    const [ modalOpen, setModalOpen ] = useState( false );
    const [index, setIndex] = useState(0); 

   
    return (
          <View style={ styles.container }>
            <StatusBar hidden/>
            {/* <Modal style={{ margin:10 }}visible={ modalOpen } animationType='slide'>
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
            /> */}
            
            <VisionImageList state={state} scrollX={scrollX}/>
            <VisionTitles data={state} scrollXAnimated={scrollX}/>
          </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: coltsBlue,
  },
});

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.visions,
  }
}

export default connect( mapStateToProps )( Visions )