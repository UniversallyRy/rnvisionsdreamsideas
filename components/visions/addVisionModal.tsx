import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { 
  Animated, 
  View, 
  Text, 
  TouchableOpacity, 
  Platform, 
  KeyboardAvoidingView, 
  StyleSheet, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from "react-native";
import { useCardAnimation } from '@react-navigation/stack';
import { TextInput, Button, } from "react-native-paper";
import { connect, useDispatch, ConnectedProps} from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { addVision } from "../../redux/reducers/visions";
import { globalStyles } from "../../styles/global";
import ImagePic from "./imagePicker";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import * as yup from "yup";

interface VisionProps {
  stateUri: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
}

interface Styles {
  container: ViewStyle;
  textinput: TextStyle;
  visionAddToggle: ViewStyle;
  footer: ViewStyle;
  buttonStyle: ViewStyle;
}

const visionSchema = yup.object({
  title: yup.string().required().min(4),
});

const AddVisionModal: FunctionComponent<VisionProps> = ({ stateUri, setModalOpen }) => {
  const dispatch = useDispatch()
  const { current } = useCardAnimation();
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={ Platform.OS === "ios" ? "padding" : "height" }>
      <Animated.View 
        style={{
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
          ...styles.container
        }}
      > 
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
            dispatch(addVision(values));
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
              <View style={{ flexDirection: 'row' }}>
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
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    fontFamily: "roboto-black",
    height: windowHeight,
    width: windowWidth,
    margin:'auto',
  },
  visionAddToggle: {
    flexDirection: "row",
    alignSelf: "center",
  },
  textinput: {
    fontFamily: "roboto-black",
    width: windowWidth * 0.75,
    height: 60,
    paddingLeft: 10,
    elevation: 1,
    marginRight: 3,
  },
  buttonStyle: {
    backgroundColor: "#6200ee", 
    height: 60,
    padding: 10,
    elevation: 2,
  },
  footer: {
    position: 'absolute',
    alignItems: "center",
    bottom: 0,
  },
});

const mapStateToProps = (state:any) => {
  return {
    stateUri: state.pic,
  };
};

export default connect(mapStateToProps)(AddVisionModal);
export type PropsFromRedux = ConnectedProps<typeof AddVisionModal>
