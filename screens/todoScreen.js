import React from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph } from 'react-native-paper';
import AddTodo from '../components/addTodo'
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from "../redux/reducers/selectors";
import AsyncStorage from '@react-native-async-storage/async-storage';

export  function TodoList({ navigation, addTodo, state }) {
  const STORAGE_KEY = '@save_todo'


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
    
    return (
        <View style={ globalStyles.container }>            
          <View style={ globalStyles.todoFormContainer }>
            <AddTodo />
          </View>
            
          <FlatList
              style={globalStyles.todoList}
              data={ state } 
              keyExtractor={( item, index) => index.toString() }
              renderItem={({ item }) => (
                <Card style={ globalStyles.card } onPress={ () => navigation.navigate( 'TodoDetails', item ) }>
                    <Card.Content>
                      <Paragraph>{ item.task }</Paragraph>
                    </Card.Content>
                </Card>
              )}
            />
        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  }
}

export default connect(mapStateToProps)(TodoList)