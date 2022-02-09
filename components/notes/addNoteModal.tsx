import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { connect, useDispatch } from "react-redux";
import { Input, Layout } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { addNote } from "../../redux/reducers/note";
import { FormButton }  from "../../shared/buttons";
import * as yup from "yup";

type ModalProps = {
  closeModal: (() => void);
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  errorText: TextStyle;
  colorSelect: ViewStyle;
}

const listSchema = yup.object({
  name: yup.string().required().min(4),
});
// red, slate blue, black, dark gray, blueish gray, teal, tan
const AddNoteModal: FunctionComponent<ModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch()
  return (
      <Layout style={ styles.container }>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={ closeModal }
        >
          <AntDesign name="close" size={ 24 } color="black" />
        </TouchableOpacity>

        <Layout style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={ styles.title }>Create A New Note</Text>
          <Formik
            initialValues={{ name: "", id: 0 }}
            validationSchema={ listSchema }
            onSubmit={ (values, actions) => {
              dispatch(addNote(values));
              actions.resetForm();
              closeModal();
            }}
          >
            {({
              handleChange,
              values,
              handleBlur,
              handleSubmit,
              touched,
              errors,
            }) => (
              <Layout>
                <Input
                  textAlign="center"
                  enablesReturnKeyAutomatically={ true }
                  autoCorrect={ true }
                  style={ styles.input }
                  placeholder="Enter A New Note . . ."
                  onChangeText={ handleChange("name") }
                  value={ values.name }
                  onBlur={ handleBlur("name") }
                />

                <Text style={ styles.errorText }>
                  { touched.name && errors.name }
                </Text>
                <FormButton 
                  onPress={ handleSubmit }
                  text="Add Note"
                />
              </Layout>
            )}
          </Formik>
        </Layout>
      </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    marginTop: 8,
    paddingHorizontal: 18,
  },
  errorText: {
    fontFamily: "roboto-bold",
    color: "crimson",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.notes,
  };
};


export default connect(mapStateToProps)(AddNoteModal);
