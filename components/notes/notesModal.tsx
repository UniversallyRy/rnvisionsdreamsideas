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
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RectButton, TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { deleteNote, addNote } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

interface NoteModalProps {
  notes: [];
  stateTodos: object;
  closeModal: (() => void);
  deleteNote: ((item: string) => void);
  addNote: ((item: object) => void);
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  header: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  taskCount: StyleProp<TextStyle>;
  footer: StyleProp<ViewStyle>;
  input:StyleProp<TextStyle>;
  noteStyle:StyleProp<ViewStyle>;
  noteContainer:StyleProp<ViewStyle>;
  note:StyleProp<TextStyle>;
  deleteButton:StyleProp<ViewStyle>;
  deleteNoteButton:StyleProp<ViewStyle>;
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
  input:TextStyle;
  noteStyle:ViewStyle;
  noteContainer:ViewStyle;
  note:TextStyle;
  deleteButton:ViewStyle;
  deleteNoteButton:ViewStyle;
}

const noteSchema = yup.object({
  name: yup.string().required().min(4),
});

const NotesModal: React.FC<NoteModalProps> = ({ notes, closeModal, deleteNote, addNote }) => {
  const newNotes:any = notes;
  const taskCount = newNotes.length;

  const removeNote = (id:string) => {
    var noteId = id;
    deleteNote(noteId);
  };

  const renderNote: React.FC<RenderProps> = ({note}) => {
    return (
        <TouchableOpacity style={styles.noteContainer}>
          <Text>{note.name}</Text>
          <AntDesign
            name="closecircle"
            size={24}
            style={styles.deleteNoteButton}
            onPress={() => removeNote(note.id)}
          />
        </TouchableOpacity>
    );
  };

  // const rightActions = (dragX:any, index:number) => {
  //   const trans = dragX.interpolate({
  //     inputRange: [0, 50, 100, 101],
  //     outputRange: [-20, 0, 0, 1],
  //   });
  //   return (
  //     <RectButton>
  //       <Animated.View style={styles.deleteButton}>
  //         <Animated.Text
  //           style={{
  //             color: "white",
  //             fontWeight: "700",
  //             transform: [{ translateX: trans }],
  //           }}
  //         >
  //           Delete
  //         </Animated.Text>
  //       </Animated.View>
  //     </RectButton>
  //   );
  // };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
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
            { borderBottomColor: newNotes.color },
          ]}
        >
          <Text style={styles.title}>{newNotes.name}</Text>
          <Text style={styles.taskCount}>There are {taskCount} Notes</Text>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={newNotes}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            renderItem={( item ) => renderNote({item})}
          />
          <Formik
            initialValues={{ name: "", id: "" }}
            validationSchema={noteSchema}
            onSubmit={(values, actions) => {
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
              <View style={[styles.section, styles.footer]}>
                <TextInput
                  enablesReturnKeyAutomatically={true}
                  autoCorrect={true}
                  style={[globalStyles.noteInput, { borderColor: "red" }]}
                  placeholder="Enter Note . . ."
                  placeholderTextColor={"#002C5F"}
                  onChangeText={handleChange("name")}
                  value={values.name}
                  onBlur={handleBlur("name")}
                />
                <Button
                  style={[styles.noteStyle, { backgroundColor: "red" }]}
                  onPress={handleSubmit}
                >
                  <AntDesign  name="plus" size={16} color="white" />
                </Button>
                <Text style={globalStyles.todoErrorText}>
                  {touched.name && errors.name}
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
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
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    margin: 8,
    paddingHorizontal: 8,
  },
  noteStyle: {
    borderRadius: 4,
    padding: 16,
  },
  noteContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 16,
  },
  note: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
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
