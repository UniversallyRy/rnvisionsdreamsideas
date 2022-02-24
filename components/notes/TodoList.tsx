import React, { FC, useState, useEffect } from 'react';
import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Card, Layout, Modal, Text } from '@ui-kitten/components';
import TodosModal from './todosModal';
import { CloseButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { deleteList, setCompleted, TodoListType } from '../../redux/reducers/todos';

type ListProps = {
  list: TodoListType;
}

interface Styles {
  listContainer: ViewStyle;
  listModal: ViewStyle;
  listTitle: TextStyle;
  count: TextStyle;
  subtitle: TextStyle;
  deleteButton: ViewStyle;
}

const TodoList: FC<ListProps>= ({ list }) => {
  const { todos, name, id, color, completedCount } = list;
  const [complete, changeCompleted] = useState(completedCount);
  const remaining = Object.keys(todos).length - complete;
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const toggleListModal = () => {
    setVisible(!visible);
  };

  useEffect(()=> {
      setCompleted({ count: complete, listId: id });
      changeCompleted(completedCount);
  }, [completedCount]);
    

  return (
    <Layout style={ styles.listContainer }>
      <Card style={ [styles.listModal, { backgroundColor: color }] } onPress={ () => toggleListModal() }>
        <Modal
          visible={ visible }
          accessibilityLabel='CLicking here opens Todo Modal'
        >
          <TodosModal list={ list } closeModal={ () => toggleListModal() } />
        </Modal>
        <Text style={ styles.listTitle } numberOfLines={ 1 }> { name } </Text>
        <Text style={ styles.count }>{ remaining }</Text>
        <Text style={ styles.subtitle }>Remaining</Text>
        <Text style={ styles.count }>{ complete }</Text>
        <Text style={ styles.subtitle }>Completed</Text>
      </Card>
      <CloseButton
        style={ styles.deleteButton }
        onPress={ () => dispatch(deleteList({ id: id })) }
        accessibilityLabel='Click here to delete list'
      >
        Delete
      </CloseButton>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listModal: {
    width: 200,
    borderRadius: 6,
    elevation: 3,
  },
  listTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  count: {
    fontSize: 40,
    fontWeight: '200',
    alignSelf: 'center'
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '700',
    alignSelf: 'center'
  },
  deleteButton: {
    alignItems: 'center',
    width: 200,
    margin: 1,
    elevation: 2,
  },
});

export default TodoList;
