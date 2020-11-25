import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
// import { TextInput } from 'react-native-gesture-handler'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { TextInput, Text, useTheme } from 'react-native-paper';

const todoSchema = yup.object({
    title: yup.string().required().min(4),
})

export default function AddTodo ({ addTodo }) {
    return (
            <Formik
                initialValues={{ title:'', key:''}}
                validationSchema={todoSchema}
                onSubmit={(values, actions) => {
                    addTodo(values);
                    actions.resetForm();
                }}
            >
                {(formikProps) => (
                    <View>
                        <TextInput
                            mode='flat'
                            placeholder='Todo Title'
                            onChangeText={formikProps.handleChange('title')}
                            value={formikProps.values.title}
                            onBlur={formikProps.handleBlur('title')}
                        />
                        <Text 
                            style={globalStyles.errorText}
                        >
                                {formikProps.touched.title && formikProps.errors.title}
                        </Text>
                        <FlatButton text='submit' onPress={formikProps.handleSubmit}/>
                    </View>
                )}    
            </Formik>
    )
}