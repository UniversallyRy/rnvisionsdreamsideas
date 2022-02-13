import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { windowHeight } from '../../utils/dimensions';
import { useAppDispatch } from '../../utils/hooks';
import { addJournal } from '../../redux/reducers/journals';
import { SubmitButton } from '../../shared/buttons';

type AddJournalProps = {
  setModalOpen: ((i:boolean) => void);
}

interface Styles {
  modalContainer: ViewStyle;
  errorText: TextStyle;
}

// schema to force form input values to have a minimum length of 4.
const JournalSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(4),
});

const AddJournal: FunctionComponent<AddJournalProps> = ({ setModalOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <Layout style={styles.modalContainer}>
      <Formik
        // Controls whether Formik should reset the form if initialValues changes
        enableReinitialize
        initialValues={{ title: '', body: '' }}
        validationSchema={JournalSchema}
        onSubmit={(values, actions) => {
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
        }) => (
          <>
            <Input
              textAlign='center'
              placeholder='Journal Title'
              onChangeText={handleChange('title')}
              value={values.title}
              onBlur={handleBlur('title')}
              accessibilityLabel='Input Journal Title Here'
            />
            <Text style={styles.errorText}>
              {/* when both are true, child with validation text shows. */}
              {touched.title && errors.title}
            </Text>
            <Input
              textAlign='center'
              multiline
              placeholder='Journal Body'
              onChangeText={handleChange('body')}
              value={values.body}
              onBlur={handleBlur('body')}
              accessibilityLabel='Input Journal body text Here'
            />
            <Text style={styles.errorText}>
              {touched.body && errors.body}
            </Text>
            <SubmitButton onPress={handleSubmit} accessibilityLabel='Clicking here adds journal entry'>
              Submit
            </SubmitButton>
          </>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  modalContainer: {
    height: windowHeight,
  },
  errorText: {
    fontFamily: 'roboto-bold',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default AddJournal;
