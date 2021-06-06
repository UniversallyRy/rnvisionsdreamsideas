import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../../shared/button";
import ImagePicker from "./imagePicker";
import { addVision } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

const visionSchema = yup.object({
  title: yup.string().required().min(4),
});

const simulateSlowNetworkRequest = () =>
  new Promise((resolve) => setTimeout(resolve, 2500));

const AddVision = ({ addVision, stateUri, setModalOpen }) => {
  return (
    <View style={{ margin: 15, marginTop: 100 }}>
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
            <FlatButton text="submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stateUri: state.pic,
  };
};

const mapDispatchToProps = { addVision };

export default connect(mapStateToProps, mapDispatchToProps)(AddVision);
