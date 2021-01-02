import React, {useEffect} from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button';
import ImagePicker from './imagePicker';
import { addVision } from '../../redux/actions';
import { globalStyles } from '../../styles/global';

const visionSchema = yup.object({
    title: yup.string().required().min( 4 ),
});

export function AddVision({ addVision, stateUri, setModalOpen }) {
    return (
        <View style={{ margin: 15, marginTop: 100 }}>
            <Formik
                enableReinitialize={ true }
                initialValues={{ uri: stateUri, title: '', id: null }}
                validationSchema={ visionSchema }
                onSubmit={ ( values, actions ) => {
                    addVision( values );
                    setModalOpen ( false )
                    actions.resetForm()
                }}
            >
                {( formikProps ) => (
                    <>
                        <TextInput
                            mode='outlined'
                            placeholder='Vision Title'
                            onChangeText={ formikProps.handleChange( 'title' ) }
                            value={ formikProps.values.title }
                            onBlur={ formikProps.handleBlur( 'title' ) }
                        />
                        <Text style={ globalStyles.errorText }>
                                { formikProps.touched.title && formikProps.errors.title }
                        </Text>
                        <ImagePicker />
                        <FlatButton text='submit' onPress={ formikProps.handleSubmit }/>
                    </>
                )}    
            </Formik>
        </View>
    )
}

const mapStateToProps = ( state, ownProps ) => {
    return {
      stateUri: state.pic
    }
  }
  
  const mapDispatchToProps = { addVision }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( AddVision )