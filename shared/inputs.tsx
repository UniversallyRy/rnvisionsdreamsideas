import React from 'react'
import { Keyboard, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Input, Layout, Text } from '@ui-kitten/components';
import { Formik, FormikHelpers } from 'formik';
import { SubmitButton } from './buttons';
import { useAppDispatch } from '../utils/hooks';
import { windowWidth } from '../utils/dimensions';
import { Idea } from '../redux/reducers/ideas';
import { TodoProps } from '../redux/reducers/todos';

interface FooterProps extends Idea, TodoProps{}

interface Styles {
    container: ViewStyle;
    input:TextStyle;
    errorText:TextStyle;
}

export const FooterInput = ({ inputName, reducerFunc, inputSchema }) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
        initialValues={{ inputValue: '', inputId: '' }}
        validationSchema={ inputSchema }
        onSubmit={ (values: FooterProps, actions:FormikHelpers<FooterProps>) => {
          dispatch(reducerFunc(values));
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
          <Layout style={ styles.container }>
            <Layout style={{ flexDirection: 'column' }}>
              <Input
                textAlign='center'
                enablesReturnKeyAutomatically={ true }
                autoCorrect={ true }
                style={ styles.input }
                placeholder={ `Enter ${inputName} . . .` }
                onChangeText={ handleChange('inputValue') }
                value={ values.inputValue }
                onBlur={ handleBlur('inputValue') }
              />
              <Text style={ styles.errorText }>
                { touched.inputValue && errors.inputValue || ''}
              </Text>
            </Layout>
            <SubmitButton
              onPress={ handleSubmit }
            >
            </SubmitButton>
          </Layout>
        )}
    </Formik>  
  );
};

const styles = StyleSheet.create<Styles>({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        bottom: 0,
      },
    input: {
      width: windowWidth * 0.75,
      paddingLeft: 14,
      marginLeft: 5,
      marginRight: 5,
      elevation: 3,
    },
    errorText:{
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 'bold',
      color: 'crimson',
      marginBottom: 10,
      marginTop: 6,
    },
  });
  