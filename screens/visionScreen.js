import React, { useState } from 'react';
import { Modal, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text} from 'react-native-paper'
import { globalStyles } from '../styles/global'
// import { Card, Paragraph, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddVision from '../components/addVision'
import SlideList from '../components/slideList';

export default function Visions({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);

    // const [visions, setVisions] = useState([
    //     { image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    //       title: 'Silent Waters in the mountains in midst of Himilayas',
    //       body: 'lorem ipsum', 
    //       key: '1' 
    //     },
    //     { image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    //       title: 'Red fort in India New Delhi is a magnificient masterpeiece of humans', 
    //       body: 'lorem ipsum', 
    //       key: '2' 
    //     },
    //     { image:'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    //       title: 'Not So "Final" Fantasy', 
    //       body: 'lorem ipsum', 
    //       key: '3' 
    //     },
    //   ]);

    const addNewVision = (vision) => {
      vision.key = Math.random().toString();
      setVisions((currentVisions) => {
        return [visions, ...currentVisions];
      });
      setModalOpen(false);
    }


    return (
        <View style={globalStyles.visionPage}>
          <Modal style={{margin:10}}visible={modalOpen} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={globalStyles.modalContent}>
                <Text Text='Add Vision'>Add A Vision</Text>
                <MaterialCommunityIcons
                  name='close'
                  size={24}
                  style={{...globalStyles.modalToggle, ...globalStyles.modalClose}}
                  onPress={() => setModalOpen(false)}
                />  
                  {/* <ImagePic/> */}
                <AddVision addNewVision={addNewVision}/>
              </View>
              </TouchableWithoutFeedback>
          </Modal>

          <MaterialCommunityIcons
            name='plus'
            size={24}
            style={globalStyles.modalToggle}
            onPress={() => setModalOpen(true)}
          />


          <SlideList
            onPress={() => navigation.navigate('VisionDetails', item)}   
          />
          
        </View>
    )
}