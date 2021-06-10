import React, { useState } from "react";
import { Modal, StyleProp, TextStyle, ViewStyle, StyleSheet, View, GestureResponderEvent} from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { connect } from "react-redux";
import TodosModal from "./todosModal";
import { deleteList } from "../../redux/actions";

interface TodoListsProps {
  list: any;
  deleteList: ((event: GestureResponderEvent) => void);
  listContainer: StyleProp<ViewStyle>;
  listTitle: StyleProp<TextStyle>;
  count: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  deleteButton: StyleProp<ViewStyle>;
}

interface Styles {
  listContainer: ViewStyle;
  listTitle: TextStyle;
  count: TextStyle;
  subtitle: TextStyle;
  deleteButton: ViewStyle;
}



const TodoLists: React.FC<TodoListsProps>= ({ list, deleteList }) => {
  const [visible, setVisible] = useState(false);
  const toggleListModal = () => {
    setVisible(!visible);
  };

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

  let completedCount:object | number = filtered(list.todos, (todo:any) => todo.completed);
  completedCount = Object.keys(completedCount).length;

  let remainingCount = filtered(list.todos, (todo:any) => {
    let count = 1;
    count++;
  });
  remainingCount = Object.keys(remainingCount).length - completedCount;

  return (
    <Card style={[styles.listContainer, { backgroundColor: list.color }]} onPress={() => toggleListModal()}>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => toggleListModal()}
      >
        <TodosModal list={list} closeModal={() => toggleListModal()} />
      </Modal>
      <Card.Content>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
      </Card.Content>
      <Button
        style={styles.deleteButton}
        icon="close-outline"
        mode="contained"
        onPress={() => deleteList(list.id)}
      >
        Delete
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  listContainer: {
    flex: 1,
    padding: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
    height: 245,
  },
  listTitle: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  count: {
    fontSize: 50,
    fontWeight: "200",
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "700",
  },
  deleteButton: {
    margin: 2,
    width: 200,
    alignSelf: "center",
  },
});

const mapDispatchToProps = { deleteList };

export default connect(null, mapDispatchToProps)(TodoLists);
