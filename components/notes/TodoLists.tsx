import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { List } from '@ui-kitten/components';
import TodoList from './TodoList';
import { TodoListType } from '../../redux/reducers/todos';
import { StoreProps } from '../../redux/store';

type ContentProps = {
  todosLists: TodoListType[];
}

const TodoLists: FC<ContentProps> = ({ todosLists }): JSX.Element => {
  const renderTodoLists = (list: TodoListType): JSX.Element => <TodoList list={list} />;

  return (
    <List
      keyExtractor={ (_, index): string => index.toString() }  
      data={ todosLists }
      horizontal={ true }
      showsHorizontalScrollIndicator={ false }
      renderItem={ ({ item }): JSX.Element => renderTodoLists(item) }
      keyboardShouldPersistTaps='always'
    />
  );
};


const mapStateToProps = (state: StoreProps) => {
  const { todosLists } = state;
  return { todosLists };
};

export type PropsFromRedux = ConnectedProps<typeof TodoLists>
export default connect(mapStateToProps)(TodoLists);
