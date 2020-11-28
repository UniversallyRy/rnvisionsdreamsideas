import React, { useState } from 'react';
import { Modal, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';
import { globalStyles } from '../styles/global'
import AddVision from '../components/addVision'
import SlideList, { defaultSlides } from '../components/slideList';

const slideList = Array.from({ length:8 }).map((_, i) => {
  return {
    uri: `https://picsum.photos/200${ i }`,
    title: `This is the title ${ i + 1 }!`,
    id: i,
  };
});
console.log( slideList );


export default function Visions({ navigation }) {
    const [ modalOpen, setModalOpen ] = useState( false );
    const [ visions, setVisions ] = useState( slideList );
   


    const addNewVision = ( vision ) => {
      vision.id = uuidv4();
      setVisions(( currentVisions ) => {
        return [ vision, ...currentVisions ];
      });
      console.log( SlideList.data )
      setModalOpen( false );
    }


    return (
        <View style={ globalStyles.visionPage }>
          <Modal style={{ margin:10 }}visible={ modalOpen } animationType='slide'>
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
              <View style={ globalStyles.modalContent }>
                <Text Text='Add Vision'> Add A Vision </Text>
                <MaterialCommunityIcons
                  name='close'
                  size={ 24 }
                  style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                  onPress={ () => setModalOpen(false) }
                />  
                <AddVision addVision={ addNewVision }/>
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
            data={ slideList }
            onPress={ () => navigation.navigate( 'VisionDetails', item ) }   
          />
          
        </View>
    )
}