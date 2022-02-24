import React, { FC } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ListItem, CheckBox, Text } from '@ui-kitten/components';
import { TodoType, toggleTodo, deleteTodo } from '../../../redux/reducers/todos';
import { CloseButton } from '../../../shared/buttons';
import { useAppDispatch } from '../../../utils/hooks';

type SingleTodo = {
  item: TodoType; 
  listId: string;   
}  

interface Styles {
  container:ViewStyle;
  todo:TextStyle;
  deleteButton:ViewStyle;
}

const Todo:FC<SingleTodo> = ({ item, listId }) => {
  const { inputValue, inputId, completed } = item;
  const dispatch = useAppDispatch()

  return (
    <ListItem style={ styles.container } >
      <CheckBox
        checked={ completed }
        onChange={ () => dispatch(toggleTodo({ inputId, listId })) }
      />
      <Text
        style={[
          styles.todo,
          {
            textDecorationLine: completed ? 'line-through' : 'none',
            color: completed ? 'gray' : 'black',
          }
        ]}
      >
        { inputValue }
      </Text>
      <CloseButton
        style={ styles.deleteButton }
        onPress={ () => dispatch(deleteTodo({ id:inputId, listId })) }
      />
    </ListItem>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 2,
  },
  todo: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});

export default Todo;
