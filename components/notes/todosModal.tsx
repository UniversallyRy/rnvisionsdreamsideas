import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp, 
  TextStyle, 
  ViewStyle,
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
import { addTodo, deleteTodo } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

interface TodoModalProps {
  list: any;
  stateTodos: object;
  closeModal: (() => void);
  deleteTodo: ((item: string) => void);
  addTodo: ((item: object) => void);
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  header: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  taskCount: StyleProp<TextStyle>;
  footer: StyleProp<ViewStyle>;
  input:StyleProp<TextStyle>;
  todoStyle:StyleProp<ViewStyle>;
  todonoteContainer:StyleProp<ViewStyle>;
  todo:StyleProp<TextStyle>;
  deleteButton:StyleProp<ViewStyle>;
  deleteTodoButton:StyleProp<ViewStyle>;
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
  todoStyle:ViewStyle;
  todoContainer:ViewStyle;
  todo:TextStyle;
  deleteButton:ViewStyle;
  deleteTodoButton:ViewStyle;
}


const todoSchema = yup.object({
  title: yup.string().required().min(4),
});

const TodosModal: React.FC<TodoModalProps> = ({ list, closeModal, deleteTodo, addTodo }) => {
  const [completedTodo, setCompleted] = useState(false);
  const newTodos = list.todos;
  const taskCount = newTodos.length;
  const completedCount = newTodos.filter((todo:any) => todo.completed).length;

  const toggleTodoCompleted = (index:number) => {
    setCompleted((newTodos[index].completed = !newTodos[index].completed));
  };

  const removeTodo = (id:string) => {
    var todoId = id;
    deleteTodo(todoId);
  };

  const renderTodo = (todo:any, index:number) => {
    return (
      <View renderRightActions={(_:any, dragX:any) => rightActions(dragX, index)}>
        <TouchableOpacity style={styles.todoContainer}>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color="gray"
            style={{ width: 32 }}
            onPress={() => toggleTodoCompleted(index)}
          />
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
          <AntDesign
            name="closecircle"
            size={24}
            style={styles.deleteTodoButton}
            onPress={() => removeTodo(todo.id)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const rightActions = (dragX:any, index:number) => {
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
              addTodo(values);
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
                  placeholder="Enter Todo . . ."
                  placeholderTextColor={"#002C5F"}
                  onChangeText={handleChange("title")}
                  value={values.title}
                  onBlur={handleBlur("title")}
                />
                <Button
                  style={[styles.todoStyle, { backgroundColor: "red" }]}
                  onPress={handleSubmit}
                >
                  <AntDesign name="plus" size={16} color="white" />
                </Button>
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
  todoStyle: {
    borderRadius: 4,
    padding: 16,
  },
  todoContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 16,
  },
  todo: {
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
  deleteTodoButton: {
    marginLeft: "auto",
    color: "red",
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.todos,
  };
};

const mapDispatchToProps = { addTodo, deleteTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodosModal);