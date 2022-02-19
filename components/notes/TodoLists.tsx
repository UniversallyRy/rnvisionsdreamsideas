import React, { FC } from 'react';
import { FlatList, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import TodoList from './TodoList';
import { TodoListProps } from '../../redux/reducers/todos';
import { StoreProps } from '../../redux/store';

type ContentProps = {
  todos: TodoListProps[];
}

interface Styles {
  container: ViewStyle;
  titleStyle: TextStyle;
  title: TextStyle;
  addList: ViewStyle;
}

const TodoLists: FC<ContentProps> = ({ todos }) => {

  const renderTodoLists = (list) => {
    return <TodoList list={ list } />;
  };

  return (
    <FlatList
      keyExtractor={ (_, index) => index.toString() }  
      data={ todos }
      horizontal={ true }
      showsHorizontalScrollIndicator={ false }
      renderItem={ ({ item }) => renderTodoLists(item) }
      keyboardShouldPersistTaps='always'
    />
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    flexDirection: 'row',
    marginTop: 50,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    paddingHorizontal: 20,
  },
  addList: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 'auto'
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { todos } = state;
  return { todos };
};

export default connect(mapStateToProps)(TodoLists);

export type PropsFromRedux = ConnectedProps<typeof TodoLists>
