import React from 'react';
import { View } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { addTodo } from '../../redux/actions';
import { globalStyles } from '../../styles/global';

const todoSchema = yup.object({
    task: yup.string().required().min( 4 ),
});

export function AddTodo ({ addTodo }) {
  
    return (
            <Formik 
                initialValues={{ task: '', id: '', complete: false }}
                validationSchema={ todoSchema }
                onSubmit={( values, actions ) => {
                    addTodo( values.task );
                    actions.resetForm();
                    
                }}
            >
                { ( formikProps ) => (
                    <View style={globalStyles.addTodoForm}>
                        <TextInput
                            enablesReturnKeyAutomatically={ true }
                            autoCorrect={ true }
                            style={ globalStyles.todoInput }
                            placeholder='Enter Todo . . .'
                            placeholderTextColor={ '#002C5F' }
                            onChangeText={ formikProps.handleChange( 'task' ) }
                            value={ formikProps.values.task }
                            onBlur={ formikProps.handleBlur( 'task' ) }
                        />
                        <Button icon='plus' style={ globalStyles.addTodoButton } text='new' onPress={ formikProps.handleSubmit }>
                        <Text style={ globalStyles.addTodoButtonText }>Add Todo</Text>
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
  )( AddTodo )