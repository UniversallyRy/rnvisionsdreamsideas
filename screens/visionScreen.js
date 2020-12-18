import React, { useState, useRef, useEffect } from 'react';
import { Animated, Modal, StyleSheet, StatusBar, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddVision from '../components/visions/addVision';
import VisionsContainer from '../components/visions/visionImageList';
import VisionGridContainer from '../components/visions/visionImageGrid';
import { coltsBlue, globalStyles } from '../styles/global';

const VISIBLE_ITEMS = 3;


export function Visions({  state, navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const [ modalOpen, setModalOpen ] = useState( false );
  const [gridView, setGridView] = useState(false); 


  useEffect(() => {
    let isCancelled = false;

      if (!isCancelled) {
       
      }

    return () => {
      isCancelled = true;
    };
  }, []);

  const toggleGrid = () => { 
    setGridView(!gridView);
  }; 

    return (
          <View style={ styles.container }>
            {/* <StatusBar hidden/> */}
            <Modal style={{ margin:10 }}visible={ modalOpen } animationType='slide'>
              <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <View style={ globalStyles.modalContent }>
                  <Text Text='Add Vision'> Add A Vision </Text>
                  <AddVision setModalOpen={setModalOpen}/>
                  <View style={globalStyles.closeModalContainer}>
                    <MaterialCommunityIcons
                      name='close'
                      size={ 24 }
                            // rest/spread operator to grab modaltoggle props and adds any new modalcloses props  
                      style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                      onPress={ () => setModalOpen(false) }
                    />
                                     
                  </View>  
                </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* when gridview is toggled use gridContainer otherwise VisionsContainer */}
            {gridView
               ? <VisionGridContainer
                    state={state}
                    navigation={navigation}
                  />
               : <VisionsContainer 
                    navigation={navigation} 
                    state={state} 
                    scrollX={scrollX}                  
                  />
            }
            {/* <VisionTitles data={state} scrollXAnimated={scrollX}/> */}
            <View style={globalStyles.visionAddToggle}>
              <MaterialCommunityIcons
                name='plus'
                size={ 24 }
                style={ globalStyles.modalToggle }
                onPress={ () => setModalOpen(true) }
              />
              <MaterialCommunityIcons
                name='grid'
                size={ 24 }
                style={ globalStyles.modalToggle }
                onPress={ () => toggleGrid() }
              />
              </View>
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