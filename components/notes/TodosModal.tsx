import React, { FC, useEffect } from 'react';
import { Keyboard, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Layout, List, Input, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup'; 
import Todo from './Todo';
import { TodoListProps, TodoProps, addTodo } from '../../redux/reducers/todos';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { CloseButton, SubmitButton } from '../../shared/buttons';


type TodoModalProps = {
  list: TodoListProps;
  closeModal: (() => void);
  completedList: ((count1: number, count2: number) => void);
}

interface Styles {
  container: ViewStyle;
  close: ViewStyle;
  header: TextStyle;
  title: TextStyle;
  taskCount: ViewStyle;
  footer: ViewStyle;
  todoInput:TextStyle;
  buttonStyle:ViewStyle;
  todoContainer:ViewStyle;
  todo:TextStyle;
  deleteButton:ViewStyle;
  deleteTodoButton:ViewStyle;
  ideaErrorText:TextStyle;
}

const todoSchema = yup.object({
  title: yup.string().required().min(4),
});

const TodosModal: FC<TodoModalProps> = ({ completedList, list, closeModal }) => {
  const { name, id, color, todos } = list;
  const taskCount = todos.length;
  const completedCount = todos.filter((todo:any) => todo.completed).length;
  const dispatch = useAppDispatch()


  useEffect(() => {
    const init = () => {
      let newNum = taskCount - completedCount
      completedList(newNum, completedCount);
    }
    return () => {
      init();
    }
  }, [todos]);
  
  const renderTodo = (todo: TodoProps, id: string) => {
    return <Todo item={ todo } listId={ id } />
  };

  return (
    <Layout style={ styles.container }>
      <CloseButton
        style={ styles.close }
        onPress={ closeModal }
      />
      <Layout
        style={[
          styles.header,
          { borderBottomColor: color },
        ]}
      >
        <Text style={ styles.title }>{ name }</Text>
        <Text style={ styles.taskCount }>
          Completed { completedCount } of { taskCount } tasks
        </Text>
      </Layout>
      <List
        data={ todos }
        keyExtractor={ (_, index) => index.toString() }
        showsVerticalScrollIndicator={ false }
        renderItem={ ({ item }) => renderTodo(item, id) }
      />
      <Formik
        initialValues={{ title: '', listId: '' }}
        validationSchema={ todoSchema }
        onSubmit={ (values, actions) => {
          values.listId = id
          let newNum = taskCount - completedCount
          dispatch(addTodo(values));
          completedList(newNum, completedCount);
          actions.resetForm();
          Keyboard.dismiss();
        }}
      >
        {({
          handleChange,
          values,
          handleBlur,
          touched,
          errors,
          handleSubmit,
        }) => (
          <Layout style={ styles.footer }>
            <Layout style={{ flexDirection: 'column' }}>
              <Input
                textAlign='center'
                enablesReturnKeyAutomatically={ true }
                autoCorrect={ true }
                style={ styles.todoInput }
                placeholder='Enter Todo . . .'
                onChangeText={ handleChange('title') }
                value={ values.title }
                onBlur={ handleBlur('title') }
              />
              <Text style={ styles.ideaErrorText }>
                { touched.title && errors.title || '' }
              </Text>
            </Layout>
            <SubmitButton
              style={ styles.buttonStyle }
              onPress={ handleSubmit }
            />
          </Layout>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
  close: {
    position: 'absolute', 
    top: 40, 
    right: 32, 
    zIndex: 10 
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 10,
    borderBottomWidth: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: 'gray',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  todoInput: {
    width: windowWidth * 0.75,
    paddingLeft: 14,
    marginLeft: 4,
    marginRight: 5,
    elevation: 3,
  },
  ideaErrorText:{
    fontSize: 10,
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  buttonStyle: {
    height: 20,
    margin: 'auto',
    marginLeft: 2,
    borderRadius: 4,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  todo: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteTodoButton: {
    marginLeft: 'auto',
    color: 'red',
    width: 30
  },
});

export default TodosModal;
