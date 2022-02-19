import React, { FC } from 'react';
import { FlatList, Text, Keyboard, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Card, Input, Layout, Divider } from '@ui-kitten/components';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { CloseButton, SubmitButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { deleteIdea, addIdea, Ideas } from '../../redux/reducers/ideas';

type IdeaModalProps = {
  ideas: Ideas[];
  closeModal: (() => void);
}

interface Styles {
  container: ViewStyle;
  close: ViewStyle;
  header: TextStyle;
  divider: ViewStyle;
  taskCount: ViewStyle;
  footer: ViewStyle;
  ideaInput:TextStyle;
  buttonStyle:ViewStyle;
  ideaContainer:ViewStyle;
  deleteIdeaButton:ViewStyle;
  ideaErrorText:TextStyle;
}

const ideaSchema = yup.object({
  name: yup.string().required().min(6),
});

const IdeasModal: FC<IdeaModalProps> = ({ ideas, closeModal }) => {
  const taskCount = ideas.length;
  const dispatch = useAppDispatch();

  const renderIdea = ( item:any) => {
    const { name, id } = item;
    return (
        <Card 
          style={ styles.ideaContainer }
        >
          <Text>{ name }</Text>
          <CloseButton
            style={styles.deleteIdeaButton}
            onPress={ () => dispatch(deleteIdea({ id })) }
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
          <Text style={ styles.taskCount }>There are { taskCount } Ideas</Text>
        </Layout>
        <Layout>
          <FlatList
            data={ ideas }
            keyExtractor={ (_, index) => index.toString()  }
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            renderItem={ ({ item }) => renderIdea(item) }
          />
          </Layout>
          <Formik
            initialValues={{ name: '', id: '' }}
            validationSchema={ ideaSchema }
            onSubmit={ (values: Ideas, actions:FormikHelpers<Ideas>) => {
              dispatch(addIdea(values));
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
                    style={ styles.ideaInput }
                    placeholder='Enter Idea . . .'
                    onChangeText={ handleChange('name') }
                    value={ values.name }
                    onBlur={ handleBlur('name') }
                  />
                  <Text style={ styles.ideaErrorText }>
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
  ideaInput: {
    width: windowWidth * 0.75,
    paddingLeft: 14,
    marginLeft: 5,
    marginRight: 5,
    elevation: 3,
  },
  ideaErrorText:{
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
  ideaContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: windowWidth * 0.995,
  },
  deleteIdeaButton: {
    marginLeft: 'auto',
    marginRight: 3,
  },
});

export default IdeasModal;
