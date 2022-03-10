import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Layout, Input, Text } from '@ui-kitten/components';
import { ModalStyles } from '../Styles';
import { SubmitButton } from '../../../shared/buttons';
import { useAppDispatch } from '../../../utils/hooks';
import { windowHeight } from '../../../utils/constants';
import { addJournal } from '../../../redux/reducers/journals';

type ModalProps = {
  setModalOpen: ((i:boolean) => void);
}
// schema to force form input values to have a minimum length of 4.
const JournalSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(4),
});

const NewJournalModal: FC<ModalProps> = ({ setModalOpen }): JSX.Element => {

  const dispatch = useAppDispatch();
  
  return (
    <Layout style={ styles.modalContainer }>
      <Formik
        // Controls whether Formik should reset the form if initialValues changes
        enableReinitialize
        initialValues={{ title: '', body: '' }}
        validationSchema={ JournalSchema }
        onSubmit={(values, actions): void => {
          dispatch(addJournal(values));
          actions.resetForm();
          setModalOpen(false);
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
          <>
            <Input
              textAlign='center'
              placeholder='Journal Title'
              onChangeText={handleChange('title')}
              value={ values.title }
              onBlur={ handleBlur('title') }
              accessibilityLabel='Input Journal Title Here'
            />
            <Text style={styles.errorText}>
              {/* when both are true, child with validation text shows. */}
              { touched.title && errors.title || '' }
            </Text>
            <Input
              textAlign='center'
              multiline={true}
              placeholder='Journal Body'
              onChangeText={ handleChange('body') }
              value={ values.body }
              onBlur={ handleBlur('body') }
              accessibilityLabel='Input Journal body text Here'
            />
            <Text style={ styles.errorText }>
              { touched.body && errors.body || '' }
            </Text>
            <SubmitButton onPress={ handleSubmit } accessibilityLabel='Clicking here adds journal entry'>
              Submit
            </SubmitButton>
          </>
        )}
      </Formik>
    </Layout>
  );
  
};

const styles = StyleSheet.create<ModalStyles>({
  modalContainer: {
    height: windowHeight,
  },
  errorText: {
    fontFamily: 'roboto-bold',
    textAlign: 'center',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
  },
});

export default NewJournalModal;
