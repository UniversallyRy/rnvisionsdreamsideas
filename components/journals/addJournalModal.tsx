import React, { FunctionComponent } from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
// import { addJournal } from "../../redux/actions";
import { addJournal } from "../../redux/reducers/journals";
import { globalStyles } from "../../styles/global";
import FlatButton from "../../shared/button";
import * as yup from "yup";

type AddJournalProps = {
  setModalOpen: ((i:boolean) => void);
  errorText?: StyleProp<TextStyle>;
}
// require an entry into form input that's at least 4 letters
const JournalSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(4),
});

const AddJournal: FunctionComponent<AddJournalProps> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  return (
    <Surface style={{ margin: 3, marginTop: 100 }}>
      <Formik
        // Control whether Formik should reset the form if initialValues changes
        enableReinitialize
        initialValues={{ title: "", body: "" }}
        validationSchema={JournalSchema}
        onSubmit={(values, actions) => {
          dispatch(addJournal(values));
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
          <>
            <TextInput
              textAlign="center"
              mode="flat"
              placeholder="Journal Title"
              onChangeText={handleChange("title")}
              value={values.title}
              onBlur={handleBlur("title")}
              autoComplete
            />
            <Text style={globalStyles.errorText}>
              {/* Above <Text/> shows up only when input is focused and exited without requirements */}
              {touched.title && errors.title}
            </Text>
            <TextInput
              textAlign="center"
              multiline
              mode="flat"
              placeholder="Journal Body"
              onChangeText={handleChange("body")}
              value={values.body}
              onBlur={handleBlur("body")}
              autoComplete
            />
            <Text style={globalStyles.errorText}>
              {touched.body && errors.body}
            </Text>
            <FlatButton text="submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Surface>
  );
};

export default AddJournal;
