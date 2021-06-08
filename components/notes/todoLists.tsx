import React, { useState } from "react";
import { Modal, StyleProp, TextStyle, ViewStyle, StyleSheet, Text, TouchableOpacity, View, GestureResponderEvent} from "react-native";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import TodosModal from "./todosModal";
import { coltsGray } from "../../styles/global";
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
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => toggleListModal()}
      >
        <TodosModal list={list} closeModal={() => toggleListModal()} />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={() => toggleListModal()}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Button
        style={styles.deleteButton}
        color={coltsGray}
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
    padding: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 16,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: "white",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  deleteButton: {
    margin: 2,
    width: 200,
    alignSelf: "center",
  },
});

const mapDispatchToProps = { deleteList };

export default connect(null, mapDispatchToProps)(TodoLists);
