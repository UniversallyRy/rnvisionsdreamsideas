import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button';
import ImagePic from './imagePicker';
import { TextInput, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { addVision } from '../../redux/actions';

const visionSchema = yup.object({
    title: yup.string().required().min( 4 ),
})

export function AddVision({ addVision, stateUri}) {
    return (
        <View>
            <Formik
                enableReinitialize={true}
                initialValues={{ uri: stateUri, title:'', id:null }}
                validationSchema={ visionSchema }
                onSubmit={ ( values, actions ) => {
                    console.log( stateUri )
                    addVision( values );
                    actions.resetForm();
                }}
            >
                {( formikProps ) => (
                    <View>
                        <TextInput
                            mode='outlined'
                            placeholder='Vision Title'
                            onChangeText={ formikProps.handleChange( 'title' ) }
                            value={ formikProps.values.title }
                            onBlur={ formikProps.handleBlur( 'title' ) }
                        />
                        <Text 
                            style={ globalStyles.errorText }
                        >
                                { formikProps.touched.title && formikProps.errors.title }
                        </Text>
                        <ImagePic />
                        <FlatButton text='submit' onPress={ formikProps.handleSubmit }/>
                    </View>
                )}    
            </Formik>
        </View>
    )
}

const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.visions,
      stateUri: state.pic
    }
  }
  
  const mapDispatchToProps = { addVision }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddVision )