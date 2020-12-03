import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { connect } from 'react-redux';
import { editTodo, addText } from '../redux/actions';
import { globalStyles } from '.././styles/global'
import { Formik } from 'formik'

export function EditTodo ({ editTodo, item, state }) {

    const editedTodo = () => {
        // 
        var buttonId = item
        //calls redux action on stored todoss
        editTodo()
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{ task: item.task, id:item.id, complete: false}}
            onSubmit={( values, actions ) => {
                editTodo( values );
                actions.resetForm();
                setModalOpen(false);
            }}
        >
            {( formikProps ) => (
                <View>
                    <TextInput
                        mode='flat'
                        placeholder='Edit Todo'
                        onChangeText={ formikProps.handleChange( 'task' ) }
                        value={ formikProps.values.title }
                        onBlur={ formikProps.handleBlur( 'task' ) }
                    />
                    <Text 
                        style={ globalStyles.errorText } 
                    >
                            { formikProps.touched.title && formikProps.errors.title }
                    </Text>
                    <Button text='submit' onPress={ formikProps.handleSubmit }/>
                </View>
            )}    
        </Formik>
)
}

const styles = StyleSheet.create({
    editButton: {
        margin: 5
    },
    deleteButton: {
        margin: 5,
    }
})

const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.todos,
      task: state.todos.text
    }
  }
  
  const mapDispatchToProps = { editTodo, addText }


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( EditTodo )