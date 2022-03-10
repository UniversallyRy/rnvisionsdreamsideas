import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Layout, Input, Text } from '@ui-kitten/components';
import { NewIdeaStyles } from './Styles';
import { CloseButton, FormButton }  from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { addIdea, IdeaType } from '../../redux/reducers/ideas';
import { windowHeight, windowWidth } from '../../utils/constants';

type ModalProps = {
  closeModal: (() => void);
}

const listSchema = yup.object({
  inputValue: yup.string().required().min(4),
});
// red, slate blue, black, dark gray, blueish gray, teal, tan
const IdeaModal: FC<ModalProps> = ({ closeModal }): JSX.Element => {

  const dispatch = useAppDispatch();

  return (
      <Layout style={ styles.container }>
        <CloseButton
          style={ styles.close }
          accessibilityLabel='Closes Modal'
          onPress={ (): void => closeModal() }
        />
        <Layout style={ styles.form }>
          <Text style={ styles.title }>Type New Idea</Text>
          <Formik
            initialValues={{ inputValue: '', inputId: '' }}
            validationSchema={ listSchema }
            onSubmit={ (values: IdeaType, actions): void => {
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
            }): JSX.Element => (
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

const styles = StyleSheet.create<NewIdeaStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
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
