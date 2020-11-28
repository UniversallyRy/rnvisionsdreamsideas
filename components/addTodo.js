import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { TextInput, Text } from 'react-native-paper';

const todoSchema = yup.object({
    title: yup.string().required().min(4),
})

export default function AddTodo ({ key, addTodo }) {
    return (
            <Formik
                initialValues={{ title:'', item:[{ key:'', id: '' }]}}
                validationSchema={ todoSchema }
                onSubmit={( values, actions ) => {
                    addTodo( key = "@save_todo", values );
                    actions.resetForm();
                }}
            >
                { ( formikProps ) => (
                    <View>
                        <TextInput
                            mode='flat'
                            placeholder='Todo Title'
                            onChangeText={ formikProps.handleChange( 'title' ) }
                            value={ formikProps.values.title }
                            onBlur={ formikProps.handleBlur( 'title' ) }
                        />
                        <Text 
                            style={ globalStyles.errorText }
                        >
                                { formikProps.touched.title && formikProps.errors.title }
                        </Text>
                        <FlatButton text='submit' onPress={ formikProps.handleSubmit }/>
                    </View>
                )}    
            </Formik>
    )
}