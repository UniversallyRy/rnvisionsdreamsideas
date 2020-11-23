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
    const {colors} = useTheme();
    return (
        <View>
            <Formik
                initialValues={{ title:'', body: ''}}
                validationSchema={todoSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addTodo(values);
                }}
            >
                {(formikProps) => (
                    <View>
                        <TextInput
                            mode='outlined'
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
                        <TextInput
                            placeholder='Todo Body'
                            onChangeText={formikProps.handleChange('body')}
                            value={formikProps.values.body}
                            onBlur={formikProps.handleBlur('body')}
                        />
                        <Text 
                            style={globalStyles.errorText}
                        >
                                {formikProps.touched.body && formikProps.errors.body}
                        </Text>
                        <Text 
                            style={globalStyles.errorText}
                        >
                                {formikProps.touched.rating && formikProps.errors.rating}
                        </Text>
                        <FlatButton text='submit' onPress={formikProps.handleSubmit}/>
                    </View>
                )}    
            </Formik>
        </View>
    )
}