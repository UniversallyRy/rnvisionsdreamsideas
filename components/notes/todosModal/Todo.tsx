import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, CheckBox, Text } from '@ui-kitten/components';
import { TodoStyles } from './Styles';
import { TodoType, toggleTodo, deleteTodo } from '../../../redux/reducers/todos';
import { CloseButton } from '../../../shared/buttons';
import { useAppDispatch } from '../../../utils/hooks';

type SingleTodo = {
  item: TodoType;
  listId: string;
}

const Todo: React.FunctionComponent<SingleTodo> = ({ item, listId }): JSX.Element => {

  const dispatch = useAppDispatch()
  const { inputValue, inputId, completed } = item;

  return (
    <ListItem style={styles.container} >
      <CheckBox
        checked={completed}
        onChange={() => dispatch(toggleTodo({ inputId, listId }))}
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
        {inputValue}
      </Text>
      <CloseButton
        style={styles.deleteButton}
        onPress={(): { payload: object; type: string; } => dispatch(deleteTodo({ id: inputId, listId }))}
      />
    </ListItem>
  );

}

const styles = StyleSheet.create<TodoStyles>({
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
