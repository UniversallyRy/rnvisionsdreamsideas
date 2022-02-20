import React, { FC } from 'react'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, Text, CheckBox } from '@ui-kitten/components';
import { deleteTodo, TodoProps, toggleTodo } from '../../redux/reducers/todos';
import { CloseButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';

type SingleTodo = {
    item: TodoProps; 
    listId: string;   
}  

interface Styles {
    todoContainer:ViewStyle;
    todo:TextStyle;
    deleteButton:ViewStyle;
}

const Todo:FC<SingleTodo> = ({ item, listId }) => {
    const { title, id, completed } = item;
    const dispatch = useAppDispatch()

    return (
      <Layout style={ styles.todoContainer } level='1'>
        <CheckBox
          checked={ completed }
          onChange={ () => dispatch(toggleTodo({ id: id, listId })) }
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
          { title }
        </Text>
        <CloseButton
          style={ styles.deleteButton }
          onPress={ () => dispatch(deleteTodo({ id:id, listId: listId })) }
        />
      </Layout>
    );
}

const styles = StyleSheet.create<Styles>({
    todoContainer: {
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
