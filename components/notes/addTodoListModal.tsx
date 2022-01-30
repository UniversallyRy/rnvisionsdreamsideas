import React, { FunctionComponent, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { connect, useDispatch } from "react-redux";
import { Input, Layout } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { addList } from "../../redux/reducers/todos";
import { globalStyles } from "../../styles/global";
import KittenButton  from "../../shared/button";
import * as yup from "yup";

type ModalProps = {
  closeModal: (() => void);
  bgColors?: string;
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
const AddTodoListModal: FunctionComponent<ModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch()
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
          key={ color }
          style={ [styles.colorSelect, { backgroundColor: color }] }
          onPress={ () => setColor(color) }
        />
      );
    });
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={ styles.container } >
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={ closeModal }
        >
          <AntDesign name="close" size={ 24 } color="black" />
        </TouchableOpacity>

        <Layout style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={ styles.title }>Create Todo List</Text>
          <Formik
            initialValues={{ name: "", id: 0, color: "", todos: [] }}
            validationSchema={ listSchema }
            onSubmit={ (values, actions) => {
              let color = bgColor;
              values.color = color;
              dispatch(addList(values));
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
                  placeholder="Enter A New List . . ."
                  onChangeText={ handleChange("name") }
                  value={ values.name }
                  onBlur={ handleBlur("name") }
                />

                <Text style={ globalStyles.errorText }>
                  { touched.name && errors.name }
                </Text>
                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  { renderColors() }
                </Layout>
                <TouchableOpacity
                  style={ styles.create }
                >
                  <KittenButton text="Add List" onPress={ handleSubmit }/>
                </TouchableOpacity>
              </Layout>
            )}
          </Formik>
        </Layout>
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
    fontSize: 18,
  },
  create: {
    marginTop: 24,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 2,
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.todos,
  };
};


export default connect(mapStateToProps)(AddTodoListModal);
