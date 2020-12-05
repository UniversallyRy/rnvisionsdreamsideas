import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { globalStyles } from '../styles/global';
import AddTodo from '../components/todos/addTodo';
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from "../redux/reducers/selectors";
import  TodoList  from '../components/todos/todoList';

export  function TodoScreen({navigation}) {

    return (
      
          <View style={ globalStyles.todoScreenContainer }>            
            <AddTodo />
            <TodoList/>
          </View>
      
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  }
}

export default connect(mapStateToProps)(TodoScreen)