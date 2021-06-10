import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle, 
  ViewStyle,
  Platform
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { addNote } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

interface ModalProps {
  closeModal: (() => void);
  addNote: ((item: object) => void);
  container: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  input: StyleProp<TextStyle>;
  create: StyleProp<ViewStyle>;
  colorSelect: StyleProp<ViewStyle>;
  todoErrorText: StyleProp<TextStyle>;
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  create: ViewStyle;
  colorSelect: ViewStyle;
}

const listSchema = yup.object({
  name: yup.string().required().min(4),
});

// red, slate blue, black, dark gray, blueish gray, teal, tan
const AddNoteModal: React.FC<ModalProps> = ({ closeModal, addNote }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={closeModal}
      >
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create A New Note</Text>
        <Formik
          initialValues={{ name: "", id: 0 }}
          validationSchema={listSchema}
          onSubmit={(values, actions) => {
            addNote(values);
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
                enablesReturnKeyAutomatically={true}
                autoCorrect={true}
                style={styles.input}
                placeholder="Enter A New Note . . ."
                placeholderTextColor={"#002C5F"}
                onChangeText={handleChange("name")}
                value={values.name}
                onBlur={handleBlur("name")}
              />

              <Text style={globalStyles.todoErrorText}>
                {touched.name && errors.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              ></View>
              <TouchableOpacity style={[styles.create, { backgroundColor: "#f30" }]}>
                <Button onPress={handleSubmit}>
                  <Text style={{ color: "white", fontWeight: "600" }}>
                  Add Note
                  </Text>
                </Button>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
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
    color: "black",
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "blue",
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
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

const mapDispatchToProps = { addNote };

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);
