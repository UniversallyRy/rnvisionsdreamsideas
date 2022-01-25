import React, { FunctionComponent } from "react";
import { TouchableOpacity, FlatList, Text, Keyboard, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { connect, useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { deleteNote, addNote } from "../../redux/reducers/note";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import * as yup from "yup";
import { Card, Input, Layout } from "@ui-kitten/components";
import { CloseButton } from "../../shared/button";

type NoteModalProps = {
  notes: object[];
  closeModal: (() => void);
}

interface Styles {
  container: ViewStyle;
  header: TextStyle;
  title: TextStyle;
  taskCount: ViewStyle;
  footer: ViewStyle;
  noteInput:TextStyle;
  buttonStyle:ViewStyle;
  noteContainer:ViewStyle;
  deleteNoteButton:ViewStyle;
  noteErrorText:TextStyle;
}

interface Values {
  name: string;
  id: string;
} 

const noteSchema = yup.object({
  name: yup.string().required().min(6),
});

const NotesModal: FunctionComponent<NoteModalProps> = ({ notes, closeModal}) => {
  const newNotes:any = notes;
  const taskCount = newNotes.length;
  const dispatch = useDispatch()
  
  const renderNote = ( note:any, index = 0) => {
    return (
        <Card 
          style={ styles.noteContainer }
        >
          <Text>{ note.name }</Text>
          <CloseButton
            style={styles.deleteNoteButton}
            onPress={deleteNote}
          />
        </Card>
    );
  };

  return (
    <Layout style={styles.container} >
        <TouchableOpacity
          style={{ position: "absolute", top: 40, right: 32, zIndex: 10 }}
        >
          <CloseButton
            onPress={ closeModal }
          />
        </TouchableOpacity>
        <Layout
          style={[
            styles.header,
            { borderBottomColor: "red" },
          ]}
        >
          <Text style={ styles.title }>{ newNotes.name }</Text>
          <Text style={ styles.taskCount }>There are { taskCount } Notes</Text>
        </Layout>
        <Layout>
          <FlatList
            data={ newNotes }
            keyExtractor={ (_, index) => index.toString()  }
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            renderItem={ ({ item }) => renderNote(item) }
          />
          </Layout>
          <Formik
            initialValues={{ name: "", id: "" }}
            validationSchema={ noteSchema }
            onSubmit={ (values: Values, actions:FormikHelpers<Values>) => {
              dispatch(addNote(values));
              actions.resetForm();
              Keyboard.dismiss();
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
              <Layout style={ styles.footer }>
                <Layout style={{ flexDirection: 'column' }}>
                  <Input
                    textAlign="center"
                    enablesReturnKeyAutomatically={ true }
                    autoCorrect={ true }
                    style={ styles.noteInput }
                    placeholder="Enter Note . . ."
                    onChangeText={ handleChange("name") }
                    value={ values.name }
                    onBlur={ handleBlur("name") }
                  />
                  <Text style={ styles.noteErrorText }>
                    { touched.name && errors.name }
                  </Text>
                </Layout>
                <CloseButton
                  style={ styles.buttonStyle }
                  onPress={ handleSubmit }
                >
                </CloseButton>
              </Layout>
            )}
          </Formik>   
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: "column",
    width: windowWidth,
    height: windowHeight
  },
  header: {
    marginTop: 10,
    marginLeft: 10,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: "black",
    fontWeight: "600",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
  },
  noteInput: {
    width: windowWidth * 0.75,
    paddingLeft: 14,
    marginLeft: 5,
    marginRight: 5,
    elevation: 3,
  },
  noteErrorText:{
    fontSize: 10,
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
  buttonStyle: {
    height: 30,
    margin: "auto",
  },
  noteContainer: {
    alignSelf: "center",
    flexDirection: "column",
    width: windowWidth * 0.995,
  },
  deleteNoteButton: {
    marginLeft: "auto",
    marginRight: 3,
    color: "red",
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.notes,
  };
};

export default connect(mapStateToProps)(NotesModal);
