import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Card, Text } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import DeleteTodo from './deleteTodo';
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from "../../redux/reducers/selectors";

export  function TodoList({ navigation, state }) {

  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [edited, setEdited] = useState(false);
    console.log(state);

    return (
            <View style={ globalStyles.todoListContainer }>
            <FlatList
                style={globalStyles.todoList}
                data={ state } 
                keyExtractor={( item, index) => index.toString() }
                renderItem={({ item }) => (
                  <Card style={ globalStyles.todoCard } onPress={ () => navigation.navigate( 'TodoDetails', item ) }>
                      <Card.Content style={globalStyles.todoContainer}>
                        <Text style={globalStyles.todoText}> { item.task } </Text>
                      </Card.Content>
                        <DeleteTodo item={item}/>
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

const TodoListtWithNavigation = withNavigation(TodoList)

export default connect(mapStateToProps)(TodoListtWithNavigation)