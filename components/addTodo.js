import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik , withFormik} from 'formik'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { TextInput, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/actions';
import uuidv4 from 'uuid';

const todoSchema = yup.object({
    title: yup.string().required().min(4),
})

const onSubmit = (values, actions) => {
    addTodo(values)
    actions.resetForm();
}

export  function AddTodo ({ props, addTodo, state}) {
    return (
            <Formik
                enableReinitialize={true}
                initialValues={ state }
                validationSchema={ todoSchema }
                onSubmit={onSubmit}
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

const mapStateToProps = (state, ownProps) => {
      return {
          state:state
      }
  }
  
  const mapDispatchToProps = { addTodo, deleteTodo }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddTodo)