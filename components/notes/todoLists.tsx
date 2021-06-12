import React, { useState } from "react";
import { Modal, StyleProp, TextStyle, ViewStyle, StyleSheet, View} from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { connect } from "react-redux";
import TodosModal from "./todosModal";
import { deleteList } from "../../redux/actions";

interface TodoListsProps {
  list: any;
  deleteList: ((id:string) => void);
  listContainer: StyleProp<ViewStyle>;
  cardContainer: StyleProp<ViewStyle>;
  listTitle: StyleProp<TextStyle>;
  count: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  deleteButton: StyleProp<ViewStyle>;
}

interface Styles {
  listContainer: ViewStyle;
  cardContainer: ViewStyle;
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
    <View style={styles.listContainer}>
      <Card style={[styles.cardContainer, { backgroundColor: list.color }]} onPress={() => toggleListModal()}>
        <Modal
          animationType="slide"
          visible={visible}
          onRequestClose={() => toggleListModal()}
        >
          <TodosModal item={list} closeModal={() => toggleListModal()} />
        </Modal>
        <View>
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
        </View>
      </Card>
      <Button
        style={styles.deleteButton}
        icon="close-outline"
        mode="contained"
        onPress={() => deleteList(list.id)}
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
  },
});

const mapDispatchToProps = { deleteList };

export default connect(null, mapDispatchToProps)(TodoLists);
