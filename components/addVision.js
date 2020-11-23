import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
// import { TextInput } from 'react-native-gesture-handler'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { TextInput, Text, useTheme } from 'react-native-paper';

const visionSchema = yup.object({
    title: yup.string().required().min(4),
    body: yup.string().required().min(8),
})

export default function AddVision({ addVision }) {
    const {colors} = useTheme();
    return (
        <View>
            <Formik
                initialValues={{ title:'', body: ''}}
                validationSchema={visionSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addVision(values);
                }}
            >
                {(formikProps) => (
                    <View>
                        <TextInput
                            mode='outlined'
                            placeholder='Vision Title'
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
                            placeholder='Vision Body'
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