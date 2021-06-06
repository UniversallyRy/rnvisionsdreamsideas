import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RectButton, TextInput } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { deleteNote } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

const noteSchema = yup.object({
  title: yup.string().required().min(4),
});

const NotesModal = ({ list, closeModal, deleteNote }) => {
  const [completedNote, setCompleted] = useState(false);
  const newNotes = list.notes;
  const taskCount = newNotes.length;
  const completedCount = newNotes.filter((note) => note.completed).length;

  const toggleNoteCompleted = (index) => {
    setCompleted((newNotes[index].completed = !newNotes[index].completed));
  };

  const removeNote = (id) => {
    var noteId = id;
    deleteNote(noteId);
  };

  const renderNote = (note, index) => {
    return (
      <View renderRightActions={(_, dragX) => rightActions(dragX, index)}>
        <TouchableOpacity style={styles.noteContainer}>
          <Ionicons
            name={note.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color="gray"
            style={{ width: 32 }}
            onPress={() => toggleNoteCompleted(index)}
          />
          <Text
            style={[
              styles.note,
              {
                textDecorationLine: note.completed ? "line-through" : "none",
                color: note.completed ? "gray" : "black",
              },
            ]}
          >
            {note.title}
          </Text>
          <AntDesign
            name="closecircle"
            size={24}
            style={styles.deleteNoteButton}
            onPress={() => removeNote(note.id)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const rightActions = (dragX, index) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton>
        <Animated.View style={styles.deleteButton}>
          <Animated.Text
            style={{
              color: "white",
              fontWeight: "700",
              transform: [{ translateX: trans }],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </RectButton>
    );
  };

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
          <Text style={styles.taskCount}>
            Completed {completedCount} of {taskCount} tasks
          </Text>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={newNotes}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => renderNote(item, index)}
          />
          <Formik
            initialValues={{ title: "", id: "", completed: false }}
            validationSchema={noteSchema}
            onSubmit={(values, actions) => {
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
                  onChangeText={handleChange("title")}
                  value={values.title}
                  onBlur={handleBlur("title")}
                />
                <TouchableOpacity
                  style={[styles.noteStyle, { backgroundColor: "red" }]}
                  onPress={handleSubmit}
                >
                  <AntDesign name="plus" size={16} color="white" />
                </TouchableOpacity>
                <Text style={globalStyles.noteErrorText}>
                  {touched.title && errors.title}
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.notes,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotesModal);
