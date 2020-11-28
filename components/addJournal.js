import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { TextInput, Text, useTheme } from 'react-native-paper';

const JournalSchema = yup.object({
    title: yup.string().required().min(4),
})

export default function AddJournal ({ addJournal }) {
    const { colors } = useTheme();
    return (
            <Formik
                initialValues={{ title:'', body:'', key:''}}
                validationSchema={ JournalSchema }
                onSubmit={( values, actions ) => {
                    actions.resetForm();
                    addJournal( values );
                    console.log( values )
                }}
            >
                {( formikProps ) => (
                    <View>
                        <TextInput
                            style={ colors }
                            mode='flat'
                            placeholder='Journal Title'
                            onChangeText={ formikProps.handleChange( 'title' ) }
                            value={ formikProps.values.title }
                            onBlur={ formikProps.handleBlur( 'title' ) }
                        />
                        <Text 
                            style={ globalStyles.errorText } 
                        >
                                { formikProps.touched.title && formikProps.errors.title }
                        </Text>
                        <TextInput
                            multiline
                            style={ colors }
                            mode='flat'
                            placeholder='Journal Body'
                            onChangeText={ formikProps.handleChange( 'body' ) }
                            value={ formikProps.values.body }
                            onBlur={ formikProps.handleBlur( 'body' ) }
                        />
                        <Text 
                            style={ globalStyles.errorText }
                        >
                            { formikProps.touched.body && formikProps.errors.body }
                        </Text>
                        <FlatButton text='submit' onPress={ formikProps.handleSubmit }/>
                    </View>
                )}    
            </Formik>
    )
}