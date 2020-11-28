import React, { useState } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
// import { TextInput } from 'react-native-gesture-handler'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import ImagePic from '../components/imagePicker';
import { TextInput, Text, useTheme } from 'react-native-paper';

const visionSchema = yup.object({
    title: yup.string().required().min( 4 ),
})

export default function AddVision({ addVision }) {
    const [ imageState, getImageState ] =  useState('')
    console.log( ImagePic.setImage );
    return (
        <View>
            <Formik
                initialValues={{ uri: ImagePic.value, title:'', id:'' }}
                validationSchema={ visionSchema }
                onSubmit={ ( values, actions ) => {
                    actions.resetForm();
                    addVision( values );
                    console.log( values )
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
                        <ImagePic value={ formikProps.handleChange('uri') }/>
                        <FlatButton text='submit' onPress={ formikProps.handleSubmit }/>
                    </View>
                )}    
            </Formik>
        </View>
    )
}