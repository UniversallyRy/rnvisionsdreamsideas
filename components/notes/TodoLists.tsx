import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { List } from '@ui-kitten/components';
import TodoList from './TodoList';
import { TodoListProps } from '../../redux/reducers/todos';
import { StoreProps } from '../../redux/store';

type ContentProps = {
  todosLists: TodoListProps[];
}

const TodoLists: FC<ContentProps> = ({ todosLists }) => {
  const renderTodoLists = (list) => {
    return <TodoList list={ list } />;
  };

  return (
    <List
      keyExtractor={ (_, index) => index.toString() }  
      data={ todosLists }
      horizontal={ true }
      showsHorizontalScrollIndicator={ false }
      renderItem={ ({ item }) => renderTodoLists(item) }
      keyboardShouldPersistTaps='always'
    />
  );
};


const mapStateToProps = (state: StoreProps) => {
  const { todosLists } = state;
  return { todosLists };
};

export default connect(mapStateToProps)(TodoLists);

export type PropsFromRedux = ConnectedProps<typeof TodoLists>
