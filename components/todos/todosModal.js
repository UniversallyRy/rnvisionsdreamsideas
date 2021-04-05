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
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RectButton, TextInput } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { addTodo } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

const todoSchema = yup.object({
  title: yup.string().required().min(4),
});

export function TodosModal({ list, closeModal, addTodo }) {
  const [completedTodo, setCompleted] = useState(false);
  const newTodos = list.todos;
  const taskCount = newTodos.length;
  const completedCount = newTodos.filter((todo) => todo.completed).length;

  const toggleTodoCompleted = (index) => {
    setCompleted((newTodos[index].completed = !newTodos[index].completed));
  };

  const renderTodo = (todo, index) => {
    return (
      <View renderRightActions={(_, dragX) => rightActions(dragX, index)}>
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
            <Ionicons
              name={todo.completed ? "ios-square" : "ios-square-outline"}
              size={24}
              color="gray"
              style={{ width: 32 }}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.todo,
              {
                textDecorationLine: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "black",
              },
            ]}
          >
            {todo.title}
          </Text>
        </View>
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
            { borderBottomColor: newTodos.color },
          ]}
        >
          <Text style={styles.title}>{newTodos.name}</Text>
          <Text style={styles.taskCount}>
            Completed {completedCount} of {taskCount} tasks
          </Text>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={newTodos}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => renderTodo(item, index)}
          />
          <Formik
            initialValues={{ title: "", id: "", completed: false }}
            validationSchema={todoSchema}
            onSubmit={(values, actions) => {
              addTodo(values.title, values.id);
              actions.resetForm();
              Keyboard.dismiss();
            }}
          >
            {({ handleChange, values, handleBlur, touched, errors }) => (
              <View style={[styles.section, styles.footer]}>
                <TextInput
                  enablesReturnKeyAutomatically={true}
                  autoCorrect={true}
                  style={[globalStyles.todoInput, { borderColor: "red" }]}
                  placeholder="Enter Todo . . ."
                  placeholderTextColor={"#002C5F"}
                  onChangeText={handleChange("title")}
                  value={values.title}
                  onBlur={handleBlur("title")}
                />
                <TouchableOpacity
                  style={[styles.todoStyle, { backgroundColor: "red" }]}
                  onPress={() => addTodo()}
                >
                  <AntDesign name="plus" size={16} color="white" />
                </TouchableOpacity>
                <Text style={globalStyles.todoErrorText}>
                  {touched.title && errors.title}
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

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
    marginRight: 8,
    paddingHorizontal: 8,
  },
  todoStyle: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  };
};

const mapDispatchToProps = { addTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodosModal);
