import React, { FC } from 'react';
import { View, Keyboard, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, Card, List, Input, Text } from '@ui-kitten/components';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { CloseButton, SubmitButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { Idea, addIdea, deleteIdea } from '../../redux/reducers/ideas';

type ModalProps = {
  ideas: Idea[];
  closeModal: (() => void);
}

interface Styles {
  container: ViewStyle;
  close: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  ideasList:ViewStyle;
  idea:ViewStyle;
  ideaContent:ViewStyle;
  ideaText:TextStyle;
  ideaDelete:ViewStyle;
  footerInput: ViewStyle;
  ideaInput:TextStyle;
  ideaErrorText:TextStyle;
}

const ideaSchema = yup.object({
  inputValue: yup.string().required().min(6),
});

const IdeasModal: FC<ModalProps> = ({ ideas, closeModal }) => {
  const ideaCount = ideas.length;
  const dispatch = useAppDispatch();

  const renderIdea = ( item: Idea) => {
    const { inputValue, inputId } = item;
    return (
        <Card style={ styles.idea }>
          <View style={ styles.ideaContent }>
            <Text style= { styles.ideaText}>{ inputValue }</Text>
            <CloseButton
              style={ styles.ideaDelete }
              onPress={ () => dispatch(deleteIdea({ inputId })) }
            />
          </View>
        </Card>
    );
  };

  return (
    <Layout style={ styles.container } >
      <CloseButton
        style={ styles.close }
        onPress={ closeModal }
      />
        <Layout style={ styles.header }>
          <Text style={ styles.headerText }>There are { ideaCount } Ideas</Text>
        </Layout>
        <Layout>
          <List
            style={ styles.ideasList }
            data={ ideas }
            keyExtractor={ (_, index) => index.toString() }
            renderItem={ ({ item }) => renderIdea(item) }
          />
          </Layout>
          <Formik
            initialValues={{ inputValue: '', inputId: '' }}
            validationSchema={ ideaSchema }
            onSubmit={ (values: Idea, actions:FormikHelpers<Idea>) => {
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
              <Layout style={ styles.footerInput }>
                <Layout style={{ flexDirection: 'column' }}>
                  <Input
                    textAlign='center'
                    enablesReturnKeyAutomatically={ true }
                    autoCorrect={ true }
                    style={ styles.ideaInput }
                    placeholder='Enter Idea . . .'
                    onChangeText={ handleChange('inputValue') }
                    value={ values.inputValue }
                    onBlur={ handleBlur('inputValue') }
                  />
                  <Text style={ styles.ideaErrorText }>
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
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  close: {
    position: 'absolute', 
    alignSelf: 'flex-end', 
    zIndex: 1,
  },
  header: {
    borderBottomColor: 'green',
    paddingTop: 10,
    paddingLeft: 5,
    borderBottomWidth: 3,
  },
  headerText: {
    color: 'black',
    marginTop: 4,
    marginBottom: 16,
  },
  ideasList: {
    marginTop: 10,
  },
  idea: {
    alignSelf: 'center',
    width: windowWidth * 0.99,
    margin: 2,
    elevation: 2,
  },
  
  ideaContent:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ideaText:{
    fontSize: 14,
  },
  ideaDelete: {
    marginLeft: 'auto',
  },
  ideaInput: {
    width: windowWidth * 0.75,
    paddingLeft: 14,
    marginLeft: 5,
    marginRight: 5,
    elevation: 3,
  },
  ideaErrorText:{
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
  },
  footerInput: {
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    bottom: 0,
  },
});

export default IdeasModal;
