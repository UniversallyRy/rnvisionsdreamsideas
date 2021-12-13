import React, { FunctionComponent } from "react";
import { View, TouchableOpacity, FlatList, Text, Keyboard, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { connect, useDispatch } from "react-redux";
import { Card, TextInput, Button, useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import { deleteNote, addNote } from "../../redux/reducers/note";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import * as yup from "yup";

type NoteModalProps = {
  notes: object[];
  closeModal: (() => boolean);
  deleteNote: ((item: object) => void);
  addNote: ((item: object) => void);
  container: StyleProp<ViewStyle>;
  header: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  taskCount: StyleProp<TextStyle>;
  footer: StyleProp<ViewStyle>;
  noteInput:StyleProp<TextStyle>;
  buttonStyle:StyleProp<ViewStyle>;
  noteContainer:StyleProp<ViewStyle>;
  deleteNoteButton:StyleProp<ViewStyle>;
  noteErrorText:StyleProp<TextStyle>;
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
  const theme = useTheme();
  const dispatch = useDispatch()
  
  const renderNote = ( note:any, index = 0) => {
    return (
        <Card 
          style={ styles.noteContainer }
        >
          <Text style={{ paddingRight: 20 }}>{ note.name }</Text>
          <AntDesign
            name="closecircle"
            size={ 24 }
            style={ styles.deleteNoteButton }
            onPress={ () => dispatch(deleteNote( { id: note.id } )) }
          />
        </Card>
    );
  };

  return (
    <Card style={styles.container} >
        <TouchableOpacity
          style={{ position: "absolute", top: 40, right: 32, zIndex: 10 }}
        >
          <AntDesign
            name="close"
            size={ 24 }
            color="black"
            onPress={ closeModal }
          />
        </TouchableOpacity>
        <View
          style={[
            styles.header,
            { borderBottomColor: "red" },
          ]}
        >
          <Text style={ styles.title }>{ newNotes.name }</Text>
          <Text style={ styles.taskCount }>There are { taskCount } Notes</Text>
        </View>
        <View>
          <FlatList
            data={ newNotes }
            keyExtractor={ (_, index) => index.toString()  }
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            renderItem={ ({ item }) => renderNote(item) }
          />
          </View>
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
              <View style={ styles.footer }>
                <View style={{ flexDirection: 'column' }}>
                  <TextInput
                    textAlign="center"
                    enablesReturnKeyAutomatically={ true }
                    autoCorrect={ true }
                    style={ styles.noteInput }
                    placeholder="Enter Note . . ."
                    onChangeText={ handleChange("name") }
                    value={ values.name }
                    onBlur={ handleBlur("name") }
                    autoComplete
                  />
                  <Text style={ styles.noteErrorText }>
                    { touched.name && errors.name }
                  </Text>
                </View>
                <Button
                  style={ styles.buttonStyle }
                  onPress={ handleSubmit }
                >
                  <AntDesign style={{ margin: "auto" }} name="plus" size={ 18 } color="white" />
                </Button>
              </View>
            )}
          </Formik>   
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
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
    height: 64,
    margin: "auto",
    marginLeft: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "red", 
    elevation: 3,
  },
  noteContainer: {
    alignSelf: "center",
    width: windowWidth * 0.995,
    flexDirection: "row",
    paddingVertical: 16,
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
