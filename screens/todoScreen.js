import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../styles/global';
import AddTodo from '../components/todos/addTodo';
import { connect } from 'react-redux';
import  TodoList  from '../components/todos/todoList';
import  ListMain  from '../components/todos/listMain';

export  function TodoScreen({ navigation }) {

    return (
          <View style={ globalStyles.todoScreenContainer }>            
            <ListMain/>
            {/* <TodoList/> */}
            {/* <AddTodo /> */}
          </View>
    )
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.todos,
  }
}

export default connect( mapStateToProps )( TodoScreen )