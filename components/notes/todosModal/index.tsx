import React, { FC, useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Header from './Header';
import TodoList from './TodoList';
import InputTodo from './InputTodo';
import { windowHeight, windowWidth } from '../../../utils/dimensions';
import { TodoListProps } from '../../../redux/reducers/todos';


type TodoModalProps = {
  list: TodoListProps;
  closeModal: (() => void);
  completedList: ((count1: number, count2: number) => void);
}

interface Styles {
  container: ViewStyle;
}

const TodosModal: FC<TodoModalProps> = ({ completedList, list, closeModal }) => {
  const { todos, id } = list;
  const taskCount = todos.length;
  const completedCount = todos.filter((todo:any) => todo.completed).length;

  return (
    <Layout style={ styles.container }>
      <Header 
        list={ list } 
        completedList={ completedList } 
        closeModal={ closeModal }
      />
      <TodoList 
        todos={ todos } 
        listId={ id } 
      />
      <InputTodo
        listId={ id } 
        taskCount={ taskCount } 
        completedCount={ completedCount } 
        completedList={ completedList }
      /> 
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
});

export default TodosModal;
