import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Animated, Modal,StyleSheet, StatusBar, SafeAreaView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddVision from '../components/visions/addVision';
import VisionImageList from '../components/visions/visionImageList';
import VisionTitles from '../components/visions/visionTitles';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { coltsGray, globalStyles } from '../styles/global';
import { setIn } from 'formik';

const VISIBLE_ITEMS = 3;


export function Visions({ navigation, state }) {
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const scrollXIndex = useRef(new Animated.Value(0)).current;
    const [ modalOpen, setModalOpen ] = useState( false );
    const [index, setIndex] = useState(0); 
    const setActiveIndex = useCallback((activeIndex) => {
      scrollXIndex.setValue(activeIndex);
      setIndex(activeIndex);
    });

    useEffect(() => {
      Animated.spring(scrollXAnimated, {
        toValue: scrollXIndex,
        useNativeDriver: true,
      }).start();
 
    });

   
    return (
      <FlingGestureHandler
        key='left'
        direction={Directions.LEFT}
        onHandlerStateChange={ev => {
          if(ev.nativeEvent.state === State.END) {
            if( index === state.length - 1){
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={ev => {
          if(ev.nativeEvent.state === State.END) {
            if( index === 0){
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
        >
          <SafeAreaView style={ styles.container }>
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
            
            <VisionImageList scrollXAnimated={scrollXAnimated} state={state} />
            <VisionTitles scrollXAnimated={scrollXAnimated} data={state} />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: coltsGray,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.visions,
  }
}

export default connect( mapStateToProps )( Visions )