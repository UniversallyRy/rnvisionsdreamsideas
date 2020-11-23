import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
// import { TextInput } from 'react-native-gesture-handler'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { TextInput, Text, useTheme } from 'react-native-paper';

const dreamSchema = yup.object({
    title: yup.string().required().min(4),
    body: yup.string().required().min(8),
})

export default function AddDream({ addDream }) {
    const {colors} = useTheme();
    return (
        <View>
            <Formik
                initialValues={{ title:'', body: ''}}
                validationSchema={dreamSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addDream(values);
                }}
            >
                {(formikProps) => (
                    <View>
                        <TextInput
                            mode='outlined'
                            placeholder='Dream Title'
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
                            placeholder='Dream Body'
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