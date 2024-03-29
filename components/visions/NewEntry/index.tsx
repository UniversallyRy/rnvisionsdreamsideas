import React, { Dispatch, SetStateAction } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
// import { useCardAnimation } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Layout, Input, Text } from '@ui-kitten/components';
import ImagePicker from './ImagePicker';
import { CloseButton, SubmitButton } from '../../../shared/Buttons';
import { useAppDispatch } from '../../../utils/hooks';
import { windowHeight, windowWidth } from '../../../utils/constants';
import { addVision } from '../../../redux/reducers/visions';
import { StoreProps } from '../../../redux/store';
import { ModalStyles } from '../styles';

type ModalProps = {
  picInput: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const pictureSchema = yup.object({
  title: yup.string().required().min(4),
});

const NewEntry = ({ picInput, setModalOpen }: ModalProps): JSX.Element => {

  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Animated.View
        //   style={{
        //     transform: [
        //       {
        //         scale: current.progress.interpolate({
        //           inputRange: [0, 1],
        //           outputRange: [0.9, 1],
        //           extrapolate: 'clamp',
        //         }),
        //       },
        //     ],
        //   }}
        //
        style={styles.container}
      >
        <CloseButton
          style={styles.close}
          onPress={(): void => setModalOpen(false)}
        />
        <Formik
          enableReinitialize={true}
          initialValues={{ uri: picInput, title: '', id: null }}
          validationSchema={pictureSchema}
          onSubmit={(values, actions): void => {
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
          }): JSX.Element => (
            <Layout style={styles.footer}>
              <ImagePicker />
              <Input
                textAlign='center'
                style={styles.textinput}
                placeholder='Vision Title'
                onChangeText={handleChange('title')}
                value={values.title}
                onBlur={handleBlur('title')}
              />
              <Text style={styles.errorText}>
                {touched.title && errors.title || ''}
              </Text>
              <SubmitButton
                style={styles.button}
                onPress={handleSubmit}
              />
            </Layout>
          )}
        </Formik>
      </Animated.View>
    </Layout>
  );

};

const styles = StyleSheet.create<ModalStyles>({
  close: {
    position: 'absolute',
    top: 40,
    right: 32,
    zIndex: 10
  },
  container: {
    height: windowHeight,
    width: windowWidth,
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
  errorText: {
    fontFamily: 'roboto-bold',
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { pic } = state;
  return { picInput: pic };
};

export default connect(mapStateToProps)(NewEntry);
export type PropsFromRedux = ConnectedProps<typeof NewEntry>;
