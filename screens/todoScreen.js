import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph } from 'react-native-paper';
import AddTodo, {storeData} from '../components/addTodo'
import DeleteTodo from '../components/deleteTodo'
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from "../redux/reducers/selectors";
import AsyncStorage from '@react-native-async-storage/async-storage';

export  function TodoList({ navigation, state }) {

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
                      <DeleteTodo item={item.id}/>
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