import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { globalStyles } from '../../styles/global';
import TodoItem from './todoItem';
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from "../../redux/reducers/selectors";

export  function TodoList({ navigation, state }) {

  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [edited, setEdited] = useState(false);

  const handleEdit = () => {
    props.editHandler(props.todoKey, text);
    setInput("");
    setEdited(false);
  };
  

    console.log(state);
  
  
    return (
            <View style={ globalStyles.todoListContainer }>
            <FlatList
                style={globalStyles.todoList}
                data={ state } 
                keyExtractor={( item, index) => index.toString() }
                renderItem={({ item }) => (
                  <TodoItem item={item}/>
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