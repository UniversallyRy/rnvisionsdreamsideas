import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp, 
  TextStyle, 
  ViewStyle,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { Button, Text } from "react-native-paper";
import {  TextInput } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { addTodo, deleteTodo } from "../../redux/actions";
export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface TodoModalProps {
  item: any;
  stateTodos: object;
  closeModal: (() => void);
  deleteTodo: ((id: string, id2: string) => void);
  addTodo: ((item: object, id: string) => void);
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  header: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  taskCount: StyleProp<TextStyle>;
  footer: StyleProp<ViewStyle>;
  todoInput:StyleProp<TextStyle>;
  buttonStyle:StyleProp<ViewStyle>;
  todonoteContainer:StyleProp<ViewStyle>;
  todo:StyleProp<TextStyle>;
  deleteButton:StyleProp<ViewStyle>;
  deleteTodoButton:StyleProp<ViewStyle>;
}

interface RenderProps {
  todo: any;
}

interface Styles {
  container: ViewStyle;
  section: ViewStyle;
  header: TextStyle;
  title: TextStyle;
  taskCount: ViewStyle;
  footer: ViewStyle;
  todoInput:TextStyle;
  buttonStyle:ViewStyle;
  todoContainer:ViewStyle;
  todo:TextStyle;
  deleteButton:ViewStyle;
  deleteTodoButton:ViewStyle;
  noteErrorText:TextStyle;
}


const todoSchema = yup.object({
  title: yup.string().required().min(4),
});

const TodosModal: React.FC<TodoModalProps> = ({ item, closeModal, deleteTodo, addTodo }) => {
  const [completedTodo, setCompleted] = useState(false);
  const newTodos = item.todos;
  const taskCount = newTodos.length;
  const completedCount = newTodos.filter((todo:any) => todo.completed).length;

  const toggleTodoCompleted = (index:number) => {
    setCompleted((newTodos[index].completed = !newTodos[index].completed));
  };

  const renderTodo = (todo:any, index:number) => {
    return (
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
              }
            ]}
          >
            {todo.title}
          </Text>
          <AntDesign
            name="closecircle"
            size={24}
            style={styles.deleteTodoButton}
            onPress={() => deleteTodo(todo.id, item.id)}
          />
        </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 40, right: 32, zIndex: 10}}
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
        <TouchableOpacity style={styles.section}>
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
        </TouchableOpacity>
          <Formik
            initialValues={{ title: "", id: "", completed: false }}
            validationSchema={todoSchema}
            onSubmit={(values, actions) => {
              addTodo(values, item.id );
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
                    style={styles.todoInput}
                    placeholder="Enter Todo . . ."
                    placeholderTextColor={"#002C5F"}
                    onChangeText={handleChange("title")}
                    value={values.title}
                    onBlur={handleBlur("title")}
                  />
                  <Text style={styles.noteErrorText}>
                    {touched.title && errors.title}
                  </Text>
                </View>
                <Button
                  style={styles.buttonStyle}
                  onPress={handleSubmit}
                >
                  <AntDesign name="plus" size={16} color="white" />
                </Button>
              </View>
            )}
          </Formik>
      </View>
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
    marginLeft: 20,
    borderBottomWidth: 4,
  },
  title: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "800",
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
  todoInput: {
    width: windowWidth * 0.75,
    paddingLeft: 14,
    paddingTop: 32,
    paddingRight: 14,
    paddingBottom: 16,
    marginLeft: 4,
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
  todoContainer: {
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
