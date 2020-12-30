import React, { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Card, Text, TextInput, Button } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { deleteTodo, editTodo } from '../../redux/actions';
import { globalStyles } from '../../styles/global';

export  function TodoItem({ navigation, state, item, deleteTodo, editTodo }) {
  const [ input, setInput ] = useState( '' );
  const [ edited, setEdited ] = useState( false );

  const removeTodo = () => {
    //calls redux action on stored todos
    deleteTodo( item.id );
    setEdited( false );
};

  const editButtonHandler = () => {
    //event handler to make sure input edited input text consistently matches
    setInput( item.task );
    setEdited( true );
  };
console.log( state );
  const saveEdit = () => {
    // map through state, grab todo by id and change task value
    const newState = state.map((todo) => {
        //checks useState item ids with State props
        if (todo.id === item.id) {
            todo.task = input;
            return todo;
        } 
      });
    // redux function, may not be needed  
    editTodo( newState );
    setEdited( false );
  };
  
    return (
            <View style={ globalStyles.todoListContainer }>
                  <Card style={ globalStyles.todoCard } onPress={ () => navigation.navigate( 'TodoDetails', item ) }>
                      {/* logic to toggle single item rendering' */}
                      {edited
                      ? <Card.Content style={ globalStyles.todoContainer }>
                            <TextInput onSubmitEditing={ Keyboard.dismiss } style={ globalStyles.todoInput } defaultValue={ input } onChangeText={ setInput }/>
                        </Card.Content>
                      : <Card.Content style={ globalStyles.todoContainer }>
                            <Text style={ globalStyles.todoText }> { item.task } </Text>
                        </Card.Content>  
                      }
                        <View style={ globalStyles.todoButtons }>
                        {edited

                          ? <View style={ globalStyles.todoButtons }>
                            <Button style={ styles.editButton } color="#A2AAAD" icon="lead-pencil" mode="contained" onPress={ () => saveEdit() }>
                                <Text>Save</Text>
                            </Button>
                            <Button style={ styles.deleteButton } color="red" icon="close-outline" mode="contained" onPress={ () => setEdited( false )}>
                                <Text>Cancel</Text>
                            </Button>
                            </View>
                          :
                          <View style={ globalStyles.todoButtons }>
                          <Button style={ styles.editButton } color="#A2AAAD" icon="lead-pencil" mode="contained" onPress={ () => editButtonHandler() }>
                                <Text>Edit</Text>
                            </Button>
                            <Button style={ styles.deleteButton } color="red" icon="close-outline" mode="contained" onPress={ () => removeTodo() }>
                                <Text>Delete</Text>
                            </Button>
                            </View>
                        }
                        </View>
                  </Card>
          </View>
    )
}

const styles = StyleSheet.create({
    editButton: {
        margin: 5
    },
    deleteButton: {
        margin: 5,
    }
})

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.todos,
  }
}

const mapDispatchToProps = { deleteTodo, editTodo }

const TodoItemtWithNavigation = withNavigation( TodoItem )

export default connect( mapStateToProps, mapDispatchToProps )( TodoItemtWithNavigation )