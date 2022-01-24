import React, { FunctionComponent } from "react";
import { StyleProp, TextStyle } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
// import { addJournal } from "../../redux/actions";
import { addJournal } from "../../redux/reducers/journals";
import { globalStyles } from "../../styles/global";
import { CloseButton, SubmitButton } from "../../shared/button";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Text } from "@ui-kitten/components";

type AddJournalProps = {
  setModalOpen: ((i:boolean) => void);
}
// require an entry into form input that's at least 4 letters
const JournalSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(4),
});

const AddJournal: FunctionComponent<AddJournalProps> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ margin: 3, marginTop: 100 }}>
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
            <Input
              textAlign="center"
              placeholder="Journal Title"
              onChangeText={handleChange("title")}
              value={values.title}
              onBlur={handleBlur("title")}
              accessibilityLabel="Input Journal Title Here"
            />
            <Text style={globalStyles.errorText}>
              {/* Above <Text/> shows up only when input is focused and exited without requirements */}
              {touched.title && errors.title}
            </Text>
            <Input
              textAlign="center"
              multiline
              placeholder="Journal Body"
              onChangeText={handleChange("body")}
              value={values.body}
              onBlur={handleBlur("body")}
              accessibilityLabel="Input Journal body text Here"
            />
            <Text style={globalStyles.errorText}>
              {touched.body && errors.body}
            </Text>
            <SubmitButton onPress={handleSubmit} accessibilityLabel="Clicking here adds journal entry">
              Submit
            </SubmitButton>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddJournal;
