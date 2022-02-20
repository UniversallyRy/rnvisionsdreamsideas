import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { List } from '@ui-kitten/components';
import Todo from './Todo';
import { TodoProps } from '../../../redux/reducers/todos';
import { windowHeight, windowWidth } from '../../../utils/dimensions';

type ListProps = {
  todos: TodoProps[];
  listId: string;
}

interface Styles {
  container: ViewStyle;
}


const TodoList:FC<ListProps> = ({ todos, listId }) => {

  const renderTodo = (todo: TodoProps, listId: string) => {
    return <Todo item={ todo } listId={ listId } />
  };

  return (
    <List
      style={ styles.container }
      data={ todos }
      keyExtractor={ (_, index) => index.toString() }
      renderItem={ ({ item }) => renderTodo(item, listId) }
    />
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    height: windowHeight,
    width: windowWidth,
  },
});

export default TodoList;
