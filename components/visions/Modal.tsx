import React, { Dispatch, FC, SetStateAction } from 'react';
import { Animated, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useCardAnimation } from '@react-navigation/stack';
import { connect, ConnectedProps } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input, Layout } from '@ui-kitten/components';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { addVision } from '../../redux/reducers/visions';
import ImagePic from './ImagePicker';
import { CloseButton, SubmitButton } from '../../shared/buttons';

interface VisionProps {
  stateUri: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
}

interface Styles {
  container: ViewStyle;
  textinput: TextStyle;
  errorText: TextStyle;
  visionAddToggle: ViewStyle;
  footer: ViewStyle;
  buttonStyle: ViewStyle;
}

const visionSchema = yup.object({
  title: yup.string().required().min(4),
});

const ModalContent: FC<VisionProps> = ({ stateUri, setModalOpen }) => {
  const dispatch = useAppDispatch()
  const { current } = useCardAnimation();
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
          initialValues={{ uri: stateUri, title: '', id: null }}
          validationSchema={ visionSchema }
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
              <ImagePic/>
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
                style={ styles.buttonStyle }
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
  visionAddToggle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textinput: {
    width: windowWidth * 0.75,
    height: 60,
    marginRight: 3,
  },
  buttonStyle: {
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
  return {
    stateUri: state.pic,
  };
};

export default connect(mapStateToProps)(ModalContent);
export type PropsFromRedux = ConnectedProps<typeof ModalContent>
