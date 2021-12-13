import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { TextInput, Button, } from "react-native-paper";
import { connect, ConnectedProps} from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { addVision } from "../../redux/reducers/visions";
import { globalStyles } from "../../styles/global";
import ImagePic, { PropsFromImg } from "./imagePicker";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import * as yup from "yup";

interface VisionProps extends PropsFromImg {
  addVision:((item: any) => void);
  stateUri: string;
  setModalOpen:((arg0:boolean) => boolean);
  container: StyleProp<ViewStyle>;
  modalContent: StyleProp<TextStyle>;
  visionAddToggle: StyleProp<ViewStyle>;
}

interface Styles {
  container: ViewStyle;
  modalContent: TextStyle;
  visionAddToggle: ViewStyle;
}

const visionSchema = yup.object({
  title: yup.string().required().min(4),
});

const simulateSlowNetworkRequest = () =>
  new Promise((resolve) => setTimeout(resolve, 2500));

const AddVisionModal: FunctionComponent<VisionProps> = ({ addVision, stateUri, setModalOpen }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={ Platform.OS === "ios" ? "padding" : "height" }>
    <View style={styles.container}> 
        <TouchableOpacity
          style={{ position: "absolute", top: 40, right: 32, zIndex: 10 }}
        >
          <AntDesign name="close" size={ 24 } color="black" onPress={ () => setModalOpen(false) } />
        </TouchableOpacity>
        <Formik
          enableReinitialize={ true }
          initialValues={{ uri: stateUri, title: "", id: null }}
          validationSchema={ visionSchema }
          onSubmit={ (values, actions) => {
            addVision(values);
            actions.resetForm();
            setModalOpen(false);
          }}
        >
          {({
            handleChange,
            values,
            handleBlur,
            touched,
            errors,
            handleSubmit,
          }) => (
            <View style={styles.footer}> 
            <ImagePic/>
              <View style={{ marginTop: 30, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                  <TextInput
                    textAlign='center'
                    style={ styles.textinput }
                    placeholder="Vision Title"
                    onChangeText={ handleChange("title") }
                    value={ values.title }
                    onBlur={ handleBlur("title") }
                    autoComplete
                  />
                  <Text style={ globalStyles.errorText }>
                    { touched.title && errors.title }
                  </Text>
                </View>
                <Button
                style={ styles.buttonStyle }
                onPress={ handleSubmit }
                >
                  <AntDesign name="plus" size={ 16 } color="white" />
                </Button>
              </View>
            </View>
        )}
        </Formik>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "roboto-black",
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    margin:'auto',
  },
  section: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    marginLeft: 20,
    borderBottomWidth: 4,
  },
    visionAddToggle: {
    flexDirection: "row",
    alignSelf: "center",
  },
  textinput: {
    fontFamily: "roboto-black",
    width: windowWidth * 0.75,
    height: 60,
    paddingLeft: 14,
    marginLeft: 9,
    elevation: 2,
    marginRight: 5,
  },
  buttonStyle: {
    backgroundColor: "#6200ee", 
    height: 60,
    padding: 10,
    marginLeft: 2,
    elevation: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

const mapStateToProps = (state:any) => {
  return {
    stateUri: state.pic,
  };
};

const mapDispatchToProps = { addVision };

export default connect(mapStateToProps, mapDispatchToProps)(AddVisionModal);
export type PropsFromRedux = ConnectedProps<typeof AddVisionModal>
