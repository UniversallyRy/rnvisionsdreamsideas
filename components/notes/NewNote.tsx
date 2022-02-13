import React, { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Formik } from 'formik';
import { Input, Layout } from '@ui-kitten/components';
import * as yup from 'yup';
import { useAppDispatch } from '../../utils/hooks';
import { addNote } from '../../redux/reducers/note';
import { CloseButton, FormButton }  from '../../shared/buttons';

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
  name: yup.string().required().min(4),
});
// red, slate blue, black, dark gray, blueish gray, teal, tan
const AddNoteModal: FunctionComponent<ModalProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  return (
      <Layout style={ styles.container }>
        <CloseButton
          style={ styles.close }
          accessibilityLabel='Closes Modal'
          onPress={ () => closeModal() }
        />
        <Layout style={ styles.form }>
          <Text style={ styles.title }>Create A New Note</Text>
          <Formik
            initialValues={{ name: '', id: 0 }}
            validationSchema={ listSchema }
            onSubmit={ (values, actions) => {
              dispatch(addNote(values));
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
                  placeholder='Enter A New Note . . .'
                  onChangeText={ handleChange('name') }
                  value={ values.name }
                  onBlur={ handleBlur('name') }
                  autoCorrect
                />

                <Text style={ styles.errorText }>
                  { touched.name && errors.name }
                </Text>
                <FormButton 
                  onPress={ handleSubmit }
                  text='Add Note'
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

export default AddNoteModal;
