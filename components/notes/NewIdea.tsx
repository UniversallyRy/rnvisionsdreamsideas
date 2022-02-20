import React, { FC } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Formik } from 'formik';
import { Input, Layout, Text } from '@ui-kitten/components';
import * as yup from 'yup';
import { useAppDispatch } from '../../utils/hooks';
import { addIdea } from '../../redux/reducers/ideas';
import { CloseButton, FormButton }  from '../../shared/buttons';
import { windowHeight, windowWidth } from '../../utils/dimensions';

type ModalProps = {
  closeModal: (() => void);
}

interface Styles {
  container: ViewStyle;
  close: ViewStyle;
  form: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  errorText: TextStyle;
  colorSelect: ViewStyle;
}

const listSchema = yup.object({
  inputValue: yup.string().required().min(4),
});
// red, slate blue, black, dark gray, blueish gray, teal, tan
const IdeaModal: FC<ModalProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  return (
      <Layout style={ styles.container }>
        <CloseButton
          style={ styles.close }
          accessibilityLabel='Closes Modal'
          onPress={ () => closeModal() }
        />
        <Layout style={ styles.form }>
          <Text style={ styles.title }>Type New Idea</Text>
          <Formik
            initialValues={{ inputValue: '', inputId: 0 }}
            validationSchema={ listSchema }
            onSubmit={ (values, actions) => {
              dispatch(addIdea(values));
              actions.resetForm();
              closeModal();
            }}
          >
            {({
              handleChange,
              values,
              handleBlur,
              handleSubmit,
              touched,
              errors,
            }) => (
              <Layout>
                <Input
                  textAlign='center'
                  enablesReturnKeyAutomatically={ true }
                  style={ styles.input }
                  placeholder='Enter idea . . .'
                  onChangeText={ handleChange('inputValue') }
                  value={ values.inputValue }
                  onBlur={ handleBlur('inputValue') }
                  autoCorrect
                />

                <Text style={ styles.errorText }>
                  { touched.inputValue && errors.inputValue || '' }
                </Text>
                <FormButton 
                  onPress={ handleSubmit }
                  text='Add Idea'
                  color='green'
                />
              </Layout>
            )}
          </Formik>
        </Layout>
      </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: 64, 
    right: 32, 
  },
  form: {
    alignSelf: 'stretch', 
    marginHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    marginTop: 8,
    paddingHorizontal: 18,
  },
  errorText: {
    fontFamily: 'roboto-bold',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default IdeaModal;
