import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TodosModal from "./todosModal";

export default function TodoLists({ list }) {
  const [visible, setVisible] = useState(false);
  const toggleListModal = () => {
    setVisible(!visible);
  };

  Object.filter = function (obj, predicate) {
    let result = {},
    let key;

    for (key in obj) {
      if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  let completedCount = Object.filter(list.todos, (todo) => todo.completed);
  completedCount = Object.keys(completedCount).length;

  let remainingCount = Object.filter(list.todos, (todo) => {
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
    </View>
  );
}

const styles = StyleSheet.create({
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
});
