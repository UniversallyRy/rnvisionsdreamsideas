import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTodo from '../components/addTodo'
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
//test
export default function TodoList({ navigation }) {
  const STORAGE_KEY = '@save_todo'
  const [ todos, setTodos ] = useState({ title:'', item:[{ key:'', id: '' }] });


  const saveData = async ( storageKey, value ) => {
    value.item.id = uuidv4();
    value.key= uuidv4();
    try {
      const jsonValue = JSON.stringify( value )
      await AsyncStorage.setItem( storageKey, jsonValue )
      alert( 'Data successfully saved' )
      setModalOpen( false );
      setTodos(( currentTodos ) => {
        return [ value, ...currentTodos ];
      });
      console.log( storageKey, jsonValue )
      console.log( STORAGE_KEY )
    } catch (e) {
      alert( 'Failed to save the data to the storage' )
    }
  }

  const deleteData = async ( todo ) => {
    try {
      const jsonValue = JSON.stringify( todo )
      await AsyncStorage.removeItem( jsonValue )
      alert( 'Data removed saved' )
    } catch (e) {
      alert( 'Failed to save the remove' )
    }
  }

  const readData = async () => {
    try {
      const jsonValue= await AsyncStorage.getItem( STORAGE_KEY )
      return jsonValue != null ? JSON.parse( jsonValue ) : null;
      
    } catch (e) {
      alert( 'Failed to fetch the data from storage' )
    }
  }

  const saveStorage = () => {
    saveData( STORAGE_KEY,{ title: 'Todo 1', id: '1', key: '1' },
                         { title: 'Todo dos', id: '2', key: '2' },
                         { title: 'killme', id: '3', key: '3' })
  }

  const readStorage = () => {
    readData( STORAGE_KEY ).then( result => {
      let jsonObject = JSON.parse( result )
      alert( 'version ' + jsonObject.version + 'time ' + jsonObject.time );
    })
  }

  const removeItem = () => {
    deleteData( STORAGE_KEY )
  }

  const onChangeText = userTodo => setTodo( userTodo )

  const onSubmitEditing = () => {
    if ( !todo ) return

    saveData( todo )
    setTodo( '' )
  }

  // useEffect(() => {
  //   if(STORAGE_KEY = []) {
  //   saveData(STORAGE_KEY).then(setTodos(todos))
  //   }
  // }, [])




    const [ modalOpen, setModalOpen ] = useState( false );

    // const [todos, setTodos] = useState([
    //     { title: 'Todo 1', id: '1' },
    //     { title: 'Todo dos', id: '2' },
    //     { title: 'killme', id: '3' },
    //   ]);

    const addNewTodo = ( todo ) => {
      todo.id = uuidv4();
      todo.key= uuidv4();
      setTodos( (currentTodos) => {
        return [ todo, ...currentTodos ];
      });
      saveData( STORAGE_KEY, todo )

      setModalOpen( false );
    }

    return (
        <View style={ globalStyles.container }>
            <Modal visible={ modalOpen } animationType='slide'>
                <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                    <View style={ globalStyles.modalContent }>
                        <Text Text='Add Todo'>Add A Todo</Text>
                        <MaterialCommunityIcons
                        name='close'
                        size={ 24 }
                        style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                        onPress={ () => setModalOpen( false ) }
                        />  
                        <AddTodo addTodo={ saveData }/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <MaterialCommunityIcons
            name='plus'
            size={ 24 }
            style={ globalStyles.modalToggle }
            onPress={ () => setModalOpen( true ) }
          />
          <MaterialCommunityIcons
            name='plus'
            size={ 40 }        
            onPress={ saveStorage }
          />
          <MaterialCommunityIcons
            name='circle'
            size={ 40 }  
            onPress={ readStorage }
          />
          <MaterialCommunityIcons
            name='triangle'
            size={ 70 }
            onPress={ removeItem }
          />

          <FlatList
              data={ todos } 
              renderItem={({ item }) => (
                <Card style={ globalStyles.card } onPress={ () => navigation.navigate( 'TodoDetails', item ) }>
                    <Card.Content>
                      <Paragraph style={ globalStyles.cardContent }>{ item.title }</Paragraph>
                    </Card.Content>
                </Card>
              )}
          />
        </View>
    )
}