import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import TodoLists from "./todoLists";
import AddListModal from "./addListModal";
import { coltsGray } from "../../styles/global";

export function ListMain({ state }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const renderList = (list) => {
    return <TodoLists list={list} />;
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modal}
        onRequestClose={() => toggleModal()}
      >
        <AddListModal closeModal={() => toggleModal()} />
      </Modal>
      <View style={styles.titleStyle}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Some{" "}
          <Text style={{ fontWeight: "300", color: coltsGray }}>
            Checklists
          </Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{ height: 420, paddingLeft: 22, marginTop: 40 }}>
        <FlatList
          data={state}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
      <View style={{ marginVertical: 48, paddingBottom: 24 }}>
        <TouchableOpacity onPress={() => toggleModal()} style={styles.addList}>
          <AntDesign color={coltsGray} name="plus" size={30} />
        </TouchableOpacity>
        <Text style={styles.add}>Add New List</Text>
      </View>
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    flexDirection: "row",
    marginTop: 40,
  },
  divider: {
    backgroundColor: coltsGray,
    height: 1,
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "black",
    paddingHorizontal: 20,
  },
  addList: {
    borderWidth: 2,
    borderColor: coltsGray,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: coltsGray,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 6,
  },
});

export default connect(mapStateToProps)(ListMain);
