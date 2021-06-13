import React from "react";
import { TextInput, Text, Surface } from "react-native-paper";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../../shared/button";
import ImagePicker from "./imagePicker";
import { addVision } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

interface VisionProps {
  addVision:((item: any) => void);
  stateUri: string;
  setModalOpen:((arg0:boolean) => void);
}

const visionSchema = yup.object({
  title: yup.string().required().min(4),
});

const simulateSlowNetworkRequest = () =>
  new Promise((resolve) => setTimeout(resolve, 2500));

const AddVision: React.FC<VisionProps> = ({ addVision, stateUri, setModalOpen }) => {
  return (
    <Surface style={{ margin: 3, marginTop: 50 }}>
      <Formik
        enableReinitialize={true}
        initialValues={{ uri: stateUri, title: "", id: null }}
        validationSchema={visionSchema}
        onSubmit={(values, actions) => {
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
          <>
            <TextInput
              style={{fontFamily: "roboto-black"}}
              mode="outlined"
              placeholder="Vision Title"
              onChangeText={handleChange("title")}
              value={values.title}
              onBlur={handleBlur("title")}
            />
            <Text style={globalStyles.errorText}>
              {touched.title && errors.title}
            </Text>
            <ImagePicker />
            <FlatButton accessabilityLabel="submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Surface>
  );
};

const mapStateToProps = (state:any) => {
  return {
    stateUri: state.pic,
  };
};

const mapDispatchToProps = { addVision };

export default connect(mapStateToProps, mapDispatchToProps)(AddVision);
