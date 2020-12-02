import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { connect } from 'react-redux';
import { TextInput, Text } from 'react-native-paper';
import { addTodo } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const todoSchema = yup.object({
    task: yup.string().required().min(4),
})


export const storeData = async ( value ) => {
    try {
      const jsonValue = JSON.stringify( value )
      await AsyncStorage.setItem( '@todos', jsonValue )
      alert( 'Data successfully saved' )
      setModalOpen( false );
      console.log( 'storageKey' )
    } catch (e) {
      alert( 'Failed to save the data to the storage' )
    }
  }

export function AddTodo ({ addTodo }) {

    return (
            <Formik
                initialValues={{ task: '', id: '', complete: false}}
                validationSchema={ todoSchema }
                onSubmit={( values, actions ) => {
                    addTodo( values.task );
                    actions.resetForm();
                    
                }}
            >
                { ( formikProps ) => (
                    <View>
                        <TextInput
                            mode='flat'
                            placeholder='Enter Todo . . .'
                            onChangeText={ formikProps.handleChange( 'task' ) }
                            value={ formikProps.values.task }
                            onBlur={ formikProps.handleBlur( 'task' ) }
                        />
                        <Text 
                            style={ globalStyles.errorText }
                        >
                                { formikProps.touched.task && formikProps.errors.task }
                        </Text>
                        <FlatButton text='submit' onPress={ formikProps.handleSubmit }/>
                    </View>
                )}    
            </Formik>
    )
}
const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.todos,
    }
  }
  
  const mapDispatchToProps = { addTodo }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddTodo )