import React, {useState} from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
import * as yup from 'yup'
import FlatButton from '../shared/button'
import { TextInput, Text, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { addJournal } from '../redux/actions';

const JournalSchema = yup.object({
    title: yup.string().required().min(4),
    body: yup.string().required().min(4),
})

export function AddJournal ({ addJournal }) {
    const { colors } = useTheme();
    const [ modalOpen, setModalOpen ] = useState( true );
    return (
            <Formik
                style={globalStyles.addJournalForm}
                enableReinitialize
                initialValues={{ title:'', body:'', id:''}}
                validationSchema={ JournalSchema }
                onSubmit={( values, actions ) => {
                    addJournal( values );
                    actions.resetForm();
                    setModalOpen(false);
                }}
            >
                {( formikProps ) => (
                    <View>
                        <TextInput
                            style={ colors }
                            mode='flat'
                            placeholder='Journal Title'
                            onChangeText={ formikProps.handleChange( 'title' ) }
                            value={ formikProps.values.title }
                            onBlur={ formikProps.handleBlur( 'title' ) }
                        />
                        <Text 
                            style={ globalStyles.errorText } 
                        >
                                { formikProps.touched.title && formikProps.errors.title }
                        </Text>
                        <TextInput
                            multiline
                            style={ colors }
                            mode='flat'
                            placeholder='Journal Body'
                            onChangeText={ formikProps.handleChange( 'body' ) }
                            value={ formikProps.values.body }
                            onBlur={ formikProps.handleBlur( 'body' ) }
                        />
                        <Text 
                            style={ globalStyles.errorText }
                        >
                            { formikProps.touched.body && formikProps.errors.body }
                        </Text>
                        <FlatButton text='submit' onPress={ formikProps.handleSubmit }/>
                    </View>
                )}    
            </Formik>
    )
}

const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.journals
    }
  }
  
  const mapDispatchToProps = { addJournal }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddJournal)