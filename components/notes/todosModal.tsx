import React, { FunctionComponent, useEffect } from "react";
import { Text, TouchableOpacity, FlatList, Keyboard, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { connect, useDispatch } from "react-redux";
import { Formik } from "formik";
import { addTodo, deleteTodo, toggleTodo } from "../../redux/reducers/todos";
import * as yup from "yup";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import { CheckBox, Input, Layout } from "@ui-kitten/components";
import { CloseButton, SubmitButton } from "../../shared/button";


type TodoModalProps = {
  item: any;
  closeModal: (() => void);
  completedList: ((count1: number, count2: number) => void);
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

const TodosModal: FunctionComponent<TodoModalProps> = ({ completedList, item, closeModal }) => {
  const newTodos = item.todos;
  const taskCount = item.todos.length;
  const completedCount = newTodos.filter((todo:any) => todo.completed).length;
  const dispatch = useDispatch()


  useEffect(() => {
    const init = () => {
      let newNum = taskCount - completedCount
      completedList(newNum, completedCount);
    }
    return () => {
      init()
    }
  }, [item.todos])
  
  const renderTodo = (todo:any, index:number) => {
    return (
      <Layout style={ styles.todoContainer } level="1">
        <CheckBox
          checked={ todo.completed }
          style={{ width: 32 }}
          onChange={ () => dispatch(toggleTodo({ id: todo.id, listid: item.id })) }
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
          { todo.title }
        </Text>
        <CloseButton
          style={ styles.deleteTodoButton }
          onPress={ () => dispatch(deleteTodo({ id:todo.id, listid: item.id })) }
        />
      </Layout>
    );
  };

  return (
    <Layout style={ styles.container }>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 32, zIndex: 10 }}
      >
        <CloseButton
          onPress={ closeModal }
        />
      </TouchableOpacity>
      <Layout
        style={[
          styles.section,
          styles.header,
          { borderBottomColor: newTodos.color },
        ]}
      >
        <Text style={ styles.title }>{ newTodos.name }</Text>
        <Text style={ styles.taskCount }>
          Completed { completedCount } of { taskCount } tasks
        </Text>
      </Layout>
      <TouchableOpacity style={ styles.section }>
        <FlatList
          data={ item.todos }
          keyExtractor={ (_, index) => index.toString() }
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingVertical: 64,
          }}
          showsVerticalScrollIndicator={ false }
          renderItem={ ({ item, index }) => renderTodo(item, index) }
        />
      </TouchableOpacity>
      <Formik
        initialValues={{ title: "", listid: "" }}
        validationSchema={ todoSchema }
        onSubmit={ (values, actions) => {
          values.listid = item.id
          let newNum = taskCount - completedCount
          dispatch(addTodo(values));
          completedList(newNum, completedCount);
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
                style={ styles.todoInput }
                placeholder="Enter Todo . . ."
                onChangeText={ handleChange("title") }
                value={ values.title }
                onBlur={ handleBlur("title") }
              />
              <Text style={ styles.noteErrorText }>
                { touched.title && errors.title }
              </Text>
            </Layout>
            <SubmitButton
              style={ styles.buttonStyle }
              onPress={ handleSubmit }
            />
          </Layout>
        )}
      </Formik>
    </Layout>
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
    marginLeft: 4,
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
    height: 20,
    margin: "auto",
    marginLeft: 2,
    borderRadius: 4,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  todo: {
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
    width: 30
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.todos,
  };
};

export default connect(mapStateToProps)(TodosModal);
