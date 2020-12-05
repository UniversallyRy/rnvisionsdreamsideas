import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph,  Modal, Provider, Portal, Text, Button } from 'react-native-paper';
import AddTodo from '../components/addTodo'
import DeleteTodo from '../components/deleteTodo'
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from "../redux/reducers/selectors";

export  function TodoList({ navigation, state }) {

  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [edited, setEdited] = useState(false);
    console.log(state);

    return (
      
          <View style={ globalStyles.todoScreenContainer }>            
            <AddTodo />
            <View style={ globalStyles.todoListContainer }>
            <FlatList
                style={globalStyles.todoList}
                data={ state } 
                keyExtractor={( item, index) => index.toString() }
                renderItem={({ item }) => (
                  <Card style={ item.complete ? globalStyles.todoContainer : globalStyles.todoCard  } onPress={ () => navigation.navigate( 'TodoDetails', item ) }>
                      <Card.Content style={globalStyles.todoContainer}>
                        <Text style={globalStyles.todoText}> { item.task } </Text>
                      </Card.Content>
                        <DeleteTodo item={item}/>
                  </Card>
                )}
              />
          </View>
          
          </View>
      
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  }
}

export default connect(mapStateToProps)(TodoList)