import React, { FC } from 'react';
import { FlatList, Text, Keyboard, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Card, Input, Layout, Divider } from '@ui-kitten/components';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { CloseButton, SubmitButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { deleteNote, addNote, NoteProps } from '../../redux/reducers/note';

type NoteModalProps = {
  notes: NoteProps[];
  closeModal: (() => void);
}

interface Styles {
  container: ViewStyle;
  close: ViewStyle;
  header: TextStyle;
  divider: ViewStyle;
  taskCount: ViewStyle;
  footer: ViewStyle;
  noteInput:TextStyle;
  buttonStyle:ViewStyle;
  noteContainer:ViewStyle;
  deleteNoteButton:ViewStyle;
  noteErrorText:TextStyle;
}

const noteSchema = yup.object({
  name: yup.string().required().min(6),
});

const NotesModal: FC<NoteModalProps> = ({ notes, closeModal }) => {
  const taskCount = notes.length;
  const dispatch = useAppDispatch();

  const renderNote = ( item:any) => {
    const { name, id } = item;
    return (
        <Card 
          style={ styles.noteContainer }
        >
          <Text>{ name }</Text>
          <CloseButton
            style={styles.deleteNoteButton}
            onPress={ () => dispatch(deleteNote({ id })) }
          />
        </Card>
    );
  };

  return (
    <Layout style={ styles.container } >
      <CloseButton
        style={ styles.close }
        onPress={ closeModal }
      />
        <Layout
          style={[
            styles.header,
            { borderBottomColor: 'red' },
          ]}
        >
          <Divider style={ styles.divider }/>
          <Text style={ styles.taskCount }>There are { taskCount } Notes</Text>
        </Layout>
        <Layout>
          <FlatList
            data={ notes }
            keyExtractor={ (_, index) => index.toString()  }
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            renderItem={ ({ item }) => renderNote(item) }
          />
          </Layout>
          <Formik
            initialValues={{ name: '', id: '' }}
            validationSchema={ noteSchema }
            onSubmit={ (values: NoteProps, actions:FormikHelpers<NoteProps>) => {
              dispatch(addNote(values));
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
                    style={ styles.noteInput }
                    placeholder='Enter Note . . .'
                    onChangeText={ handleChange('name') }
                    value={ values.name }
                    onBlur={ handleBlur('name') }
                  />
                  <Text style={ styles.noteErrorText }>
                    { touched.name && errors.name }
                  </Text>
                </Layout>
                <SubmitButton
                  style={ styles.buttonStyle }
                  onPress={ handleSubmit }
                >
                </SubmitButton>
              </Layout>
            )}
          </Formik>   
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: windowWidth,
    height: windowHeight
  },
  close: {
    position: 'absolute', 
    top: 40, 
    right: 32, 
    zIndex: 10,
  },
  header: {
    marginTop: 10,
    marginLeft: 10,
    borderBottomWidth: 2,
  },
  divider: {
    marginTop: 35,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: 'black',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  noteInput: {
    width: windowWidth * 0.75,
    paddingLeft: 14,
    marginLeft: 5,
    marginRight: 5,
    elevation: 3,
  },
  noteErrorText:{
    fontSize: 10,
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  buttonStyle: {
    height: 30,
    margin: 'auto',
  },
  noteContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: windowWidth * 0.995,
  },
  deleteNoteButton: {
    marginLeft: 'auto',
    marginRight: 3,
  },
});

export default NotesModal;
