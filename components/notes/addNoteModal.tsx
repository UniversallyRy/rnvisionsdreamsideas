import React, { FunctionComponent } from "react";
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { addNote } from "../../redux/reducers/note";

import { globalStyles } from "../../styles/global";
import FlatButton  from "../../shared/button";
import * as yup from "yup";

type ModalProps = {
  closeModal: (() => void);
  addNote: ((item: object) => void);
  container: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  input: StyleProp<TextStyle>;
  colorSelect: StyleProp<ViewStyle>;
  errorText: StyleProp<TextStyle>;
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  colorSelect: ViewStyle;
}

const listSchema = yup.object({
  name: yup.string().required().min(4),
});
// red, slate blue, black, dark gray, blueish gray, teal, tan
const AddNoteModal: FunctionComponent<ModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch()
  return (
    <Card style={{ flex: 1 }}>
      <View style={ styles.container }>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={ closeModal }
        >
          <AntDesign name="close" size={ 24 } color="black" />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
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
              <View>
                <TextInput
                  textAlign="center"
                  enablesReturnKeyAutomatically={ true }
                  autoCorrect={ true }
                  style={ styles.input }
                  placeholder="Enter A New Note . . ."
                  onChangeText={ handleChange("name") }
                  value={ values.name }
                  onBlur={ handleBlur("name") }
                  autoComplete
                />

                <Text style={ globalStyles.errorText }>
                  { touched.name && errors.name }
                </Text>
                <FlatButton 
                  onPress={ handleSubmit }
                  text="Add Note"
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
      </Card>
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
