import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle, 
  ViewStyle,
  KeyboardAvoidingView,
  Keyboard, FlatList, TextInput, Platform, Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
// import { FlatList, TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { deleteNote, addNote } from "../../redux/actions";
import { globalStyles } from "../../styles/global";
export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface NoteModalProps {
  notes: any;
  closeModal: (() => void);
  deleteNote: ((item: string) => void);
  addNote: ((item: object) => void);
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  header: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  taskCount: StyleProp<TextStyle>;
  footer: StyleProp<ViewStyle>;
  noteInput:StyleProp<TextStyle>;
  buttonStyle:StyleProp<ViewStyle>;
  noteContainer:StyleProp<ViewStyle>;
  note:StyleProp<TextStyle>;
  deleteNoteButton:StyleProp<ViewStyle>;
  noteErrorText:StyleProp<TextStyle>;
}

interface RenderProps {
  note?: any;
}

interface Styles {
  container: ViewStyle;
  section: ViewStyle;
  header: TextStyle;
  title: TextStyle;
  taskCount: ViewStyle;
  footer: ViewStyle;
  noteInput:TextStyle;
  buttonStyle:ViewStyle;
  noteContainer:ViewStyle;
  note:TextStyle;
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

const NotesModal: React.FC<NoteModalProps> = ({ notes, closeModal, deleteNote, addNote }) => {
  const newNotes:any = notes;
  const taskCount = newNotes.length;

  const removeNote = (id:string) => {
    var noteId = id;
    deleteNote(noteId);
  };

  const renderNote: React.FC<RenderProps> = ( note, index) => {
    return (
        <TouchableOpacity style={styles.noteContainer}>
          <Text style={{paddingRight: 20}}>{note.name}</Text>
          <AntDesign
            name="closecircle"
            size={24}
            style={styles.deleteNoteButton}
            onPress={() => removeNote(note.id)}
          />
        </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 40, right: 32, zIndex: 10 }}
        >
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={closeModal}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.section,
            styles.header,
            { borderBottomColor: "red" },
          ]}
        >
          <Text style={styles.title}>{newNotes.name}</Text>
          <Text style={styles.taskCount}>There are {taskCount} Notes</Text>
        </View>
        <View style={styles.section}>
          <FlatList
            data={newNotes}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            renderItem={({item}) => renderNote(item)}
          />
          </View>
          <Formik
            initialValues={{ name: "", id: "" }}
            validationSchema={noteSchema}
            onSubmit={(values: Values, actions:FormikHelpers<Values>) => {
              addNote(values);
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
              <View style={styles.footer}>
                <View style={{flexDirection: 'column'}}>
                  <TextInput
                    enablesReturnKeyAutomatically={true}
                    autoCorrect={true}
                    style={globalStyles.noteInput}
                    placeholder="Enter Note . . ."
                    placeholderTextColor={"#002C5F"}
                    onChangeText={handleChange("name")}
                    value={values.name}
                    onBlur={handleBlur("name")}
                  />
                  <Text style={styles.noteErrorText}>
                    {touched.name && errors.name}
                  </Text>
                </View>
                <Button
                  style={styles.buttonStyle}
                  onPress={handleSubmit}
                >
                  <AntDesign style={{margin: "auto"}}name="plus" size={18} color="white" />
                </Button>
              </View>
            )}
          </Formik>   
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    margin:'auto',
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 10,
    borderBottomWidth: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: "gray",
    fontWeight: "600",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
  },
  noteInput: {
    height: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    margin: 8,
    paddingHorizontal: 8,
    borderColor: "red"
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
    height: 60,
    margin: "auto",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "red", 
  },
  noteContainer: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  note: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  deleteNoteButton: {
    marginLeft: "auto",
    color: "red",
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.notes,
  };
};

const mapDispatchToProps = { addNote, deleteNote };

export default connect(mapStateToProps, mapDispatchToProps)(NotesModal);
