import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTodo from '../components/addTodo'
import { connect, useSelector, useDispatch} from 'react-redux';
import { addTodo, deleteTodo } from '../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import { getTodosByVisibilityFilter } from "../redux/reducers/selectors";
import AsyncStorage from '@react-native-async-storage/async-storage';
//test

export  function TodoList({ navigation, addTodo, todoList }) {
  const STORAGE_KEY = '@save_todo'
  const [ todos, setTodos ] = useState(todoList);


  // const saveData = async ( storageKey, value ) => {
  //   value.item.id = uuidv4();
  //   value.key= uuidv4();
  //   try {
  //     const jsonValue = JSON.stringify( value )
  //     await AsyncStorage.setItem( storageKey, jsonValue )
  //     alert( 'Data successfully saved' )
  //     setModalOpen( false );
  //     setTodos(( currentTodos ) => {
  //       return [ value, ...currentTodos ];
  //     });
  //     console.log( storageKey, jsonValue )
  //     console.log( STORAGE_KEY )
  //   } catch (e) {
  //     alert( 'Failed to save the data to the storage' )
  //   }
  // }

  // const deleteData = async ( todo ) => {
  //   try {
  //     const jsonValue = JSON.stringify( todo )
  //     await AsyncStorage.removeItem( jsonValue )
  //     alert( 'Data removed saved' )
  //   } catch (e) {
  //     alert( 'Failed to save the remove' )
  //   }
  // }

  // const readData = async () => {
  //   try {
  //     const jsonValue= await AsyncStorage.getItem( STORAGE_KEY )
  //     return jsonValue != null ? JSON.parse( jsonValue ) : null;
      
  //   } catch (e) {
  //     alert( 'Failed to fetch the data from storage' )
  //   }
  // }

  // const saveStorage = () => {
  //   saveData( STORAGE_KEY,{ title: 'Todo 1', id: '1', key: '1' },
  //                        { title: 'Todo dos', id: '2', key: '2' },
  //                        { title: 'killme', id: '3', key: '3' })
  // }

  // const readStorage = () => {
  //   readData( STORAGE_KEY ).then( result => {
  //     let jsonObject = JSON.parse( result )
  //     alert( 'version ' + jsonObject.version + 'time ' + jsonObject.time );
  //   })
  // }

  // const removeItem = () => {
  //   deleteData( STORAGE_KEY )
  // }

  // const onChangeText = userTodo => setTodo( userTodo )

  // const onSubmitEditing = () => {
  //   if ( !todo ) return

  //   saveData( todo )
  //   setTodo( '' )
  // }

  // useEffect(() => {
  //   if(STORAGE_KEY = []) {
  //   saveData(STORAGE_KEY).then(setTodos(todos))
  //   }
  // }, [])

      // const handleNewTodo = () => {
      //   addTodo(todo);
      //   setTodos('');
      // };

    const listTodos = useSelector(state => state)  
    const dispatch = useDispatch();
    const addNewTodo = todo => dispatch(addTodo(todo))
    return (
        <View style={ globalStyles.container }>
            
                    <View style={ globalStyles.modalContent }>
                        
                        <AddTodo addTodo={addNewTodo}/>
                    </View>
            
            

          <FlatList
              extraData={ listTodos }
              data={ todoList } 
              keyExtractor={( item ) => item.id.toString() }
              renderItem={({ item }) => (
                <Card style={ globalStyles.card } onPress={ () => navigation.navigate( 'TodoDetails', item ) }>
                    <Card.Content>
                      <Paragraph style={ globalStyles.cardContent }>{ item.task }</Paragraph>
                    </Card.Content>
                </Card>
              )}
          />
        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    todoList: state.todos,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)