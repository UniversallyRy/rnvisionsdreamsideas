import React from 'react'
import { Keyboard, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Layout, Input, Text } from '@ui-kitten/components';
import { InputStyles } from './Styles';
import { SubmitButton } from '../../../shared/buttons';
import { windowWidth } from '../../../utils/constants';
import { useAppDispatch } from '../../../utils/hooks';
import { addTodo, TodoType } from '../../../redux/reducers/todos';

type InputProps = {
  listId: string;
}

const todoSchema = yup.object({
  title: yup.string().required().min(4),
});

const InputTodo: React.FunctionComponent<InputProps> = ({ listId }): JSX.Element => {

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ inputValue: '', inputId: '' }}
      validationSchema={todoSchema}
      onSubmit={(values: TodoType, actions): void => {
        values.listId = listId;
        dispatch(addTodo(values));
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
      }): JSX.Element => (
        <Layout style={styles.footer}>
          <Layout style={{ flexDirection: 'column' }}>
            <Input
              textAlign='center'
              enablesReturnKeyAutomatically={true}
              autoCorrect={true}
              style={styles.todoInput}
              placeholder='Enter Todo . . .'
              onChangeText={handleChange('title')}
              value={values.inputValue}
              onBlur={handleBlur('title')}
            />
            <Text style={styles.errorText}>
              {touched.inputValue && errors.inputValue || ''}
            </Text>
          </Layout>
          <SubmitButton
            style={styles.button}
            onPress={handleSubmit}
          />
        </Layout>
      )}
    </Formik>
  );

};

const styles = StyleSheet.create<InputStyles>({
  footer: {
    flexDirection: 'row',
    width: windowWidth,
    marginTop: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  todoInput: {
    width: windowWidth * 0.75,
    marginLeft: 4,
    marginRight: 5,
    paddingLeft: 14,
    elevation: 3,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 10,
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
  },
  button: {
    height: 20,
    marginLeft: 10,
  },
});

export default InputTodo;
