import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import Todo from './Todo';
import { TodoType } from '../../../redux/reducers/todos';
import { windowHeight, windowWidth } from '../../../utils/constants';
import { TodoListStyles } from './Styles';

type ListProps = {
  todos: TodoType[];
  listId: string;
}

const TodoList:FC<ListProps> = ({ todos, listId }): JSX.Element => {

  const renderTodo = ({ todo, listId }: { todo: TodoType; listId: string }): JSX.Element => {
    return <Todo item={todo} listId={listId} />;
  };

  return (
    <List
      data={ todos }
      style={ styles.container }
      keyExtractor={ (_, index): string => index.toString() }
      renderItem={ ({ item }): JSX.Element => renderTodo({ todo: item, listId }) }
    />
  );
}

const styles = StyleSheet.create<TodoListStyles>({
  container: {
    height: windowHeight,
    width: windowWidth,
  },
});

export default TodoList;
