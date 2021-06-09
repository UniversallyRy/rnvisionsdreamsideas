import React from "react";
import { View, StyleProp, TextStyle, ViewStyle,} from "react-native";
import { TextInput, Text } from "react-native-paper";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../../shared/button";
import { addJournal } from "../../redux/actions";
import { globalStyles } from "../../styles/global";


interface AddJournalProps {
  addJournal: ((item: object) => void);
  setModalOpen: ((i:boolean) => void);
  addJournalForm: StyleProp<ViewStyle>;
  errorText: StyleProp<TextStyle>;
}

// require an entry into form input that's at least 4 letters
const JournalSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(4),
});

const AddJournal:React.FC<AddJournalProps> = ({ addJournal, setModalOpen }) => {

  return (
    <Formik
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
      {({
        handleChange,
        values,
        handleBlur,
        handleSubmit,
        touched,
        errors,
      }) => (
        <View style={globalStyles.addJournalForm}>
          <TextInput
            mode="flat"
            placeholder="Journal Title"
            onChangeText={handleChange("title")}
            value={values.title}
            onBlur={handleBlur("title")}
          />
          <Text style={globalStyles.errorText}>
            {/* Above <Text/> shows up only when input is focused and exited without requirements */}
            {touched.title && errors.title}
          </Text>
          <TextInput
            multiline
            mode="flat"
            placeholder="Journal Body"
            onChangeText={handleChange("body")}
            value={values.body}
            onBlur={handleBlur("body")}
          />
          <Text style={globalStyles.errorText}>
            {touched.body && errors.body}
          </Text>
          <FlatButton text="submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

// actions from redux to save entry to store
const mapDispatchToProps = { addJournal };

export default connect(null, mapDispatchToProps)(AddJournal);