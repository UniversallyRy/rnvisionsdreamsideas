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
  Dimensions,
  Platform
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

export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
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
        <View style={styles.section}>
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
        </View>
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
              <View style={styles.footer}>
                <View style={{flexDirection: 'column'}}>
                  <TextInput
                    enablesReturnKeyAutomatically={true}
                    autoCorrect={true}
                    style={globalStyles.noteInput}
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
    marginLeft: 20,
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
  todoInput: {
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
