import React from 'react'
import { Keyboard, StyleSheet } from 'react-native';
import { AnyAction } from 'redux';
import { Formik, FormikHelpers } from 'formik';
import { Input, Layout, Text } from '@ui-kitten/components';
import { SubmitButton } from './Buttons';
import { useAppDispatch } from '../utils/hooks';
import { windowWidth } from '../utils/constants';
import { IdeaType } from '../redux/reducers/ideas';
import { TodoType } from '../redux/reducers/todos';
import { InputStyles } from './styles';

interface FooterProps extends IdeaType, TodoType { }

type InputProps = {
  inputName: string;
  reducerFunc: (_values: FooterProps) => AnyAction;
  inputSchema: string;
}

export const FooterInput = ({ inputName, reducerFunc, inputSchema }: InputProps): JSX.Element => {

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ inputValue: '', inputId: '' }}
      validationSchema={inputSchema}
      onSubmit={(values: FooterProps, actions: FormikHelpers<FooterProps>): void => {
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
      }): JSX.Element => (
        <Layout style={styles.container}>
          <Layout style={{ flexDirection: 'column' }}>
            <Input
              textAlign='center'
              enablesReturnKeyAutomatically={true}
              autoCorrect={true}
              style={styles.input}
              placeholder={`Enter ${inputName} . . .`}
              onChangeText={handleChange('inputValue')}
              value={values.inputValue}
              onBlur={handleBlur('inputValue')}
            />
            <Text style={styles.errorText}>
              {touched.inputValue && errors.inputValue || ''}
            </Text>
          </Layout>
          <SubmitButton
            onPress={handleSubmit}
          >
          </SubmitButton>
        </Layout>
      )}
    </Formik>
  );

};

const styles = StyleSheet.create<InputStyles>({
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
  errorText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
  },
});
