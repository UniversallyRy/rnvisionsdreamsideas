import React, { FC, useState, useEffect } from 'react';
import { Modal, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';
import TodosModal from './TodosModal';
import { CloseButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { deleteList, TodoList } from '../../redux/reducers/todos';

type TodoListsProps = {
  list: TodoList;
}

interface Styles {
  listContainer: ViewStyle;
  cardContainer: ViewStyle;
  listTitle: TextStyle;
  count: TextStyle;
  subtitle: TextStyle;
  deleteButton: ViewStyle;
}

const TodoContainer: FC<TodoListsProps>= ({ list }) => {
  const { todos, name, id, color } = list;
  const [visible, setVisible] = useState(false);
  const [InitRemaining, setInitRemaining] = useState(0);
  const [InitCount, setInitCount] = useState(0);
  const [isMount, setIsMount] = useState(true);
  const dispatch = useAppDispatch();

  const toggleListModal = () => {
    setVisible(!visible);
  };

  useEffect(()=>{
    if(isMount){
      let completedCount = (filtered(todos, (todo:any) => todo.completed));
      let remainingCount = (filtered(todos, (todo:any) => !todo.completed));
      setInitCount(Object.keys(completedCount).length);
      setInitRemaining(Object.keys(remainingCount).length);
      setIsMount(false);
      return;
    }
    completedList(InitRemaining, InitCount);
  }, [TodosModal])
    
const completedList = (remaining:number, completed:number) => {
  setInitRemaining(remaining);
  setInitCount(completed);
}
  
  const filtered = (obj:object, predicate: any) => {
    let result = {}, key: PropertyKey;
    
    for (key in obj) {
      if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  return (
    <Layout style={ styles.listContainer }>
      <Card style={ [styles.cardContainer, { backgroundColor: color }] } onPress={ () => toggleListModal() }>
        <Modal
          animationType='slide'
          visible={ visible }
          onRequestClose={ () => toggleListModal() }
          accessibilityLabel='CLicking here opens Todo Modal'
        >
          <TodosModal completedList={ completedList } item={ list } closeModal={ () => toggleListModal() } />
        </Modal>
        <Text style={ styles.listTitle } numberOfLines={ 1 }> { name } </Text>
        <Text style={ styles.count }>{ InitRemaining }</Text>
        <Text style={ styles.subtitle }>Remaining</Text>
        <Text style={ styles.count }>{ InitCount }</Text>
        <Text style={ styles.subtitle }>Completed</Text>
      </Card>
      <CloseButton
        style={ styles.deleteButton }
        onPress={ () => dispatch(deleteList({id: id})) }
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
  cardContainer: {
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

export default TodoContainer;
