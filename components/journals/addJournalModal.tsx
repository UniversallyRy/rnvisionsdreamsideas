import React, { FunctionComponent } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { Input, Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import { addJournal } from "../../redux/reducers/journals";
import { globalStyles } from "../../styles/global";
import { SubmitButton } from "../../shared/buttons";
import * as yup from "yup";
import { windowHeight } from "../../utils/dimensions";
// import { addJournal } from "../../redux/actions";

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
    <Layout style={{ height: windowHeight }}>
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
    </Layout>
  );
};

export default AddJournal;
