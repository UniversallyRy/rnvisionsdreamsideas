import React from "react";
import { View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../../shared/button";
import { addJournal } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

// require an entry into form input that's at least 4 letters
const JournalSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(4),
});

export function AddJournal({ addJournal, setModalOpen }) {
  const { colors } = useTheme();
  return (
    <Formik
      style={globalStyles.addJournalForm}
      // Control whether Formik should reset the form if initialValues changes
      enableReinitialize
      initialValues={{ title: "", body: "", id: "", date: "" }}
      validationSchema={JournalSchema}
      onSubmit={(values, actions) => {
        addJournal(values);
        actions.resetForm();
        setModalOpen(false);
      }}
    >
      {(formikProps) => (
        <View>
          <TextInput
            style={colors}
            mode="flat"
            placeholder="Journal Title"
            onChangeText={formikProps.handleChange("title")}
            value={formikProps.values.title}
            onBlur={formikProps.handleBlur("title")}
          />
          <Text style={globalStyles.errorText}>
            {/* Above <Text/> shows up only when input is focused and exited without requirements */}
            {formikProps.touched.title && formikProps.errors.title}
          </Text>
          <TextInput
            multiline
            style={colors}
            mode="flat"
            placeholder="Journal Body"
            onChangeText={formikProps.handleChange("body")}
            value={formikProps.values.body}
            onBlur={formikProps.handleBlur("body")}
          />
          <Text style={globalStyles.errorText}>
            {formikProps.touched.body && formikProps.errors.body}
          </Text>
          <FlatButton text="submit" onPress={formikProps.handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

// actions from redux to save entry to store
const mapDispatchToProps = { addJournal };

export default connect(null, mapDispatchToProps)(AddJournal);