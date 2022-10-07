import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import { NewTodoStyles } from './Styles';
import { CloseButton, FormButton }  from '../../shared/buttons';
import { addList } from '../../redux/reducers/todos';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/constants';

type ModalProps = {
  closeModal: (() => void);
}

const listSchema = yup.object({
  name: yup.string().required().min(4),
});
// red, slate blue, black, dark gray, blueish gray, teal, tan
const NewTodoList: FC<ModalProps> = ({ closeModal }): JSX.Element => {

  const dispatch = useAppDispatch()
  const bgColors = [
    '#FE1F14',
    '#B9D3EE',
    '#000000',
    '#57575E',
    '#2E4045',
    '#83ADB5',
    '#BFB5B2',
  ];
  const [bgColor, setColor] = useState(bgColors[0]);

  const renderColors = (): JSX.Element[] => bgColors.map((color): JSX.Element => (
    <Button
      key={ color }
      style={ [styles.colorSelect, { backgroundColor: color }] }
      onPress={ (): void => setColor(color) }
    />
  ));

  return (
      <Layout style={ styles.container } >
        <CloseButton
          style={ styles.close }
          accessibilityLabel='Closes Modal'
          onPress={ () => closeModal() }
        />
        <Layout style={ styles.form }>
          <Text style={ styles.title }>Create Todo List</Text>
          <Formik
            initialValues={{ name: '', id: 0, color: '', todos: [] }}
            validationSchema={ listSchema }
            onSubmit={ (values, actions): void => {
              values.color = bgColor;
              dispatch(addList(values));
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
                  autoCorrect={ true }
                  style={ styles.input }
                  placeholder='Enter A New List . . .'
                  onChangeText={ handleChange('name') }
                  value={ values.name }
                  onBlur={ handleBlur('name') }
                />

                <Text style={ styles.errorText }>
                  { touched.name && errors.name || '' }
                </Text>
                <Layout style={ styles.colorContainer }>
                  { renderColors() }
                </Layout>
                  <FormButton color={ bgColor } text='Add List' onPress={ handleSubmit }/>
              </Layout>
            )}
          </Formik>
        </Layout>
      </Layout>
  );

};

const styles = StyleSheet.create<NewTodoStyles>({
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
    right: 32
  },
  form: {
    alignSelf: 'stretch',
    marginHorizontal: 32
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
    fontSize: 18,
  },
  errorText:{
    fontFamily: 'roboto-bold',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  colorSelect: {
    width: 30,
    height: 30,
    marginBottom: 10,
    borderWidth: 0,
    borderRadius: 2,
    elevation: 2,
  },
});

export default NewTodoList;
