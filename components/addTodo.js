import React, { useState } from 'react';
import { View } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { TextInput, Text, Button } from 'react-native-paper';
import { addTodo } from '../redux/actions';

const todoSchema = yup.object({
    task: yup.string().required().min(4),
});

export function AddTodo ({ addTodo }) {
  const [text, setText] = useState({
    id:null, 
    task:'',
  });

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
                    <View style={globalStyles.addTodoForm}>
                        <TextInput
                            style={globalStyles.todoInput}
                            multiline
                            placeholder='Enter Todo . . .'
                            onChangeText={ formikProps.handleChange( 'task' ) }
                            value={ formikProps.values.task }
                            onBlur={ formikProps.handleBlur( 'task' ) }
                        />
                        <Button icon='plus' style={globalStyles.addTodoButton} text='new' onPress={ formikProps.handleSubmit }>
                        <Text style={ globalStyles.addTodoButtonText }> Add Todo </Text>
                        </Button>
                        <Text 
                            style={ globalStyles.todoErrorText }
                        >
                                { formikProps.touched.task && formikProps.errors.task }
                        </Text>
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