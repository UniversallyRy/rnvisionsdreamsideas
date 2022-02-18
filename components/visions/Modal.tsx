import React, { Dispatch, FC, SetStateAction } from 'react';
import { Animated, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useCardAnimation } from '@react-navigation/stack';
import { Layout, Input } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import ModalImage from './ImagePicker';
import { CloseButton, SubmitButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { addVision } from '../../redux/reducers/visions';

type ModalProps = {
  picInput: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
}

interface Styles {
  container: ViewStyle;
  textinput: TextStyle;
  errorText: TextStyle;
  footer: ViewStyle;
  button: ViewStyle;
}

const pictureSchema = yup.object({
  title: yup.string().required().min(4),
});

const ModalContent: FC<ModalProps> = ({ picInput, setModalOpen }) => {

  const { current } = useCardAnimation();
  const dispatch = useAppDispatch()
  return (
    <Layout>
      <Animated.View 
        style={{
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
          ...styles.container
        }}
      > 
        <TouchableOpacity
          style={{ position: 'absolute', top: 40, right: 32, zIndex: 10 }}
        >
          <CloseButton onPress={ () => setModalOpen(false) } />
        </TouchableOpacity>
        <Formik
          enableReinitialize={ true }
          initialValues={{ uri: picInput, title: '', id: null }}
          validationSchema={ pictureSchema }
          onSubmit={ (values, actions) => {
            dispatch(addVision(values));
            actions.resetForm();
            setModalOpen(false);
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
            <Layout style={styles.footer}> 
              <ModalImage />
              <Input
                textAlign='center'
                style={ styles.textinput }
                placeholder='Vision Title'
                onChangeText={ handleChange('title') }
                value={ values.title }
                onBlur={ handleBlur('title') }
              />
              <Text style={ styles.errorText }>
                { touched.title && errors.title }
              </Text>
              <SubmitButton
                style={ styles.button }
                onPress={ handleSubmit }
              />
            </Layout>
        )}
        </Formik>
      </Animated.View>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: windowHeight,
    width: windowWidth,
    margin:'auto',
    fontFamily: 'roboto-black',
  },
  textinput: {
    width: windowWidth * 0.75,
    height: 60,
    marginRight: 3,
  },
  button: {
    height: 25,
    width: 25,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  errorText:{
    fontFamily: 'roboto-bold',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});

const mapStateToProps = (state:any) => {
  const { pic } = state;
  return { picInput: pic };
};

export default connect(mapStateToProps)(ModalContent);
export type PropsFromRedux = ConnectedProps<typeof ModalContent>;
