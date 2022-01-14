import React, { FunctionComponent, useState, useEffect } from "react";
import { Modal, StyleProp, TextStyle, ViewStyle, StyleSheet, View, Text } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import TodosModal from "./todosModal";
import { deleteList } from "../../redux/reducers/todos";

type TodoListsProps = {
  list: {
    todos: [];
    name: string;
    id: number;
    color: string;
    deleteList: ((id:object) => void);
    listContainer: StyleProp<ViewStyle>;
    cardContainer: StyleProp<ViewStyle>;
    listTitle: StyleProp<TextStyle>;
    count: StyleProp<TextStyle>;
    subtitle: StyleProp<TextStyle>;
    deleteButton: StyleProp<ViewStyle>; 
  }
}

interface Styles {
  listContainer: ViewStyle;
  cardContainer: ViewStyle;
  listTitle: TextStyle;
  count: TextStyle;
  subtitle: TextStyle;
  deleteButton: ViewStyle;
}

const TodoLists: FunctionComponent<TodoListsProps>= ({ list }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const [InitRemaining, setInitRemaining] = useState(0);
  const [InitCount, setInitCount] = useState(0);
  const [isMount, setIsMount] = useState(true);
  const toggleListModal = () => {
    setVisible(!visible);
  };
  useEffect(()=>{
          if(isMount){
              let completedCount = (filtered(list.todos, (todo:any) => todo.completed));
              let remainingCount = (filtered(list.todos, (todo:any) => !todo.completed));
              setInitCount(Object.keys(completedCount).length);
              setInitRemaining(Object.keys(remainingCount).length);
              setIsMount(false);
              return;
          }
      completedList(InitRemaining, InitCount);
          
          //Do anything here for 2nd render onwards
  }, [TodosModal])
    
const completedList = (remaining:number, completed:number) => {
  setInitRemaining(remaining);
  setInitCount(completed);
}
  
  const filtered = (obj:object, predicate:any) => {
    let result = {},
    key;
    
    for (key in obj) {
      if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  return (
    <View style={ styles.listContainer }>
      <Card style={ [styles.cardContainer, { backgroundColor: list.color }] } onPress={ () => toggleListModal() }>
        <Modal
          animationType="slide"
          visible={ visible }
          onRequestClose={ () => toggleListModal() }
          accessibilityLabel="CLicking here opens Todo Modal"
        >
          <TodosModal completedList={ completedList } item={ list } closeModal={ () => toggleListModal() } />
        </Modal>
        <View>
          <Text style={ styles.listTitle } numberOfLines={ 1 }>
            { list.name }
          </Text>
            <View style={{ alignItems: "center" }} accessibilityLabel="Remaining Todo Count" >
              <Text style={ styles.count }>{ InitRemaining }</Text>
              <Text style={ styles.subtitle }>Remaining</Text>
            </View>
            <View style={{ alignItems: "center" }} accessibilityLabel="Completed Todo Count">
              <Text style={ styles.count }>{ InitCount }</Text>
              <Text style={ styles.subtitle }>Completed</Text>
            </View>
        </View>
      </Card>
      <Button
        style={ styles.deleteButton }
        icon="close-outline"
        mode="contained"
        onPress={ () => dispatch(deleteList({id: list.id})) }
        accessibilityLabel="Click here to delete list"
        >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  listContainer: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    padding: 20,
    borderRadius: 6,
    width: 200,
    height: 238,
    elevation: 5,
  },
  listTitle: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  count: {
    fontSize: 40,
    fontWeight: "200",
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "700",
  },
  deleteButton: {
    margin: 2,
    width: 200,
    elevation: 5,
  },
});


export default TodoLists;
