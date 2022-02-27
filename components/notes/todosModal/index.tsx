import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Header from './Header';
import TodoList from './TodoList';
import InputTodo from './InputTodo';
import { TodoListType } from '../../../redux/reducers/todos';
import { windowHeight, windowWidth } from '../../../utils/constants';
import { HomeStyles } from './Styles';

type TodoModalProps = {
  list: TodoListType;
  closeModal: (() => void);
}

const TodosModal: FC<TodoModalProps> = ({  list, closeModal }): JSX.Element => {
  const { todos, id } = list;
  // const taskCount = todos.length;
  return (
    <Layout style={ styles.container }>
      <Header 
        list={ list } 
        closeModal={ closeModal }
      />
      <TodoList 
        todos={ todos } 
        listId={ id } 
      />
      <InputTodo
        listId={ id } 
      /> 
    </Layout>
  );
};

const styles = StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
});

export default TodosModal;
