import React from 'react'
import { Keyboard, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, Input, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup'; 
import { SubmitButton } from '../../../shared/buttons';
import { windowWidth } from '../../../utils/dimensions';
import { useAppDispatch } from '../../../utils/hooks';
import { addTodo } from '../../../redux/reducers/todos';

interface Styles {
    footer: ViewStyle;
    todoInput: ViewStyle;
    errorText: TextStyle;
    button: TextStyle;
}

const todoSchema = yup.object({
    title: yup.string().required().min(4),
});
  
const InputTodo = ({ listId }) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
        initialValues={{ title: '', listId: '' }}
        validationSchema={ todoSchema }
        onSubmit={ (values, actions) => {
          values.listId = listId
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
              <Text style={ styles.errorText }>
                { touched.title && errors.title || '' }
              </Text>
            </Layout>
            <SubmitButton
              style={ styles.button }
              onPress={ handleSubmit }
            />
          </Layout>
        )}
      </Formik>
  )
}

const styles = StyleSheet.create<Styles>({
    footer: {
        flexDirection: 'row',
        marginTop: "auto",
        width: windowWidth,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    todoInput: {
        width: windowWidth * 0.75,
        paddingLeft: 14,
        marginLeft: 4,
        marginRight: 5,
        elevation: 3,
    },
    errorText:{
        fontSize: 10,
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    button: {
        height: 20,
        marginLeft: 10,
    },
  });
  
export default InputTodo;
