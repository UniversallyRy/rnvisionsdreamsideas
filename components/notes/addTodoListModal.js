import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { addList } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

const listSchema = yup.object({
  name: yup.string().required().min(4),
});

// red, slate blue, black, dark gray, blueish gray, teal, tan
export function AddTodoListModal({ closeModal, addList }) {
  const bgColors = [
    "#FE1F14",
    "#B9D3EE",
    "#000000",
    "#57575E",
    "#2E4045",
    "#83ADB5",
    "#BFB5B2",
  ];
  const [bgColor, setColor] = useState(bgColors[0]);

  const renderColors = () => {
    return bgColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setColor(color)}
        />
      );
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={closeModal}
      >
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create Todo List</Text>
        <Formik
          initialValues={{ name: "", id: 0, color: "", todos: [] }}
          validationSchema={listSchema}
          onSubmit={(values, actions) => {
            let color = bgColor;
            values.color = color;
            addList(values);
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
                placeholder="Enter A New List . . ."
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
              >
                {renderColors()}
              </View>
              <TouchableOpacity
                style={[styles.create, { backgroundColor: bgColor }]}
                onPress={handleSubmit}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  };
};

const mapDispatchToProps = { addList };

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoListModal);
